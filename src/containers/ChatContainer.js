import React from 'react'; 
import { connect } from 'react-redux'; 

import { GetChat, PostChat, Upvote, Downvote } from '../actions/ChatActions'; 

import { getChats, 
    getPhone, 
    getLikedPosts, 
    getDislikedPosts, 
    getCurrentTime } from '../selectors/CommonSelectors'; 

import ChatTwo from '../components/ChatTwo'; 

const ChatContainer = props => <ChatTwo {...props} />

const mapStateToProps = (state) => { 
    return {
        chat: getChats(state), 
        phone: getPhone(state), 
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