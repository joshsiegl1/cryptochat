import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, FlatList, TextInput, Button, Text, Image, 
    KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native'; 

import styles from '../styles/stylesheet'; 

import ChatItem from './ChatItem'; 

import { AdMobBanner } from 'expo'; 

const propTypes = { 
    id: PropTypes.string, 
    GetChat: PropTypes.func, 
    PostChat: PropTypes.func, 
    Upvote: PropTypes.func, 
    Downvote: PropTypes.func, 
    chat: PropTypes.shape(), 
    user: PropTypes.shape()
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

    
        const { navigation, PostChat, user } = this.props; 

        const { crypto } = navigation.state.params; 

        let text = this.state.myText; 
        if (text === '' || text === friendlyGreeting) return; 

        Keyboard.dismiss(); 

        let username = "anonymous"; 
        if (!(Object.keys(user).length === 0 && user.constructor === Object)) { 
            if (user.userID !== "") { 
                username = user.userID
            }
        }

        PostChat(crypto, username, text); 

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
                  crypto={this.props.navigation.state.params.crypto}
                  upvote={this.props.Upvote}
                  downvote={this.props.Downvote} />
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

    displayAd = () => { 
        if (Platform.OS === 'ios') { 
            return (<AdMobBanner 
            bannerSize="fullbanner"
            adUnitID="ca-app-pub-2896471597472603/8703233139"
            didFailToReceiveAdWithError={this.bannerError}
            />) 
        }
        else { 
            return (<AdMobBanner 
            bannerSize="fullbanner"
            adUnitID="ca-app-pub-2896471597472603/2666295016"
            didFailToReceiveAdWithError={this.bannerError}
            />) 
        }
    }

    render() { 

        const { chat, navigation } = this.props;
        const { crypto } = navigation.state.params; 

        let ad = this.displayAd(); 

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

                    {ad}
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
                    }}>{this.state.myText.length} / {totalChatLength}</Text> 
                 </View>

                    <TouchableOpacity 
                    style={styles.chatButton}
                    onPress={this.onPressPost}>
                    <Image source={require('../../assets/ic_send.png')}
                           style={{marginLeft: 25, marginTop: 20, width: 24, height: 24}}></Image>

                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

Chat.propTypes = propTypes; 

export default Chat; 