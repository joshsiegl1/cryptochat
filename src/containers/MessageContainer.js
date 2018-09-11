import React from 'react'; 
import { connect } from 'react-redux'; 

import Message from '../components/Message'; 

const MessageContainer = props => <Message {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 

})(MessageContainer)