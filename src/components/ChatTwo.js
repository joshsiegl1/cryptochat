import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, FlatList, TextInput, Button, Text, Image, 
KeyBoardAvoidingView, StyleSheet, TouchableOpacity, Keyboard, KeyboardAvoidingView} from 'react-native'; 

import ChatItemTwo from './ChatItemTwo'; 

import Ad from './Ad'; 

const propTypes = { 
    id: PropTypes.string
}

class ChatTwo extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            message: '', 
            height: 50, 
            hasFocus: false
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

    _renderItem = ({item}) => (
        <ChatItemTwo item={item}
                  crypto={this.props.navigation.state.params.crypto}
                  upvote={this.props.Upvote}
                  downvote={this.props.Downvote}
                  navigate={this.props.navigation.navigate}
                  likedPosts={this.props.likedPosts}
                  dislikedPosts={this.props.dislikedPosts}
                  currentTime={this.props.currentTime} />
    )

    _keyExtractor = (item, index) => item.postID

    updateSize = (height) => { 
        this.setState({
            height: height + 10
        }); 
    }

    onFocus = () => { 
        this.updateSize(95); 
        this.setState({hasFocus: true})
    }

    onBlur = () => { 
        this.updateSize(35); 
        this.setState({hasFocus: false})
    }

    render() { 
        const { chat, navigation} = this.props; 
        const { crypto, postID } = navigation.state.params; 
        const { message, height } = this.state; 

        let chats = []; 
        if (Object.keys(chat).length > 0) { 
            chats = chat[crypto]; 
        }

        let textInputStyle = StyleSheet.flatten([styles.chatBar, {height: height}]); 
        let chatContainerStyle = styles.chatBarContainer; 
        let link = <View />
        let submit = <View />

        if (this.state.hasFocus) { 
            link = (
                <TouchableOpacity>
                    <Image style={styles.linkImage} 
                    source={require('../../assets/ic_link.png')} />
                </TouchableOpacity>
            )
            submit = (
                <TouchableOpacity>
                    <Image style={styles.submitImage}
                    source={require('../../assets/ic_send.png')} />
                </TouchableOpacity>
            )
            chatContainerStyle = StyleSheet.flatten([styles.chatBarContainer, {
                display: 'flex', 
                flexDirection: 'row'
            }])
            textInputStyle = StyleSheet.flatten([styles.chatBar, {height: height, flex: 1}])
        }
        

        return (
            <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={150}
            style={styles.KeyboardView}> 

            <FlatList 
            removeClippedSubviews
            ref={ref => this.flatList = ref}
            style={styles.flatList}
            data={chats}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            />

            {/* <Ad /> */}

            <View style={chatContainerStyle}>
                {link}
                <TextInput 
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

            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    KeyboardView: { 
        flex: 1
    }, 
    flatList: { 
        height: '90%'
    }, 
    chatBarContainer: { 
        backgroundColor: 'white', 
        borderColor: 'lightgray', 
        borderTopWidth: 1, 
        width: '100%', 
        padding: 10, 
    }, 
    chatBar: { 
        backgroundColor: '#F2F2F2', 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#E5E5E5', 
        padding: 5, 
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

ChatTwo.propTypes = propTypes; 

export default ChatTwo; 