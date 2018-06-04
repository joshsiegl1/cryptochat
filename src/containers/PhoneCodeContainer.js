import React from 'react'; 
import { connect } from 'react-redux'; 

import PhoneCode from '../components/PhoneCode'; 

const PhoneCodeContainer = props => <PhoneCode {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 

})(PhoneCodeContainer)