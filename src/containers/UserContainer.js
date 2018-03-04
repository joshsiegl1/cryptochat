import React from 'react'; 
import { connect } from 'react-redux'; 

import User from '../components/User'; 

import { GetUser, FacebookLogin } from '../actions/UserActions'; 

import { getUser } from '../selectors/CommonSelectors'; 

const UserContainer = props => <User {...props} />

const mapStateToProps = (state) => { 
    return { 
        User: getUser(state)
    }
}

export default connect(mapStateToProps, { 
    GetUser, 
    FacebookLogin
})(UserContainer)