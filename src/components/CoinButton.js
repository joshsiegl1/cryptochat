import PropTypes from 'prop-types'; 
import React, { Component } from 'react'; 
import {View, TouchableOpacity, Text, Image} from 'react-native'; 

import style from '../styles/stylesheet'; 

const propTypes = { 
    navigate: PropTypes.func, 
    id: PropTypes.string, 
    num: PropTypes.number, 
    name: PropTypes.string
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
        let { id, num, name } = this.props; 

        return (
            <TouchableOpacity
                style={style.container} 
                onPress={this.onPress}> 
            <Text style={{paddingRight: 10, color: 'lightgray', fontFamily: 'arial'}}>{num}</Text>
            <Image
                style={{width: 16, height: 16}}
                source={{uri: `http://www.joshsiegl.com/crypto/${id}.png`}}
                />
            <Text style={style.cryptoButtonText}>{name}</Text>
        </TouchableOpacity>
        )
    }
}

CoinButton.propTypes = propTypes; 

export default CoinButton; 