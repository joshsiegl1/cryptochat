import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, FlatList} from 'react-native'; 

import { AdMobBanner } from 'expo'; 

const propTypes = { 
    navigateTo: PropTypes.func
}

class Chat extends Component { 
    constructor(props) { 
        super(props)
    }

    render() { 
        return ( 
            <View> 
                <AdMobBanner 
                    bannerSize="fullbanner"
                    adUnitID="ca-app-pub-2896471597472603/8703233139"
                    testDeviceID="EMULATOR"
                    didFailToReceiveAdWithError={this.bannerError}
                /> 
            </View>
        )
    }
}

Chat.propTypes = propTypes; 

export default Chat; 