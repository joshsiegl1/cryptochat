import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, FlatList, TextInput, Button, Text, Image, StyleSheet, TouchableOpacity, 
Keyboard, KeyboardAvoidingView, Alert, Dimensions, Modal} from 'react-native'; 

import { ImagePicker, Permissions, StoreReview } from 'expo'; 

import ChatItem from './ChatItem'; 

import { RNS3 } from 'react-native-aws3'; 
import { accessKey, secretKey } from '../aws_config.js'; 

import ChatModal from './ChatModal'; 

import Ad from './Ad'; 
import { PostChat } from '../actions/ChatActions';

const propTypes = { 
    id: PropTypes.string, 
    user: PropTypes.shape({})
}

class Chat extends Component { 
    constructor(props) { 
        super(props)

        this.imagePressed = false; 
        
        this.state = { 
            message: '', 
            height: '100%',
            chatHeight: '10%',  
            flatHeight: '90%', 
            hasFocus: false, 
            modal: { 
                visible: false, 
                item: null
            }
        }
    }

    componentDidMount() { 
        
                const { navigation, GetChat } = this.props; 
        
                const { crypto } = navigation.state.params; 
        
                const { setParams } = this.props.navigation; 
        
                setParams({title: crypto}); 
        
                GetChat(crypto); 
            }
        
            componentDidUpdate() { 
        
                const { navigation, GetChat, chat } = this.props;
        
                const { crypto } = navigation.state.params; 
        
                if (Object.keys(chat).length > 0) {
                    const thisChat = chat[crypto]; 
                    if (thisChat === undefined) { 
                        GetChat(crypto); 
                    }
                }
                
            }

    onMoreDotsPressed = (item) => { 

        let modal = { 
            visible: true, 
            item: item
        }

        this.setState({modal: modal})
    }

    onBlockUser = (id) => { 
        const { BlockUser } = this.props; 

        BlockUser("", id); 

        Alert.alert("User Blocked", "This user has been blocked, you can undo this by visiting the account page and viewing the blocked user list")
    }

    onBlockPost = (postId) => { 
        const { BlockPost } = this.props; 

        BlockPost(postId);
    
    }

    onFlagPost = (postId) => { 
        const { FlagPost } = this.props; 

        FlagPost(postId); 

        Alert.alert("Post has been flagged", "This post has successfully been flagged for objectionable content, please allow our team up to three days for review"); 
    }

    onModalClose = () => this.setState({modal: { visible: false, item: null}})

    _renderItem = ({item}) => (
        <ChatItem item={item}
                  user={this.props.user} 
                  crypto={this.props.navigation.state.params.crypto}
                  upvote={this.props.Upvote}
                  downvote={this.props.Downvote}
                  navigate={this.props.navigation.navigate}
                  likedPosts={this.props.likedPosts}
                  dislikedPosts={this.props.dislikedPosts}
                  currentTime={this.props.currentTime} 
                  onReplyPressed={this.onReplyPressed}
                  cryptoID={this.props.navigation.state.params.id}
                  fullData={this.props.chat}
                  onMoreDotsPressed={this.onMoreDotsPressed}/>
    )

    _keyExtractor = (item, index) => item.postID

    onReplyPressed = (userID) => {
        this.setState({
            message: "@" + userID + "\n"
        }); 

        this.messageBox.focus(); 
    }

    updateSize = (height) => { 
        this.setState({
            height: height
        }); 
    }

    onFocus = () => { 
        this.setState({hasFocus: true})
    }

    onBlur = () => { 
        this.setState({hasFocus: false})
    }

    onPost = async () => { 

        const { crypto } = this.props.navigation.state.params; 
        const { phone, PostChat, GetChat } = this.props; 

        let message = this.state.message; 
        if (message === '') return; 

        await PostChat(crypto, phone, message); 

        Keyboard.dismiss(); 

        await GetChat(crypto); 

        this.setState({
            message: ""
        })
    }

    onImage = async () => { 
        if (!this.imagePressed) { 
            this.imagePressed = true; 

            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); 
            const { crypto } = this.props.navigation.state.params; 
            const { phone, PostChat, GetChat } = this.props; 

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

                    await PostChat(crypto, phone, message); 
                    
                    await GetChat(crypto); 

                    this.forceUpdate(); 
                }
            }
            this.messageBox.focus(); 
            this.imagePressed = false; 
            Keyboard.dismiss(); 
        }
    }

    render() { 
        const { chat, navigation, user} = this.props; 
        const { crypto, postID } = navigation.state.params; 
        const { message } = this.state; 

        let chats = []; 
        if (Object.keys(chat).length > 0) { 
            chats = chat[crypto]; 
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
                    source={require('../../assets/ic_link.png')} />
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
        

        return (
            <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={offset}
            style={styles.KeyboardView}> 

            <FlatList 
            removeClippedSubviews
            ref={ref => this.flatList = ref}
            style={flatStyle}
            data={chats}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            />

            {/* <Ad /> */}

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
                           onChangeText={(message) => this.setState({message})}
                           onBlur={this.onBlur}
                           onFocus={this.onFocus}
                           >
                </TextInput>
                {submit}
            </View>

            <ChatModal visible={this.state.modal.visible} 
                       item={this.state.modal.item}
                       onModalClose={this.onModalClose} 
                       onBlockUser={this.onBlockUser}
                       onFlagPost={this.onFlagPost}
                       onBlockPost={this.onBlockPost}/>
            </KeyboardAvoidingView>
        )
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

Chat.propTypes = propTypes; 

export default Chat; 