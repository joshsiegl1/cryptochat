import React from 'react'; 
import { connect } from 'react-redux'; 

import UpdateForm from '../components/UpdateForm'; 

import { UpdateUsername } from '../actions/UserActions'; 

import { getUser } from '../selectors/CommonSelectors'; 

const UpdateFormContainer = props => <UpdateForm {...props} />

const mapStateToProps = (state) => { 
    return { 
        user: getUser(state)
    }
}

export default connect(mapStateToProps, { 
    UpdateUsername
})(UpdateFormContainer)