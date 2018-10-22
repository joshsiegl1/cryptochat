import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text, TextInput, KeyboardAvoidingView, 
        StyleSheet, TouchableOpacity, ScrollView, Image, Keyboard, 
        TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native'; 


class NewMessage extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            username: ""
        }
    }

    render() { 
        return (<View />)
    }
}

const styles = StyleSheet.create({
    main: { 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    usernameText: { 
        alignSelf: 'center', 
        height: 50, 
        lineHeight: 50, 
        marginRight: 10, 
        textAlign: 'center', 
        color: 'gray'
    }, 
    input: { 
        width: '100%', 
        paddingLeft: 10
    }, 
    instructionText: { 
        color: 'gray'
    }, 
    addButton: { 
        width: 200, 
        height: 50, 
        backgroundColor: '#373F51', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: '#373F51'
    }, 
    inputView: { 

    }
})

NewMessage.propTypes = { }; 

export default NewMessage; 