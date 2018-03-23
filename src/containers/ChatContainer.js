import React from 'react'; 
import { connect } from 'react-redux'; 

import { parseRoute } from '../utils/RouterUtils'; 

import { GetChat, PostChat, Upvote } from '../actions/ChatActions'; 

import { getChats, getUser } from '../selectors/CommonSelectors'; 

import Chat from '../components/Chat'; 

const ChatContainer = props => <Chat {...props} />

const mapStateToProps = (state) => { 
    return {
        chat: getChats(state), 
        user: getUser(state)
    }
}

export default connect(mapStateToProps, { 
    GetChat, 
    PostChat,
    Upvote
})(ChatContainer)