import React from 'react'; 
import { connect } from 'react-redux'; 

import Account from '../components/Account'; 

import { getPhone } from '../selectors/CommonSelectors';

const AccountContainer = props => <Account {...props} />

const mapStateToProps = (state) => { 
    return { 
        Phone: getPhone(state)
    }
}

export default connect(mapStateToProps, { 
    
})(AccountContainer)