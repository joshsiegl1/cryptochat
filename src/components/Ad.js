import PropTypes from 'prop-types'; 
import React, { Component } from 'react'; 

import {View, Platform} from 'react-native'; 

import {AdMobBanner} from 'expo'; 

const propTypes = {}; 

class Ad extends Component { 

    render() { 
        let ad = (Platform.OS === "ios") ? 
        (<AdMobBanner bannerSize="fullbanner"
        adUnitID="ca-app-pub-2896471597472603/8703233139"
        didFailToReceiveAdWithError={this.bannerError}/>)
        : 
        (<AdMobBanner bannerSize="fullbanner"
        adUnitID="ca-app-pub-2896471597472603/2666295016"
        didFailToReceiveAdWithError={this.bannerError}/>); 

        return (<View  
        style={{borderColor: 'gray', 
        backgroundColor: 'black', 
        borderWidth: 1, 
        paddingLeft: 25, 
        paddingRight: 25, 
        height: '10%'}}>{ad}</View>); 
    }
}

Ad.propTypes = propTypes; 

export default Ad; 