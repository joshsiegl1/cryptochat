import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { LinearGradient } from 'expo'; 

import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native'; 

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
        return (<LinearGradient colors={['#F9C000', '#DF8600']}
                                style={registerSheet.gradient}>
        <View style={registerSheet.container}>
                    <View style={{padding: 10, width: 100, height: 100}}>
                    <Image source={require('../../assets/cryptochat_logo.png')} 
                               style={{
                               flex: 1, 
                               alignSelf: 'stretch', 
                               width: undefined, 
                               height: undefined}} 
                               resizeMode='contain'/> 
                    </View>
                    <View style={{width: '100%'}}>
                    <View style={registerSheet.SectionStyle}>
                    <Image source={require('../../assets/ic_person.png')}
                                   style={registerSheet.inputImageStyle} />
                    <TextInput style={[{flex:1, color: 'white'}]}
                               textAlign={'center'}
                               onChangeText={this.UsernameChanged}/>
                    </View>
                    <View style={registerSheet.SectionStyle}>
                    <Image source={require('../../assets/ic_lock.png')}
                                   style={registerSheet.inputImageStyle} />
                    <TextInput style={[{flex:1, color: 'white'}]}
                               textAlign={'center'} 
                               onChangeText={this.PasswordChanged}
                               secureTextEntry={true}/>
                    </View>
                    <View style={registerSheet.SectionStyle}>
                    <Image source={require('../../assets/ic_lock.png')}
                                   style={registerSheet.inputImageStyle} />
                    <TextInput style={[{flex:1, color: 'white'}]}
                               textAlign={'center'} 
                               onChangeText={this.ConfirmPasswordChanged}
                               secureTextEntry={true}/>
                    </View>
                    <TouchableOpacity 
                        style={[registerSheet.RegisterButton]}
                        onPress={this.RegisterPressed}>
                        <Text style={[registerSheet.registerButtonText]}>Register</Text>
                    </TouchableOpacity>
                    </View>
            </View>
            </LinearGradient>)
    }
}

Register.propTypes = propTypes; 

export default Register; 