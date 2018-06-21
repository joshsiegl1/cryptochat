import PropTypes from 'prop-types'; 
import React, {Component } from 'react'; 

import {View, FlatList, AsyncStorage} from 'react-native'; 

import { GetUser, GetItem, GetLikedPosts } from '../utils/Storage'; 

import { GetPhone } from '../utils/UserStorage'; 

import { registerForPushNotifications } from '../utils/PushNotification'; 

import CoinButton from './CoinButton'; 

const propTypes = { 
    user: PropTypes.shape({}), 
    navigate: PropTypes.func, 
    currencies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    })), 
    validated: PropTypes.bool
}

class CoinList extends Component { 
    constructor(props) { 
        super(props)
    }

    componentWillReceiveProps() { 
        const {validated} = this.props; 
        if (validated !== null) { 
            if (validated === false) { 
                this.props.navigation.navigate('Auth'); 
            }
        }
    }

    async UNSAFE_componentWillMount() { 
        const {currencies, fetchTopFiftyCryptoCurrencies, fetchOthers, LikedPosts, DislikedPosts,
               DispatchUserfromStorage, DispatchLikedPostsfromStorage, validated, ValidateToken, user, GetUser} = this.props; 

        if (validated === null) { 
            ValidateToken(); 
        }

        if (user === null) { 
            GetUser(); 
        }

        let phone = await AsyncStorage.getItem("phone"); 
        registerForPushNotifications(phone);
        
        //Dispatches the user's phone into the redux store from local storage
        DispatchUserfromStorage(phone); 

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
            fetchOthers(); 
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