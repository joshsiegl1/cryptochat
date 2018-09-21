import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, FlatList, TextInput, Button, Text, Image, StyleSheet, 
Keyboard, KeyboardAvoidingView } from 'react-native'; 

const propTypes = { 

}

class Message extends Component { 
    constructor(props) { 
        super(props) 

        this.state = { 
            posting: false, 
            message: ""
        }
    }

    onPost = async () => { 
        if (!this.state.posting) { 

            let message = this.state.message;
            if (message === '') return; 

            this.setState({
                posting: true
            })
        }
    }

    render() { 
        return (<View />)
    }
}

Message.propTypes = propTypes; 

export default Message; 