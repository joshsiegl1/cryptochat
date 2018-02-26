import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, Text, TextInput} from 'react-native'; 

import userStyleSheet from '../styles/userstylesheet'; 

const propTypes = { 

}

class User extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            userName: "username", 
            password: "password"
        }
    }

    render() { 
        return (<View style={userStyleSheet.container}>
                    <View style={userStyleSheet.form}>
                        <Text style={[userStyleSheet.general, userStyleSheet.loginText]}>LOGIN</Text>
                        <TextInput
                         style={[userStyleSheet.input]}
                         value={this.state.userName} />
                        <TextInput 
                        style={[userStyleSheet.input]}
                        value={this.state.password} />
                    </View>
                </View>)
    }
}

User.propTypes = propTypes; 

export default User; 