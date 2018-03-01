import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native'; 

import registerSheet from '../styles/registerSheet'; 

const propTypes = { 

}

class Register extends Component { 
    constructor(props) { 
        super(props) 

        this.state = { 
            username: "", 
            password: "", 
            confirmPassword: ""
        }
    }

    RegisterPressed = () => { 
        const { AddUser } = this.props; 

        let username = this.state.username; 
        let password = this.state.password; 

        AddUser(username, password)
    }

    UsernameChanged = (text) => { 
        this.setState({username: text})
    }

    PasswordChanged = (text) => { 
        this.setState({password: text})
    }

    ConfirmPasswordChanged = (text) => { 
        this.setState({confirmPassword: text})
    }

    render() { 
        return (<View style={registerSheet.container}>
                    <Text style={[registerSheet.registerText]}>REGISTER</Text>
                    <TextInput style={[registerSheet.input]}
                               textAlign={'center'}
                               onChangeText={this.UsernameChanged}/>
                    <TextInput style={[registerSheet.input]}
                               textAlign={'center'} 
                               onChangeText={this.PasswordChanged}/>
                    <TextInput style={[registerSheet.input]}
                               textAlign={'center'} 
                               onChangeText={this.ConfirmPasswordChanged}/>
                    <TouchableOpacity 
                        style={[registerSheet.RegisterButton]}
                        onPress={this.RegisterPressed}>
                        <Text style={[registerSheet.registerButtonText]}>SIGN ME UP!</Text>
                    </TouchableOpacity>
            </View>)
    }
}

Register.propTypes = propTypes; 

export default Register; 