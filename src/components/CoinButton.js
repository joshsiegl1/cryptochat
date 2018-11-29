import PropTypes from 'prop-types'; 
import React, { Component, PureComponent } from 'react'; 
import {View, TouchableOpacity, Text, Image} from 'react-native'; 

import style from '../styles/stylesheet'; 

const propTypes = { 
    navigate: PropTypes.func, 
    id: PropTypes.string, 
    num: PropTypes.string, 
    name: PropTypes.string, 
    slug: PropTypes.string
}

//This should be pure
class CoinButton extends PureComponent { 
    constructor(props) { 
        super(props) 
    }

    onPress = () => { 

        const {id, slug, navigate} = this.props; 

        navigate('Chat', {title: slug, crypto: slug, id: id}); 
    }

    render(){ 
        let { id, num, name, source } = this.props; 

        return (
            <TouchableOpacity
                style={style.container} 
                onPress={this.onPress}> 
            <Text style={{paddingRight: 10, color: 'lightgray', lineHeight: 24, fontFamily: 'open-sans-regular'}}>{num}</Text>
            <Image
                style={{width: 24, height: 24}}
                source={{uri: source}}
                />
            <Text style={style.cryptoButtonText}>{name}</Text>
        </TouchableOpacity>
        )
    }
}

CoinButton.propTypes = propTypes; 

export default CoinButton; 