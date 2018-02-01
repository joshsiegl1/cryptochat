import React from 'react'; 
import { connect } from 'react-redux'; 

import { parseRoute } from '../utils/RouterUtils'; 

import { GetChat, PostChat } from '../actions/ChatActions'; 

import Chat from '../components/Chat'; 

const ChatContainer = props => <Chat {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 
    GetChat, 
    PostChat
})(ChatContainer)