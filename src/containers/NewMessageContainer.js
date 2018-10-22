import React from 'react'; 
import { connect } from 'react-redux'; 

import NewMessage from '../components/NewMessage'; 

const NewMessageContainer = props => <NewMessage {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 

})(NewMessageContainer)