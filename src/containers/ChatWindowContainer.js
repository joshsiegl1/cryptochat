import React from 'react'; 
import { connect } from 'react-redux'; 

import ChatWindow from '../components/ChatWindow'; 

import { PostChat, PostReply } from '../actions/ChatActions'; 
import { PostLink } from '../actions/ContentActions'; 

import { getUser } from '../selectors/CommonSelectors'; 

const ChatWindowContainer = props => <ChatWindow {...props} />

const mapStateToProps = (state) => { 
    return { 
        user: getUser(state)
    }; 
}

export default connect(mapStateToProps, { 
    PostChat, 
    PostReply, 
    PostLink
})(ChatWindowContainer)

