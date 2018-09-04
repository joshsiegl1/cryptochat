import PropTypes from 'prop-types'; 
import React, {Component } from 'react'; 

import {View, FlatList, AsyncStorage, TextInput} from 'react-native'; 

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

        this.state = { 
            search: ""
        }; 
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
        const {currencies, fetchTopFiftyCryptoCurrencies, fetchOthers, LikedPosts, DislikedPosts, fetchCryptoCurrencies,
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
            //fetchTopFiftyCryptoCurrencies(); 
            //fetchCryptoCurrencies(); 
            fetchOthers(); 
        }
    }

    _renderItem = ({item}) => (
        <CoinButton 
        id={item.id}
        navigate={this.props.navigation.navigate}
        num={item.cmcRank}
        name={item.name}
        slug={item.slug}
        source={item.source} />

    )

    _keyExtractor = (item, index) => item.Id; 

    render() { 

        const { currencies, user} = this.props; 

        const nav = this.props.navigation.navigate;
        
        let curratedCurrencies = []; 
        if (this.state.search !== "") { 
            for (let i = 0; i < currencies.length; i++) { 
                if (currencies[i].name.indexOf(this.state.search) !== -1) { 
                    curratedCurrencies.push(currencies[i]); 
                }
            }
        }
        else { 
            curratedCurrencies = currencies; 
        }

        return (
            <View>
                <View style={{
                    backgroundColor: 'white', 
                    padding: 10, 
                    borderBottomColor: 'gray', 
                    borderBottomWidth: 1
                }}>
                    <TextInput placeholder="Search"
                               style={{
                                   width: '100%', 
                                   borderRadius: 5, 
                                   borderWidth: 1, 
                                   borderColor: 'lightgray', 
                                   padding: 5
                                }}
                               value={this.state.search}
                               onChangeText={(search)=>this.setState({search})}>
                    </TextInput>
                </View>
                <FlatList
                 data={curratedCurrencies} 
                 extraData={nav} 
                 keyExtractor={this._keyExtractor} 
                 renderItem={this._renderItem}
                 />
            </View>)
    }
}

export default CoinList; 