import PropTypes from 'prop-types'; 
import React, {Component } from 'react'; 

import {View, FlatList} from 'react-native'; 

import { GetUser, GetItem, GetLikedPosts } from '../utils/Storage'; 

import CoinButton from './CoinButton'; 

const propTypes = { 
    navigate: PropTypes.func, 
    currencies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    })), 
    User: PropTypes.shape({
        userID: PropTypes.string
    })
}

class CoinList extends Component { 
    constructor(props) { 
        super(props)
    }

    async UNSAFE_componentWillMount() { 
        const {currencies, fetchTopFiftyCryptoCurrencies, LikedPosts, DislikedPosts,
               User, DispatchUserfromStorage, DispatchLikedPostsfromStorage} = this.props; 

        if (Object.keys(User).length === 0 && User.constructor === Object) { 
            await GetUser(function (user) { 
                if (user !== undefined && user !== null) { 
                    DispatchUserfromStorage({
                        "userID" : user[0][1], 
                        "email" : user[1][1], 
                        "karma" : user[2][1], 
                        "fbid" : user[3][1]
                    }); 
                }
            }); 
        }

        if (Object.keys(LikedPosts).length === 0) { 
            await GetLikedPosts (function (liked, disliked) { 
                DispatchLikedPostsfromStorage({
                    "likedPosts" : liked, 
                    "dislikedPosts" : disliked
                })
            })
        }

        if (currencies === null) { 
            fetchTopFiftyCryptoCurrencies(); 
        }
    }

    _renderItem = ({item}) => (
        <CoinButton 
        id={item.id}
        navigate={this.props.navigation.navigate}
        num={item.rank}
        name={item.name} />

    )

    _keyExtractor = (item, index) => item.Id; 

    render() { 

        const { currencies} = this.props; 

        const nav = this.props.navigation.navigate; 

        return (<FlatList
                 data={currencies} 
                 extraData={nav} 
                 keyExtractor={this._keyExtractor} 
                 renderItem={this._renderItem}
                 />)
    }
}

export default CoinList; 