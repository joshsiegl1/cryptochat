import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 
import {View, Text, Image} from 'react-native'; 

import CoinButton from './CoinButton'; 

import style from '../styles/stylesheet'; 

class Root extends Component { 
    render() { 
        return (<View style={{
                padding: 10
            }}>
                <View> 
                    <CoinButton /> 

                </View>
            </View>)
    }
}

export default Root; 