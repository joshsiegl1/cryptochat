import React from 'react'; 
import { connect } from 'react-redux'; 

import User from '../components/User'; 

const UserContainer = props => <User {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 

})(UserContainer)