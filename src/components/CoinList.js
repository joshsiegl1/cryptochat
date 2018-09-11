import PropTypes from 'prop-types'; 
import React, {Component } from 'react'; 

import {View, FlatList, AsyncStorage, TextInput, RefreshControl, ActivityIndicator, Dimensions} from 'react-native'; 

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
            search: "", 
            refreshing: false
        }; 
    }

    componentWillReceiveProps(nextProps) { 
        const {validated, fetchOthers} = this.props; 
        if (validated !== null) { 
            if (validated === false) { 
                this.props.navigation.navigate('Auth'); 
            }
        }
        if (this.props.navigation.state.params !== undefined && this.props.navigation.state.params !== null) { 
            if (this.props.navigation.state.params.hasOwnProperty("refresh")) {            
                 fetchOthers();
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

        fetchOthers();
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

    _onRefresh = () => {
        const { fetchOthers } = this.props; 
        this.setState({refreshing: true});  
        fetchOthers().then(() => { 
            this.setState({refreshing: false})
        })

    }

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

        let width = Dimensions.get("screen").width; 
        let height = Dimensions.get("screen").height; 

        return (
            <View>
                <ActivityIndicator size='large' style={{position: 'absolute', left: (width / 2) - 15, top: (height / 2) - 100, zIndex: 0}} />
                <View style={{
                    backgroundColor: 'white', 
                    padding: 10, 
                    borderBottomColor: 'gray', 
                    borderBottomWidth: 1, 
                    zIndex: 1
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
                style={{zIndex: 1}}
                 refreshControl={
                     <RefreshControl 
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}/>
                 }
                 getItemLayout={(data, index) => (
                     {length: 45, offset: 45 * index, index}
                 )}
                 data={curratedCurrencies} 
                 extraData={nav} 
                 keyExtractor={this._keyExtractor} 
                 renderItem={this._renderItem}
                 initialNumToRender={10}
                 />
            </View>)
    }
}

export default CoinList; 