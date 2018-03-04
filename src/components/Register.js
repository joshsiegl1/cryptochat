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
            email: "", 
            username: "", 
            password: "", 
            confirmPassword: ""
        }
    }

    RegisterPressed = () => { 
        const { AddUser } = this.props; 

        let email = this.state.email; 
        let username = this.state.username; 
        let password = this.state.password; 
        let confirmPassword = this.state.confirmPassword; 

        if (password === confirmPassword) 
        { 
            if (username.length > 3) { 
                if (password.length > 8) { 
                    AddUser(username, password)
                }
                else { 
                    Alert.alert("Invalid password", "Please make sure password is greater than 8 characters", {text: 'OK'})
                }
            }
            else { 
                Alert.alert("Invalid username", "Please make sure your username is longer than 3 characters", {text: 'OK'})
            }
        }
        else { 
            Alert.alert("Passwords do not match", "Please make sure Password and Confirm Password match", {text: 'OK'})
        }
    }

    UsernameChanged = (text) => { 
        if (!text.includes(" "))
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
                    <Text>Username</Text>
                    <TextInput style={[registerSheet.input]}
                               textAlign={'center'}
                               onChangeText={this.UsernameChanged}/>
                    <Text>Password</Text>
                    <TextInput style={[registerSheet.input]}
                               textAlign={'center'} 
                               onChangeText={this.PasswordChanged}
                               secureTextEntry={true}/>
                    <Text>Confirm Password</Text>
                    <TextInput style={[registerSheet.input]}
                               textAlign={'center'} 
                               onChangeText={this.ConfirmPasswordChanged}
                               secureTextEntry={true}/>
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