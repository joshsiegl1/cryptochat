import PropTypes from 'prop-types'; 
import React, { Component } from 'react'; 
import {View, TouchableOpacity, Text, Image} from 'react-native'; 

import style from '../styles/stylesheet'; 

import { CHAT_PATH } from '../constants/RouterConstants'; 

const propTypes = { 
    navigate: PropTypes.func, 
    id: PropTypes.string
}

class CoinButton extends Component { 
    constructor(props) { 
        super(props) 
    }

    onPress = () => { 

        const {id, navigate} = this.props; 

        console.log(this.props); 

        navigate('Chat', {crypto: id}); 
    }

    render(){ 
        let id = this.props.id; 

        return (
            <TouchableOpacity
                style={style.container} 
                onPress={this.onPress}> 
            <Image
                style={{width: 32, height: 32}}
                source={{uri: `https://files.coinmarketcap.com/static/img/coins/32x32/${id}.png`}}
                />
            <Text>{id}</Text>
        </TouchableOpacity>
        )
    }
}

CoinButton.propTypes = propTypes; 

export default CoinButton; 