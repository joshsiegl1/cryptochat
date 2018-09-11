import React from 'react'; 
import { connect } from 'react-redux'; 

import MessageList from '../components/MessageList'; 

const MessageListContainer = props => <MessageList {...props} /> 

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 
    
})(MessageListContainer); 