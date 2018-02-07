import React from 'react'; 
import { connect } from 'react-redux'; 

import { parseRoute } from '../utils/RouterUtils'; 

import { GetChat, PostChat } from '../actions/ChatActions'; 

import { getChats } from '../selectors/CommonSelectors'; 

import Chat from '../components/Chat'; 

const ChatContainer = props => <Chat {...props} />

const mapStateToProps = (state) => { 
    console.log(state); 
    return {
        chat: getChats(state)
    }
}

export default connect(mapStateToProps, { 
    GetChat, 
    PostChat
})(ChatContainer)