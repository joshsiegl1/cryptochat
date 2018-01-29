import React from 'react'; 
import { connect } from 'react-redux'; 

import { navigateTo} from '../actions/RouterActions'; 

const ChatContainer = props => 

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 
    navigateTo
})(ChatContainer)