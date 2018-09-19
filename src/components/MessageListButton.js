import PropTypes from 'prop-types'; 
import React, {Component, PureComponent} from 'react'; 
import {TouchableOpacity, Text, Image} from 'react-native'; 

const propTypes = { 
    navigate: PropTypes.func, 
    id: PropTypes.string
}

class MessageListButton extends PureComponent { 
    constructor(props) { 
        super(props)
    }

    onPress = () => { 

        const { id } = this.props; 

        navigate("Message", {id: id}); 
    }

    render() { 
        
        let { id } = this.props; 

        return (<TouchableOpacity onPress={this.onPress}>
            <Text>Message Chat</Text>
        </TouchableOpacity>)
    }
}

MessageListButton.propTypes = propTypes; 

export default MessageListButton; 