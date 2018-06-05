import React from 'react'; 
import { ActivityIndicator, View, AsyncStorage } from 'react-native'; 

import { GetPhone } from '../utils/UserStorage'; 


class AuthLoadingScreen extends React.Component { 
    constructor(props) { 
        super(props); 
        this._bootstrapAsync(); 
    }

    _bootstrapAsync = async () => { 
        const phone = await AsyncStorage.getItem("phone"); 

        this.props.navigation.navigate(phone ? 'App' : 'Auth'); 
    }

    render() { 
        return (<View></View>)
    }
}

module.exports = AuthLoadingScreen; 