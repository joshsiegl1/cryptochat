import React from 'react'; 
import { connect } from 'react-redux'; 

import {GetUserGroups} from '../actions/MessageActions'; 

import { getUserGroups } from '../selectors/CommonSelectors'; 

import MessageList from '../components/MessageList'; 

const MessageListContainer = props => <MessageList {...props} /> 

const mapStateToProps = (state) => { 
    return { 
        groups: getUserGroups(state)
    }
}

export default connect(mapStateToProps, { 
    GetUserGroups
})(MessageListContainer); 