import PropTypes from 'prop-types'; 
import React, { Component } from 'react'; 
import {View, TouchableOpacity, Text, Image} from 'react-native'; 

import style from '../styles/stylesheet'; 

const propTypes = { 
    navigate: PropTypes.func, 
    id: PropTypes.string, 
    num: PropTypes.string, 
    name: PropTypes.string, 
    slug: PropTypes.string
}

class CoinButton extends Component { 
    constructor(props) { 
        super(props) 
    }

    onPress = () => { 

        const {id, slug, navigate} = this.props; 

        navigate('Chat', {title: slug, crypto: slug}); 
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
                //source={{uri: `http://www.joshsiegl.com/crypto/${id}.png`}}
                source={{uri: `https://s2.coinmarketcap.com/static/img/coins/16x16/${id}.png`}}
                />
            <Text style={style.cryptoButtonText}>{name}</Text>
        </TouchableOpacity>
        )
    }
}

CoinButton.propTypes = propTypes; 

export default CoinButton; 