import React from 'react'; 
import { connect } from 'react-redux'; 

import { BlockUser } from '../actions/UserActions'; 

import { getUser } from '../selectors/CommonSelectors'; 

import BlockedUsersForm from '../components/BlockedUsersForm'; 

const BlockedUsersContainer = props => <BlockedUsersForm {...props} />

const mapStateToProps = (state) => { 
    return { 
        user: getUser(state)
    }
}

export default connect(mapStateToProps, { 
    BlockUser
})(BlockedUsersContainer)

