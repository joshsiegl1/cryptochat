import React from 'react'; 
import { connect } from 'react-redux'; 

import ChatWindow from '../components/ChatWindow'; 

import { PostChat, PostReply } from '../actions/ChatActions'; 
import { getSignedRequest } from '../actions/ContentActions'; 

import { getPhone } from '../selectors/CommonSelectors'; 

const ChatWindowContainer = props => <ChatWindow {...props} />

const mapStateToProps = (state) => { 
    return { 
        phone: getPhone(state)
    }; 
}

export default connect(mapStateToProps, { 
    PostChat, 
    PostReply, 
    getSignedRequest
})(ChatWindowContainer)

