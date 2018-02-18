import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, FlatList, TextInput, Button, Text, Image, 
    KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native'; 

import styles from '../styles/stylesheet'; 

import ChatItem from './ChatItem'; 

import { AdMobBanner } from 'expo'; 

const propTypes = { 
    id: PropTypes.string, 
    GetChat: PropTypes.func, 
    PostChat: PropTypes.func, 
    chat: PropTypes.shape()
}

const friendlyGreeting = "Say something to this group"; 
const totalChatLength = 200; 

class Chat extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            myText: friendlyGreeting, 
            chatColor: 'darkgray'
        }; 
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

    onPressPost = () => { 

        const { navigation, PostChat } = this.props; 

        const { crypto } = navigation.state.params; 

        let text = this.state.myText; 
        if (text === '') return; 

        Keyboard.dismiss(); 

        PostChat(crypto, "joshsiegl", text); 

        this.setState({myText: friendlyGreeting, chatColor: 'darkgrey'})
    }

    onInputFocused = () => { 
        if (this.state.myText === friendlyGreeting) { 
            this.setState({myText: ''}); 
        }

        this.setState({chatColor: 'black'}); 
    }

    _renderItem = ({item}) => (
        <ChatItem item={item}
                  crypto={this.props.navigation.state.params.crypto} />
    )

    _keyExtractor = (item, index) => item.id

    onScrollback = () => { 
        try { 
             this.flatList.scrollToEnd({animated: true}); 
        }
        catch(error) {  }
    }

    onChangeText = (text) => { 
        if (this.state.myText.length < totalChatLength) { 
            this.setState({myText: text}); 
        }
    }

    render() { 

        const { chat, navigation } = this.props;
        const { crypto } = navigation.state.params; 

        let chats = []; 
        if (Object.keys(chat).length > 0) {
            chats = chat[crypto]; 
        }

        return ( 
            <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={50}
            style={{flex: 1}}> 

            <FlatList 
                removeClippedSubviews
                ref={ref => this.flatList = ref}
                onContentSizeChange={this.onScrollback}
                onLayout={this.onScrollback}
                style={{height: '80%'}}
                data={chats}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem} />

                <View
                    style={{borderColor: 'gray', 
                            backgroundColor: 'black', 
                            borderWidth: 1, 
                            paddingLeft: 25, 
                            paddingRight: 25}}>

                    <AdMobBanner 
                    bannerSize="fullbanner"
                    adUnitID="ca-app-pub-2896471597472603/8703233139"
                    testDeviceID="EMULATOR"
                    didFailToReceiveAdWithError={this.bannerError}
                    /> 
                </View> 
                <View style={{
                    flexDirection: 'row', 
                    width: '100%', 
                    height: 60}}>

                 <TextInput 
                 style={{
                     width: '60%', 
                     height: '100%', 
                     backgroundColor: 'white', 
                     color: this.state.chatColor, 
                     padding: 5
                 }}
                 multiline={false}
                 onChangeText={this.onChangeText}
                 value={this.state.myText} 
                 onFocus={this.onInputFocused}/>

                 <View style={styles.chatButton}>
                    <Text style={{
                        paddingTop: 20, 
                        verticalAlign: 'middle'
                    }}>{this.state.myText.length} / {totalChatLength}</Text> 
                 </View>

                    <TouchableOpacity 
                    style={styles.chatButton}
                    onPress={this.onPressPost}>
                        <Text style={{
                            paddingLeft: 15, 
                            paddingTop: 20, 
                            verticalAlign: 'middle'
                        }}>Post</Text>

                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

Chat.propTypes = propTypes; 

export default Chat; 