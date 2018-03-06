import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 
import Expo from 'expo'; 
import { LinearGradient, Facebook } from 'expo'; 

import {View, Text, TextInput, Button, Alert, TouchableOpacity, Image} from 'react-native'; 

import userStyleSheet from '../styles/userstylesheet'; 

const propTypes = { 
    User: PropTypes.shape({
        karma: PropTypes.string, 
        userID: PropTypes.string
    }), 
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
        const { User } = this.props; 

        if (Object.keys(User).length === 0 && User.constructor === Object) { 
            
            return (<LinearGradient colors={['#F9C000', '#DF8600']}
                                    style={userStyleSheet.gradient}>
                    <View style={userStyleSheet.container}>
                        <View style={{padding: 10, width: 100, height: 100}}>
                        <Image source={require('../../assets/cryptochat_logo.png')} 
                               style={{
                               flex: 1, 
                               alignSelf: 'stretch', 
                               width: undefined, 
                               height: undefined}} 
                               resizeMode='contain'/>
                        </View>
                        <View style={userStyleSheet.formContainer}>
                        <View style={userStyleSheet.SectionStyle}>
                            <Image source={require('../../assets/ic_person.png')}
                                   style={userStyleSheet.inputImageStyle} />
                            <TextInput 
                            style={[{flex:1, color: 'white'}]}
                            value={this.state.userName}
                            
                            onChangeText={this.UsernameChanged}/>
                         </View>
                         <View style={userStyleSheet.SectionStyle}>
                         <Image source={require('../../assets/ic_lock.png')}
                                   style={userStyleSheet.inputImageStyle} />
                        <TextInput 
                        style={[{flex:1, color: 'white'}]}
                        value={this.state.password}
                        
                        onChangeText={this.PasswordChanged}
                        secureTextEntry={true}/>
                        </View>
                        <TouchableOpacity 
                        style={[userStyleSheet.LoginButton]}
                        onPress={this.LoginPressed}>
                        <Text style={[userStyleSheet.loginButtonText]}>Log In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{backgroundColor: 'transparent'}}
                        onPress={this.onRegisterClick}>
                        <Text style={{color: 'white'}}>Don't have an account? Sign up</Text>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                        style={[userStyleSheet.FacebookButton]}
                        onPress={this.LoginwithFacebook}>
                        <Text style={userStyleSheet.loginButtonText}>Sign in with Facebook</Text>
                        </TouchableOpacity>

                    </View>
                </LinearGradient>)
        }
        else { 

            if (User.userID === "") { 
                return (<View>
                    <Text>Account</Text>
                    </View>)
            }
            else { 
                return (<View>
                    <Text>Account</Text>
                    </View>)
            }
        }
    }
}

User.propTypes = propTypes; 

export default User; 