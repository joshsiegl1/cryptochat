import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text } from 'react-native'; 

const propTypes = { 
    Phone: PropTypes.string
}

class Account extends Component { 
    constructor(props) { 
        super(props)
    }

    render() { 
        return(<View>
            <Text>Account</Text>
        </View>)
    }
}

Account.propTypes = propTypes; 

export default Account; 