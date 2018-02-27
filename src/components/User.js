import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, Text, TextInput, Button, Alert, TouchableOpacity} from 'react-native'; 

import userStyleSheet from '../styles/userstylesheet'; 

const propTypes = { 
    getUser: PropTypes.func, 
    GetUser: PropTypes.func
}

class User extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            userName: "username", 
            password: "password"
        }
    }

    LoginPressed = () => { 

        const { GetUser } = this.props; 

        let username = this.state.userName; 
        let password = this.state.password; 

        GetUser(username, password)
    }

    UsernameChanged = (text) => { 
        this.setState({userName: text})
    }

    PasswordChanged = (text) => { 
        this.setState({password: text})
    }

    render() { 
        return (<View style={userStyleSheet.container}>
                        <Text style={[userStyleSheet.general, userStyleSheet.loginText]}>LOGIN</Text>
                        <TextInput
                         style={[userStyleSheet.input]}
                         value={this.state.userName}
                         textAlign={'center'} 
                         onChangeText={this.UsernameChanged}/>
                        <TextInput 
                        style={[userStyleSheet.input]}
                        value={this.state.password}
                        textAlign={'center'} 
                        onChangeText={this.PasswordChanged}
                        secureTextEntry={true}/>
                        <TouchableOpacity 
                        style={[userStyleSheet.LoginButton]}
                        onPress={this.LoginPressed}>
                        <Text style={[userStyleSheet.loginButtonText]}>GO</Text>
                        </TouchableOpacity>
                        <Button
                        title="Need to register instead?" />
                </View>)
    }
}

User.propTypes = propTypes; 

export default User; 