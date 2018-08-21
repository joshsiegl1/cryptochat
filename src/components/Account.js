import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'; 

import { ImagePicker, Permissions } from 'expo'; 

import { SetPhone } from '../utils/UserStorage'; 

import { RNS3 } from 'react-native-aws3'
import {accessKey, secretKey } from '../aws_config.js'; 

const propTypes = { 
    user: PropTypes.shape({}), 
    Phone: PropTypes.string, 
    UpdateUsername: PropTypes.func, 
    UpdateProfilePicUrl: PropTypes.func, 
    dispatchLoad: PropTypes.func, 
    DeleteAccount: PropTypes.func
}

class Account extends Component { 
    constructor(props) { 
        super(props)
    }

    onLogoutPressed = async () => { 
        await SetPhone(""); 

        this.props.navigation.navigate("AuthLoading");   
    }

    onDeleteAccountPressed = async () => { 

        const { DeleteAccount } = this.props; 

        DeleteAccount(); 

        await SetPhone(""); 

        this.props.navigation.navigate("AuthLoading"); 
    }

    onProfilePictureChange = async () => { 
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); 
        if (status === 'granted') { 
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true, 
                base64: false
            }); 

            if (!result.cancelled) { 

                const { dispatchLoad, user } = this.props; 

                dispatchLoad(user); 

                let fileName = this.props.Phone.toString() + 'p'; 
                let uri = result.uri; 
                let match = /\.(\w+)$/.exec(fileName);
                let imagetype = match ? `image/${match[1]}` : `image`; 

                const file = { 
                    uri: uri, 
                    name: fileName, 
                    type: imagetype
                }

                const options = { 
                    bucket: 'cryptochat-app-45', 
                    region: 'us-east-1', 
                    accessKey: accessKey, 
                    secretKey: secretKey, 
                    successActionStatus: 201
                }

                RNS3.put(file, options).then(response => { 
                    if (response.status === 201) { 
                        const { UpdateProfilePicUrl, user } = this.props; 
                        //point user's profile image to new link
                        let safeFileName = fileName.replace('+', "%2B"); 
                        let imageLocation = 'https://s3.amazonaws.com/cryptochat-app-45/' + safeFileName.toString(); 
                        UpdateProfilePicUrl(imageLocation, user); 
                    }
                    else { 

                    }
                })
            }
        }
    }

    onPhoneNumberChange = async () => { 

    }

    onBlockedUsers = async () => { 
        this.props.navigation.navigate("BlockedUsersForm"); 
    }

    onChangeUsername = async () => { 
        this.props.navigation.navigate("UpdateForm"); 
    }

    render() { 

        const { Phone, user } = this.props; 

        let img = (<Image />)
        let username = ""; 
        if (user !== null && user !== undefined)
        { 
            let profilepic = user.profilepic; 
            username = user.username; 
            if (profilepic === null || profilepic === undefined || profilepic === "") { 
                img = (<Image source={require("../../assets/crypto-dude.png")}
                style={styles.photo} />)
            }
            else { 
                img = (<Image source={{uri: profilepic, cache:'reload'}} style={styles.photo} />)
            }
        }

        return(<View style={styles.main}>
            {img}
            <Text style={styles.numberText}>{username}</Text>
            <Text style={styles.numberText}>{Phone}</Text>
            <TouchableOpacity style={styles.accountButton} onPress={this.onChangeUsername}>
                <Text style={styles.accountButtonText}>Change Username</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.accountButton, {marginBottom: 20}]} onPress={this.onProfilePictureChange}> 
                <Text style={styles.accountButtonText}>Change Profile Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.accountButton, {marginBottom: 20}]} onPress={this.onBlockedUsers}>
                <Text style={styles.accountButtonText}>Blocked Users</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accountButton} onPress={this.onLogoutPressed}>
                <Text style={styles.accountButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountButton} onPress={this.onDeleteAccountPressed}> 
                <Text style={[styles.accountButtonText, {color: 'red'}]}>Delete Account</Text>
            </TouchableOpacity>
        </View>)
    }
}

const styles = StyleSheet.create({
    main: { 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    photo: { 
        marginTop: 50, 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
    }, 
    numberText: { 
        color: 'black',
        fontSize: 18, 
        marginTop: 20, 
        marginBottom: 20
    }, 
    accountButton: { 
        width: '100%', 
        height: 40, 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        borderColor: 'lightgray', 
        borderBottomWidth: 1, 
        backgroundColor: 'white', 
        padding: 10, 
        textAlign: 'center'
    }, 
    accountButtonText: { 
        color: 'lightgray', 
        paddingLeft: 10
    }
})

Account.propTypes = propTypes; 

export default Account; 