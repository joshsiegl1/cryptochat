import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text, TextInput, KeyboardAvoidingView, 
    StyleSheet, TouchableOpacity, ScrollView, Image, Keyboard, 
    TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';

import { ImagePicker, Permissions } from 'expo'; 
import { RNS3 } from 'react-native-aws3'
import {accessKey, secretKey } from '../aws_config.js'; 

import ModalDropdown from 'react-native-modal-dropdown'; 

const propTypes = {
    AddCategory: PropTypes.func, 
    fetchOthers: PropTypes.func
 }

class NewTopic extends Component { 
    constructor(props) { 
        super(props) 

        this.state = { 
            name: "", 
            description: "", 
            photo: { 
                uri: "", 
                name: "", 
                imagetype: ""
            }, 
            category: "", 
            type: "", 
            launching: false
        }
    }

    onImage = async () => { 
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') { 
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true, 
                base64: false
            }); 

            if (!result.cancelled) { 
                let uri = result.uri; 
                let name = "idk"; //this could be userphone plus some random num
                
                let match = /\.(\w+)$/.exec(name); 
                let imagetype = match ? `image/${match[1]}` : `image`;
                
                this.setState({
                    photo: { 
                        uri: uri, 
                        name: name, 
                        imagetype: imagetype
                    }
                })
            }
        }
        else { 
            Alert.alert("Camera Permissions Denied", "It looks like you denied this application access to the Camera, you'll need to go into your settings and reverse this action if you'd like to upload an image"); 
        }
    }

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }

    onLaunch = () => { 
        if (this.state.launching) return; 

        const { AddCategory, fetchOthers} = this.props; 
        const { name, description, photo, category, type} = this.state; 
        if (name === "") { 
            Alert.alert("Name Required", "Please enter a name for this channel"); 
            return; 
        }
        else if (photo.uri === "") { 
            Alert.alert("Photo Required", "You need to select a photo for this channel, tap the photo icon to select one from this phones library"); 
            return
        }
        else if (category === "") { 
            Alert.alert("Category Required", "You need to select a category for this channel"); 
            return; 
        }
        else if (type === "") { 
            Alert.alert("Type Required", "You need to select a type for this channel, please choose either Public, Read-Only, or Private"); 
            return; 
        }

        this.setState({launching: true}); 

        let fileName = this.guid().toString(); 

        const file = { 
            uri: this.state.photo.uri, 
            name: fileName, 
            type: this.state.photo.imagetype
        }

        let newCategory = { 
            name: this.state.name, 
            description: this.state.description, 
            source: this.state.photo.name, 
            _category: this.state.category, 
            type: this.state.type, 
            slug: this.state.name
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
                let imageLocation = 'https://s3.amazonaws.com/cryptochat-app-45/' + fileName; 
                newCategory.source = imageLocation; 
                AddCategory(newCategory); 
                fetchOthers().then(() => this.props.navigation.navigate("Home", {refresh: true})); 
            }
        })
    }

    render() { 

        let topImage = (this.state.photo.uri !== "") ? (<Image style={styles.image} source={{uri: this.state.photo.uri}} />) : (<Image style={styles.image} source={require("../../assets/camera_icon.png")} />)

        return (
        <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={-10}>
        <TouchableWithoutFeedback style={{height: 10000}} onPress={Keyboard.dismiss} accessible={false}>

            <ScrollView style={styles.scrollView}>
            <TouchableOpacity style={styles.centered} onPress={this.onImage}>
                {topImage}
            </TouchableOpacity>
            <View style={styles.inputView}>
                <Text style={styles.text}>Channel Name</Text>
                <TextInput style={styles.input}
                           placeholder={"Name"}
                           onChangeText={(text) => this.setState({name: text})}/>
            </View>
            <View style={styles.inputView}>
            <Text style={styles.text}>Channel Description</Text>
                <TextInput style={styles.input}
                           placeholder={"Description"}
                           multiline={true}
                           onChangeText={(text) => this.setState({description: text})}/>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.text}>Channel Category</Text>
                <ModalDropdown  style={{width: '60%', padding: 10}}
                                dropdownStyle={{width: '60%'}}
                                textStyle={styles.dropdownText}
                                onSelect={(option) => this.setState({category: option})}
                                options={['Cryptocurrency', 'Company', 'Wallet', 'General']}/>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.text}>Channel Type</Text>
                <ModalDropdown style={{width: '60%', padding: 10}}
                                dropdownStyle={{width: '60%'}}
                                textStyle={styles.dropdownText}
                                onSelect={(option) => this.setState({type: option})}
                                options={['Public', 'Read-Only', 'Private']}/>
            </View>

            <View style={styles.centered}>
            <TouchableOpacity style={[styles.doneButton, {marginTop: 25}]} onPress={this.onLaunch}> 
                {this.state.launching && (<ActivityIndicator animating={true}/>)}
                {!this.state.launching && (<Text style={{color: 'white'}}>Launch</Text>)}
            </TouchableOpacity>
            </View>
            
            </ScrollView>
        
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>)
    }
}


const styles = StyleSheet.create({
    scrollView: { 
        height: '100%'
    }, 
    centered: { 
        width: '100%', 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center'
    }, 
    image: { 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        marginTop: 25
    }, 
    inputView: { 
        marginTop: 25, 
        width: '100%', 
        //height: 50, 
        padding: 5, 
        backgroundColor: 'white', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        textAlign: 'center', 
        alignItems: 'center'
    }, 
    dropdownText: { 
        color: 'black', 
        fontSize: 14, 
        lineHeight: 50
    }, 
    text: { 
        justifyContent: 'flex-start', 
        //alignSelf: 'center', 
        height: 50, 
        lineHeight: 50, 
        marginRight: 10, 
        //textAlign: 'center', 
        color: 'gray', 
        width: '40%'
    }, 
    input: { 
        width: '60%', 
        padding: 10 
    }, 
    doneButton: { 
        width: 200, 
        height: 50, 
        backgroundColor: '#373F51', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius:10, 
    }
})

NewTopic.propTypes = propTypes; 

export default NewTopic; 