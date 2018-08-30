import React from 'react'; 
import { connect } from 'react-redux'; 

import { GetChat, PostChat, Upvote, Downvote } from '../actions/ChatActions'; 

import { FlagPost, BlockPost, BlockUser } from '../actions/UserActions'; 

import { getChats, 
    getPhone, 
    getLikedPosts, 
    getDislikedPosts, 
    getCurrentTime, 
    getUser } from '../selectors/CommonSelectors'; 

import Chat from '../components/Chat'; 

const ChatContainer = props => <Chat {...props} />

const mapStateToProps = (state) => { 
    return {
        chat: getChats(state), 
        phone: getPhone(state), 
        user: getUser(state), 
        likedPosts: getLikedPosts(state), 
        dislikedPosts: getDislikedPosts(state), 
        currentTime: getCurrentTime(state)
    }
}

export default connect(mapStateToProps, { 
    GetChat, 
    PostChat,
    Upvote, 
    Downvote, 
    FlagPost, 
    BlockPost, 
    BlockUser
})(ChatContainer)