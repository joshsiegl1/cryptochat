import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 
import Expo from 'expo'; 
import { Facebook } from 'expo'; 

import {View, Text, TextInput, Button, Alert, TouchableOpacity} from 'react-native'; 

import userStyleSheet from '../styles/userstylesheet'; 

const propTypes = { 
    getUser: PropTypes.func, 
    GetUser: PropTypes.func, 
    FacebookLogin: PropTypes.func
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

    onRegisterClick = () => { 
        const { navigation } = this.props; 

        navigation.navigate('Register'); 
    }

    LoginwithFacebook = async () => { 

        const { FacebookLogin } = this.props; 

        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1717121328349303', { 
            permissions: ['public_profile']
        })
        if (type === 'success') { 
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}`);

            const json = await response.json(); 

            FacebookLogin(await json.id); 
        }
        else { 
            Alert.alert('Facebook Login Failed', 'Something went wrong with this login, please try again or contact us and let us know'); 
        }
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
                        title="Need to register instead?"
                        onPress={this.onRegisterClick} />
                        <Button 
                        title="Facebook Login"
                        onPress={this.LoginwithFacebook} />

                </View>)
    }
}

User.propTypes = propTypes; 

export default User; 