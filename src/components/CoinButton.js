import PropTypes from 'prop-types'; 
import React, { Component } from 'react'; 
import {View, Text, Image} from 'react-native'; 

import style from '../styles/stylesheet'; 

class CoinButton extends Component { 
    render(){ 
        return (<View style={style.container}> 
            <Image
                style={{width: 32, height: 32}}
                source={{uri: 'https://files.coinmarketcap.com/static/img/coins/32x32/bitcoin.png'}}
                />
            <Text>bitcoin</Text>
        </View>)
    }
}

export default CoinButton; 