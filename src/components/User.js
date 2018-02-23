import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, Text} from 'react-native'; 

import styles from '../styles/stylesheet'; 

const propTypes = { 

}

class User extends Component { 
    constructor(props) { 
        super(props)
    }

    render() { 
        return (<View><Text>User Page</Text></View>)
    }
}

User.propTypes = propTypes; 

export default User; 