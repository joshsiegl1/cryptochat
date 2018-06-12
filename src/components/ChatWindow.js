import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, TextInput, Text, TouchableOpacity, Image, Keyboard, ScrollView, Alert } from 'react-native'; 
import Modal from 'react-native-modal'

import { ImagePicker, Permissions } from 'expo'; 

import { RNS3 } from 'react-native-aws3'
import {accessKey, secretKey } from '../aws_config.js'; 

const uuid = require("uuid/v4")

import Transform from './Transform'; 

import styles from '../styles/chatWindowSheet'; 

//this.props.navigation.state.params
// topic: PropTypes.string, 
// type: PropTypes.string, 
// postID: PropTypes.string, 
// crypto: PropTypes.string, 

const propTypes = { 
    phone: PropTypes.string, 
    PostChat: PropTypes.func, 
    PostReply: PropTypes.func, 
    getSignedRequest: PropTypes.func
}

const greeting = "My Comment"; 

class ChatWindow extends Component { 
    constructor(props) { 
        super(props)

        this.imagePressed = false; 
        this.state = { 
            myText: "", 
            menuVisible: false, 
            linkName: "", 
            link: "", 
            linkArray: [], 
            image: "", 
            fileName: ""
        }
    }

    onPost = () => { 
        const { type, crypto, postID } = this.props.navigation.state.params; 
        const { phone, PostChat, PostReply} = this.props; 
        const { getSignedRequest } = this.props; 

        let text = this.state.myText; 
        if (text === '' || text === greeting) return; 

        let links = this.state.linkArray; 
        if (links.length > 0) { 
            for (let i = 0; i < links.length; i++) { 
                text = text.replace("[" + links[i].name + "]", 
                "|name=" + links[i].name + ";url=" + links[i].url + "|"); 
            }
        }

        if (this.state.fileName !== "" &&
            this.state.image !== "") { 
            let fileName = this.state.fileName; 
            let match = /\.(\w+)$/.exec(fileName);
            let imagetype = match ? `image/${match[1]}` : `image`; 
            
            const file = { 
                uri: this.state.image, 
                name: fileName, 
                type: imagetype
            }; 

            const options = { 
                bucket: 'cryptochat-app-45', 
                region: 'us-east-1', 
                accessKey: accessKey, 
                secretKey: secretKey, 
                successActionStatus: 201
            }

            RNS3.put(file, options).then(response => { 
                if (response.status !== 201) { 

                }
                console.log(response.body); 
            })
        }

        if (type === "comment") { 
            PostReply(crypto, phone, text, postID); 
        }
        else {  
            PostChat(crypto, phone, text); 
        }

        Keyboard.dismiss(); 

        if (this.props.navigation.state.params.onNavigateBack !== undefined) { 
            this.props.navigation.state.params.onNavigateBack(); 
        }

        this.props.navigation.goBack();
    }

    onLink = () => { 
        this.setState({menuVisible: !this.state.menuVisible}); 
    }

    onImage = async () => { 
        if (!this.imagePressed) { 
            this.imagePressed = true; 

            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); 
            if (status === 'granted') { 

            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false, 
                base64: true
            })

            if (!result.cancelled) { 
                let fileName = result.uri.split('/').pop(); 
                let oldFile = this.state.fileName; 

                let newText = (oldFile !== "") ? 
                this.state.myText.replace("{" + oldFile + "}", "{" + fileName + "}") : 
                this.state.myText + " " + "{" + fileName + "}"

                if (newText.indexOf("{" + fileName + "}") === -1) { 
                    newText = newText + " {" + fileName + "}"; 
                }

                this.setState({ 
                    image: result.uri, 
                    fileName,
                    myText: newText}); 
                }
            }

            this.imagePressed = false; 
        }
    }

    onSubmitLink = () => { 

        let id = uuid(); 
        let name = this.state.linkName; 
        let url = this.state.link; 

        if (url.indexOf("https://") === -1 && url.indexOf("http") === -1) { 
            url = "https://" + url; 
        }

        if (name === "") { 
            name = url; 
        }

        links = this.state.linkArray; 
        links.push({
            id,
            name, 
            url
        })

        this.setState(
            {
                myText: this.state.myText + " " + "[" + name + "]", 
                linkArray: links, 
                menuVisible: false
            }); 

    }

    onChange = (text) => { 
        this.setState({myText: text}); 
    }

    render() { 

        const { topic, type } = this.props.navigation.state.params

        let postContent = (type === "comment") ? (
            <View style={styles.topic}>
                    <View style={styles.topicText}><Transform body={topic} navigate={this.props.navigation.navigate} /> </View>
            </View>
        ) : (
            <View style={styles.topic}>
            <Image 
            style={{width: 32, height: 32}}
            source={{uri: `http://www.joshsiegl.com/crypto/${topic}.png`}} />
            </View>
        )

        return (<View>
            <Modal 
            isVisible={this.state.menuVisible}>

            <View style={{
                flex: 1, 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%'
            }}> 
                <View style={{ backgroundColor: 'white', width: '100%', height: 'auto', padding: 10}}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={this.onLink}>
                        <Image style={{width: 20, height: 20}} source={require('../../assets/ic_close.png')} />
                        </TouchableOpacity>
                        <Text style={{paddingLeft: 125, fontSize: 18, fontWeight: 'bold'}}>Link</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', paddingTop: 25}}> 
                        <TextInput style={{fontSize: 18, width: '100%'}} 
                                   placeholder="Name"
                                   onChangeText={(text) => this.setState({linkName: text})}/>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', paddingTop: 25}}>
                        <TextInput style={{fontSize: 18, width: '100%'}} 
                                   placeholder="Link"
                                   onChangeText={(text) => this.setState({link: text})}/>
                    </View>
                    <View style={{paddingTop: 25}}>
                        <TouchableOpacity onPress={this.onSubmitLink}>
                            <View style={{backgroundColor: '#373F51', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', padding: 10}}>
                                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', lineHeight: 18}}>Submit Link</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            </Modal>
            <View style={{height: '10%', marginBottom: 10}}> 
            <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{padding: 20}} onPress={this.onPost}>
                    <Text style={styles.sendText}>POST</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20}}>
                <TouchableOpacity onPress={this.onLink}> 
                    <Image style={{width: 24, height: 24}} source={require('../../assets/ic_link.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{paddingLeft: 20}} onPress={this.onImage}> 
                    <Image style={{width: 24, height: 24}} source={require('../../assets/ic_pic.png')} />
                </TouchableOpacity> 
                </View>
            </View>
            </View>
            <ScrollView style={{height: '20%', marginBottom: 10}}>
            {postContent}
            </ScrollView>
            <View style={{height: '70%'}}>
            <TextInput 
            placeholder={greeting}
            placeholderTextColor='lightgray'
            style={styles.textInput}
            multiline={true}
            onChangeText={this.onChange}
            value={this.state.myText} />
            </View>
        </View>)
    }
}

ChatWindow.propTypes = propTypes; 

export default ChatWindow; 