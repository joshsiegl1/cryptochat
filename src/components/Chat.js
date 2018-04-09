import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, FlatList, TextInput, Button, Text, Image, 
    KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native'; 

import styles from '../styles/stylesheet'; 

import ChatItem from './ChatItem'; 

import ChatBar from './ChatBar'; 

import { AdMobBanner } from 'expo'; 

const propTypes = { 
    id: PropTypes.string, 
    GetChat: PropTypes.func, 
    PostChat: PropTypes.func, 
    Upvote: PropTypes.func, 
    Downvote: PropTypes.func, 
    chat: PropTypes.shape(), 
    user: PropTypes.shape(), 
    likedPosts: PropTypes.arrayOf(PropTypes.string), 
    dislikedPosts: PropTypes.arrayOf(PropTypes.string)
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
                  downvote={this.props.Downvote}
                  navigate={this.props.navigation.navigate}
                  likedPosts={this.props.likedPosts}
                  dislikedPosts={this.props.dislikedPosts} />
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
        const { crypto, postID } = navigation.state.params; 

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

                <ChatBar id={crypto}
                         postID={postID}
                         type="chat"
                         topic={crypto}
                         navigate={this.props.navigation.navigate}
                         greeting="Add a comment" />
            </KeyboardAvoidingView>
        )
    }
}

Chat.propTypes = propTypes; 

export default Chat; 