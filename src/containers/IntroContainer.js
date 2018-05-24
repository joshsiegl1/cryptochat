import React from 'react'; 
import { connect } from 'react-redux'; 

import Intro from '../components/Intro'; 

const IntroContainer = props => <Intro {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, {})(IntroContainer)