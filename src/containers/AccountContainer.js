import React from 'react'; 
import { connect } from 'react-redux'; 

import Account from '../components/Account'; 

import { getUser } from '../selectors/CommonSelectors';

const AccountContainer = props => <Account {...props} />

const mapStateToProps = (state) => { 
    return { 
        User: getUser(state)
    }
}

export default connect(mapStateToProps, { 
    
})(AccountContainer)