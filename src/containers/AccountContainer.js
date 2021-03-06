import React from 'react'; 
import { connect } from 'react-redux'; 

import Account from '../components/Account'; 

import { getPhone, getUser } from '../selectors/CommonSelectors';

import { UpdateUsername, UpdateProfilePicUrl, dispatchLoad, DeleteAccount } from '../actions/UserActions'; 

const AccountContainer = props => <Account {...props} />

const mapStateToProps = (state) => { 
    return { 
        user: getUser(state), 
        Phone: getPhone(state)
    }
}

export default connect(mapStateToProps, { 
    UpdateUsername, 
    UpdateProfilePicUrl, 
    dispatchLoad, 
    DeleteAccount
})(AccountContainer)