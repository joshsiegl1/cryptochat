import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {Image} from 'react-native'; 

class AppHeaderTwo extends Component { 
    constructor(props) { 
        super(props)
    }

    render() { 
        return (<Image source={require('../../assets/header_logo.png')} />)
    }
}

export default AppHeaderTwo; 