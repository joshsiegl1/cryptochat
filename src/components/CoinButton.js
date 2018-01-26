import PropTypes from 'prop-types'; 
import React, { Component } from 'react'; 
import {View, Text, Image} from 'react-native'; 

import style from '../styles/stylesheet'; 

const propTypes = { 
    id: PropTypes.string
}

class CoinButton extends Component { 
    render(){ 
        let id = this.props.id; 

        return (<View style={style.container}> 
            <Image
                style={{width: 32, height: 32}}
                source={{uri: `https://files.coinmarketcap.com/static/img/coins/32x32/${id}.png`}}
                />
            <Text>{id}</Text>
        </View>)
    }
}

CoinButton.propTypes = propTypes; 

export default CoinButton; 