import React from 'react'; 
import { connect } from 'react-redux'; 

import { navigateTo} from '../actions/RouterActions'; 

import Chat from '../components/Chat'; 

const ChatContainer = props => <Chat {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 
    navigateTo
})(ChatContainer)