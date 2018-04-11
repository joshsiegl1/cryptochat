import React from 'react'; 
import { connect } from 'react-redux'; 

import { parseRoute } from '../utils/RouterUtils'; 

import { GetChat, PostChat, Upvote, Downvote } from '../actions/ChatActions'; 

import { getChats, 
    getUser, 
    getLikedPosts, 
    getDislikedPosts, 
    getCurrentTime } from '../selectors/CommonSelectors'; 

import Chat from '../components/Chat'; 

const ChatContainer = props => <Chat {...props} />

const mapStateToProps = (state) => { 
    return {
        chat: getChats(state), 
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
    Downvote
})(ChatContainer)