import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 
import Expo from 'expo'; 
import { LinearGradient, Facebook } from 'expo'; 

import {View, Text, TextInput, Button, Alert, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native'; 

import { DeleteUser } from '../utils/Storage'

import userStyleSheet from '../styles/userstylesheet'; 

const propTypes = { 
    User: PropTypes.shape({
        karma: PropTypes.string, 
        userID: PropTypes.string
    }), 
    GetUser: PropTypes.func, 
    FacebookLogin: PropTypes.func, 
    DispatchUserfromStorage: PropTypes.func
}

class User extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            userName: "username", 
            password: "password", 
            updateUsername: "username"
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

    onUsernameFocus = () => { 
        if (this.state.userName === "username")
            this.setState({userName: ""})
    }

    onPasswordFocus = () => { 
        if (this.state.password === "password") 
            this.setState({password: ""})
    }

    onRegisterClick = () => { 
        const { navigation } = this.props; 

        navigation.navigate('Register'); 
    }

    onLogOutPressed = async () => { 
        const { DispatchUserfromStorage } = this.props; 
        await DeleteUser(); 
        let user = {}; 
        await DispatchUserfromStorage(user); 
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


    onUpdateUsername = () => { 
        const {UpdateUsernameFacebook, User} = this.props; 

        UpdateUsernameFacebook(User.fbid, this.state.updateUsername)
    }

    onUpdateusernameFocus = () => { 
        if (this.state.updateUsername === "username")
            this.setState({updateUsername: ""})
    }

    onUpdateusernameChanged = (text) => { 
        this.setState({updateUsername: text})
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
                            underlineColorAndroid='transparent'
                            style={[{flex:1, color: 'white'}]}
                            value={this.state.userName}
                            onFocus={() => this.onUsernameFocus()}
                            onChangeText={this.UsernameChanged}
                            selectionColor={'white'}/>
                         </View>
                         <View style={userStyleSheet.SectionStyle}>
                         <Image source={require('../../assets/ic_lock.png')}
                                   style={userStyleSheet.inputImageStyle} />
                        <TextInput 
                        underlineColorAndroid='transparent'
                        style={[{flex:1, color: 'white'}]}
                        value={this.state.password}
                        onFocus={() => this.onPasswordFocus()}
                        onChangeText={this.PasswordChanged}
                        secureTextEntry={true}
                        selectionColor={'white'}/>
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

            if (User.userID === "" || User.userID === undefined) { 
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
                        <KeyboardAvoidingView behavior="position" style={{width: '100%'}}>
                        
                        <Text style={userStyleSheet.userInfoText}>Please choose a username.</Text>
                        <View style={userStyleSheet.SectionStyle}>
                            <Image source={require('../../assets/ic_person.png')}
                                   style={userStyleSheet.inputImageStyle} />
                            <TextInput 
                            style={[{flex:1, color: 'white'}]}
                            value={this.state.updateUsername}
                            onFocus={() => this.onUpdateusernameFocus()}
                            onChangeText={this.onUpdateusernameChanged}
                            selectionColor={'white'}
                            secureTextEntry={false}/>
                         </View>
                         <TouchableOpacity
                        style={[userStyleSheet.LoginButton]}
                        onPress={() => this.onUpdateUsername()}> 
                        <Text style={[userStyleSheet.loginButtonText]}>Add Username</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={[userStyleSheet.LoginButton]}
                        onPress={() => this.onLogOutPressed()}> 
                        <Text style={[userStyleSheet.loginButtonText]}>Log Out</Text>
                        </TouchableOpacity>
                         </KeyboardAvoidingView>
                        
                        
                        </View> 
                        </LinearGradient>)
            }
            else { 
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
                        <View style={[userStyleSheet.formContainer]}>
                        <Text style={userStyleSheet.userInfoText}>Username: {User.userID}</Text>
                        <Text style={userStyleSheet.userInfoText}>Email: {User.email}</Text>
                        <Text style={userStyleSheet.userInfoText}>Karma: {User.karma}</Text>
                        <TouchableOpacity
                        style={[userStyleSheet.LoginButton]}
                        onPress={() => this.onLogOutPressed()}> 
                        <Text style={[userStyleSheet.loginButtonText]}>Log Out</Text>
                        </TouchableOpacity>
                        </View>
                        </View>

                        </LinearGradient>)
            }
        }
    }
}

User.propTypes = propTypes; 

export default User; 