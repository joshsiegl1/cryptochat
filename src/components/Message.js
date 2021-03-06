import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, FlatList, TextInput, Button, Text, Image, StyleSheet, 
Keyboard, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native'; 

import MessageItem from './MessageItem'; 

const propTypes = { 
    GetMessages: PropTypes.func, 
    PostMessage: PropTypes.func, 
    messages: PropTypes.shape({}), 
    user: PropTypes.shape({}), 
    currentTime: PropTypes.shape({})
}

class Message extends Component { 
    constructor(props) { 
        super(props) 

        this.imagePressed = false; 

        this.state = { 
            message: '', 
            posting: false, 
            height: '100%',
            chatHeight: '10%',  
            flatHeight: '90%', 
            hasFocus: false, 
        }
    }

    componentDidMount() { 
        const { navigation, GetMessages } = this.props; 

        const { group } = navigation.state.params; 

        const { setParams } = this.props.navigation; 

        setParams({title: group}); 

        GetMessages(group); 
    }

    componentDidUpdate() { 
        const { navigation, GetMessages, messages } = this.props; 

        const { group } = navigation.state.params; 

        if (Object.keys(messages).length > 0) { 
            const thisMessage = messages[group]; 
            if (thisMessage === undefined) { 
                GetMessages(group); 
            }
        }
    }

    onFocus = () => { 
        this.setState({hasFocus: true})
    }

    onBlur = () => { 
        this.setState({hasFocus: false})
    }

    onImage = async () => { 
        if (!this.imagePressed) { 
            this.imagePressed = true; 

            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); 
            const { crypto } = this.props.navigation.state.params; 
            const { phone, PostMessage, GetMessages } = this.props; 

            if (status === 'granted') { 
                let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: false, 
                    base64: true
                })

                if (!result.cancelled) { 
                    let fileName = result.uri.split('/').pop(); 
                    let message = "{" + fileName + "}"; 
                    let match = /\.(\w+)$/.exec(fileName);
                    let imagetype = match ? `image/${match[1]}` : `image`; 

                    const file = { 
                        uri: result.uri, 
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
                        if (response.status !== 201) { 
                            Alert.alert('Error uploading file', 'There was an error uploading the image you selected, please try again'); 
                        }
                        
                    })

                    await PostMessage(crypto, phone, message); 
                    
                    await GetMessages(crypto); 

                    this.forceUpdate(); 
                }
            }
            this.messageBox.focus(); 
            this.imagePressed = false; 
            Keyboard.dismiss(); 
        }
    }

    onPost = async () => { 
        if (!this.state.posting) { 
            const { phone, PostMessage, GetMessages, navigation } = this.props; 
            const { group } = navigation.state.params; 
            

            let message = this.state.message;
            if (message === '') return; 

            this.setState({
                posting: true
            })

            await PostMessage(group, phone, message); 

            Keyboard.dismiss(); 

            await GetMessages(group); 

            this.setState({
                message: "", 
                posting: false
            })
        }
    }

    _renderItem = ({item}) => (
        <MessageItem item={item}
                     user={this.props.user}
                     fullData={this.props.messages}
                     group={this.props.navigation.state.params.group}
        />
    )

    _keyExtractor = (item, index) => item.postID

    render() { 
        const { messages, navigation} = this.props; 
        const { group, postID} = navigation.state.params; 
        const { message } = this.state; 

        let messageList = []; 
        if (Object.keys(messages).length > 0) { 
            messageList = messages[group]; 
        }

        let textInputStyle = StyleSheet.flatten([styles.chatBar, {height: this.state.height}]); 
        let chatContainerStyle = StyleSheet.flatten([styles.chatBarContainer, {height: this.state.chatHeight}]); 
        let flatStyle = StyleSheet.flatten([styles.flatList, {height: this.state.flatHeight}])
        let link = <View />
        let submit = <View />

        let { width, height } = Dimensions.get('window'); 
        
        let offset = height * 0.1; 

        if (this.state.hasFocus) { 
            link = (
                <TouchableOpacity onPress={this.onImage}>
                    <Image style={styles.linkImage} 
                    source={require("../../assets/ic_link.png")}/> 
                </TouchableOpacity>
            )
            submit = (
                <TouchableOpacity onPress={this.onPost}>
                    <Image style={styles.submitImage}
                    source={require('../../assets/ic_send.png')} />
                </TouchableOpacity>
            )
            chatContainerStyle = StyleSheet.flatten([styles.chatBarContainer, {
                display: 'flex', 
                flexDirection: 'row', 
                //height: '30%'
            }])
            textInputStyle = StyleSheet.flatten([styles.chatBar, {height: this.state.height, flex: 1}])
        }

        return (<KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={offset} 
                style={styles.KeyboardView}>
                
                <FlatList removeClippedSubviews
                          ref={ref => this.flatList = ref}
                          style={flatStyle}
                          data={messageList} 
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderItem} />

                <View style={chatContainerStyle}>
                    {link} 
                    <TextInput
                               ref={(input) => {this.messageBox = input}}
                               blurOnSubmit={false}
                               style={textInputStyle}
                               multiline={true}
                               placeholder="Message"
                               editable={true}
                               value={message}
                               onChangeText={(m) => this.setState({message: m})}
                               onBlur={this.onBlur}
                               onFocus={this.onFocus}
                               >
                    </TextInput>
                    {submit}
                </View>

                </KeyboardAvoidingView> )
    }
}

const styles = StyleSheet.create({
    KeyboardView: { 
        flex: 1, 
        //height: '100%'
    }, 
    flatList: { 
        height: '90%'
    }, 
    chatBarContainer: { 
        backgroundColor: 'white', 
        borderColor: 'lightgray', 
        borderTopWidth: 1, 
        width: '100%', 
        height: '10%', 
        padding: 10, 
    }, 
    chatBar: { 
        backgroundColor: '#F2F2F2', 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#E5E5E5', 
        padding: 5
    }, 
    linkImage: { 
        width: 20, 
        height: 20, 
        marginRight: 10
    }, 
    submitImage: { 
        width: 20, 
        height: 20, 
        marginLeft: 10
    }
})

Message.propTypes = propTypes; 

export default Message; 