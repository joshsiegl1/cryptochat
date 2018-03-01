import React from 'react'; 
import { connect } from 'react-redux'; 

import Register from '../components/Register'; 

import { AddUser } from '../actions/UserActions'; 

const RegisterContainer = props => <Register {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 
    AddUser
})(RegisterContainer)