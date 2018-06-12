import React from 'react'; 
import { connect } from 'react-redux'; 

import PhoneCode from '../components/PhoneCode'; 

import { SubmitCode } from '../actions/PhoneActions'; 

import { getPhone } from '../selectors/CommonSelectors'; 

const PhoneCodeContainer = props => <PhoneCode {...props} />

const mapStateToProps = (state) => { 
    return { 
        user: getPhone(state), 
    }
}

export default connect(mapStateToProps, { 
    SubmitCode
})(PhoneCodeContainer)