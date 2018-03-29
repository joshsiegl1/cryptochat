import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, TextInput } from 'react-native'; 

import styles from '../styles/chatWindowSheet'; 

const propTypes = { 
    topic: PropTypes.string
}

const greeting = "My Comment"; 

class ChatWindow extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            myText: ""
        }
    }

    onChange = (text) => { 
        this.setState({myText: text}); 
    }

    render() { 
        return (<View>
            <TextInput 
            placeholder={greeting}
            placeholderTextColor='lightgray'
            style={styles.textInput}
            multiline={true}
            onChange={this.onChange}
            value={this.state.myText} />
        </View>)
    }
}

ChatWindow.propTypes = propTypes; 

export default ChatWindow; 