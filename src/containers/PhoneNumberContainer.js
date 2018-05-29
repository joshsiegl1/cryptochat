import React from 'react'; 
import { connect } from 'react-redux'; 

import PhoneNumber from '../components/PhoneNumber'; 

const PhoneNumberContainer = props => <PhoneNumber {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 

})(PhoneNumberContainer); 