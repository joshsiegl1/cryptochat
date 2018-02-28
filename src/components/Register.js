import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text } from 'react-native'; 

const propTypes = { 

}

class Register extends Component { 
    constructor(props) { 
        super(props) 
    }

    render() { 
        return (<View><Text>Register</Text></View>)
    }
}

Register.propTypes = propTypes; 

export default Register; 