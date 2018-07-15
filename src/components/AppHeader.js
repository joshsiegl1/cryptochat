import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import Expo from 'expo'; 

import {View, Text, Platform, Image, TouchableOpacity} from 'react-native'; 
import { SafeAreaView } from 'react-navigation'; 

const propTypes = { 
    renderBackButton: PropTypes.bool
}

class AppHeader extends Component { 
    constructor(props) { 
        super(props)
    }

    onBackPressed = () => { 
        const { nav } = this.props; 

        nav.goBack(); 
    }

    onMenuPressed = () => { 
        const { nav } = this.props; 

        nav.toggleDrawer(); 
    }

    render() { 
        return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
        <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            height: 40, 
            backgroundColor: 'white', 
            zIndex: -1, 
            marginTop: Platform.OS == "ios" ? 0 : Expo.Constants.statusBarHeight}}>
            {this.props.renderBackButton && 
                (<TouchableOpacity onPress={() => this.onBackPressed()}> 
                    <Image source={require('../../assets/back.png')} />
                </TouchableOpacity>)}
            {!this.props.renderBackButton &&
                (<View style={{width: 40}}></View>)}
            
            <Image source={require('../../assets/header_logo.png')} />
            <TouchableOpacity onPress={() => this.onMenuPressed()}> 
                <Image source={require('../../assets/menu_btn.png')} />
            </TouchableOpacity> 
        </View></SafeAreaView>)
    }
}



AppHeader.propTypes = propTypes; 

export default AppHeader; 