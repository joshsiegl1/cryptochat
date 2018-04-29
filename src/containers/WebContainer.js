import React from 'react'; 
import { connect } from 'react-redux';

import Web from '../components/Web'; 

const WebContainer = props => <Web {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 

})(WebContainer); 