import React from 'react'; 
import { connect } from 'react-redux'; 

import Register from '../components/Register'; 

const RegisterContainer = props => <Register {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 

})(RegisterContainer)