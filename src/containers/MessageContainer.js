import React from 'react'; 
import { connect } from 'react-redux'; 

import Message from '../components/Message'; 

import { getUser } from '../selectors/CommonSelectors'; 

const MessageContainer = props => <Message {...props} />

const mapStateToProps = (state) => { 
    return { 
        user: getUser(state)
    }; 
}

export default connect(mapStateToProps, { 

})(MessageContainer)