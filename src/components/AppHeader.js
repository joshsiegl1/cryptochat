import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import Expo from 'expo'; 

import {View, Text, Platform, Image, TouchableOpacity} from 'react-native'; 

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

    render() { 
        return (<View style={{
            flexDirection: 'row', 
            justifyContent: 'center', 
            height: 40, 
            backgroundColor: '#FF6600', 
            zIndex: -1, 
            marginTop: Platform.OS == "ios" ? 0 : Expo.Constants.statusBarHeight}}>
            {this.props.renderBackButton && 
                (<TouchableOpacity onPress={() => this.onBackPressed()}> 
                    <Image source={require('../../assets/back.png')} />
                </TouchableOpacity>)}
            
            <Image source={require('../../assets/header_logo.png')} />
        </View>)
    }
}



AppHeader.propTypes = propTypes; 

export default AppHeader; 