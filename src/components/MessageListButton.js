import PropTypes from 'prop-types'; 
import React, {Component, PureComponent} from 'react'; 
import {TouchableOpacity, Text, Image} from 'react-native'; 

import style from '../styles/stylesheet'; 

const propTypes = { 
    navigate: PropTypes.func, 
    id: PropTypes.string
}

class MessageListButton extends PureComponent { 
    constructor(props) { 
        super(props)
    }

    onPress = () => { 

        const { id, navigate } = this.props; 

        navigate("Message", {id: id}); 
    }

    render() { 
        
        let { id, num } = this.props; 

        return (<TouchableOpacity 
        style={style.container} 
        onPress={this.onPress}>
        <Text style={{paddingRight: 10, color: 'lightgray', lineHeight: 24}}>{num}</Text>
        <Text sytle={style.cryptoButtonText}>Message Chat</Text>
        </TouchableOpacity>)
    }
}

MessageListButton.propTypes = propTypes; 

export default MessageListButton; 