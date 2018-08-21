import React from 'react'; 
import { connect } from 'react-redux'; 

import BlockedUsersForm from '../components/BlockedUsersForm'; 

const BlockedUsersContainer = props => <BlockedUsersForm {...props} />

const mapStateToProps = (state) => { 
    return state
}

export default connect(mapStateToProps, { 

})(BlockedUsersContainer)

