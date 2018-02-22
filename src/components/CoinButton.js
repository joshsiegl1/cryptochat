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

        navigate('Chat', {title: id, crypto: id}); 
    }

    render(){ 
        let id = this.props.id; 

        return (
            <TouchableOpacity
                style={style.container} 
                onPress={this.onPress}> 
            <Image
                style={{width: 32, height: 32}}
                source={{uri: `http://www.joshsiegl.com/crypto/${id}.png`}}
                />
            <Text style={style.cryptoButtonText}>{id}</Text>
        </TouchableOpacity>
        )
    }
}

CoinButton.propTypes = propTypes; 

export default CoinButton; 