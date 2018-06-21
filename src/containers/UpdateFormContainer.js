import React from 'react'; 
import { connect } from 'react-redux'; 

import UpdateForm from '../components/UpdateForm'; 

const UpdateFormContainer = props => <UpdateForm {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 

})(UpdateFormContainer)