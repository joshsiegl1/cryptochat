import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, FlatList, TextInput, Button, Text, Image, 
    KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native'; 

import styles from '../styles/stylesheet'; 

import ChatItem from './ChatItem'; 

import ChatBar from './ChatBar'; 

import Ad from './Ad'; 

const propTypes = { 
    id: PropTypes.string, 
    GetChat: PropTypes.func, 
    PostChat: PropTypes.func, 
    Upvote: PropTypes.func, 
    Downvote: PropTypes.func, 
    chat: PropTypes.shape(), 
    user: PropTypes.shape(), 
    likedPosts: PropTypes.arrayOf(PropTypes.string), 
    dislikedPosts: PropTypes.arrayOf(PropTypes.string), 
    currentTime: PropTypes.date
}

class Chat extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            refresh: false
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

    _renderItem = ({item}) => (
        <ChatItem item={item}
                  crypto={this.props.navigation.state.params.crypto}
                  upvote={this.props.Upvote}
                  downvote={this.props.Downvote}
                  navigate={this.props.navigation.navigate}
                  likedPosts={this.props.likedPosts}
                  dislikedPosts={this.props.dislikedPosts}
                  currentTime={this.props.currentTime} />
    )

    _keyExtractor = (item, index) => item.postID

    onScrollback = () => { 
        try { 
             this.flatList.scrollToOffset({x:0, y:0, animated: true})
        }
        catch(error) {  }
    }

    onNavigateBack = () => { 
        setTimeout(function() { 
            
                        const { navigation, GetChat } = this.props; 
                        
                        const { crypto } = navigation.state.params; 
                                
                        GetChat(crypto);  
            
                    }.bind(this), 1500); 
    }

    render() { 

        const { chat, navigation } = this.props;
        const { crypto, postID } = navigation.state.params; 

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
                style={{height: '80%'}}
                data={chats}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem} /> 

            <Ad />

            <ChatBar id={crypto}
                     postID={postID}
                     type="chat"
                     topic={crypto}
                     navigate={this.props.navigation.navigate}
                     greeting="Add a comment"
                     onNavigateBack={this.onNavigateBack} />


            </KeyboardAvoidingView>
        )
    }
}

Chat.propTypes = propTypes; 

export default Chat; 