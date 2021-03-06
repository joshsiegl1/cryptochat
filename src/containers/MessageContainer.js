import React from 'react'; 
import { connect } from 'react-redux'; 

import Message from '../components/Message'; 

import { getUser, getMessages, getCurrentMessageTime, getPhone } from '../selectors/CommonSelectors'; 

import { GetMessages, PostMessage } from '../actions/MessageActions'; 

const MessageContainer = props => <Message {...props} />

const mapStateToProps = (state) => { 
    return { 
        messages: getMessages(state), 
        user: getUser(state), 
        currentTime: getCurrentMessageTime(state), 
        phone: getPhone(state)
    }; 
}

export default connect(mapStateToProps, { 
    GetMessages, 
    PostMessage
})(MessageContainer)