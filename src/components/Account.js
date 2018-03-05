import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text } from 'react-native'; 

const propTypes = { 
    User: PropTypes.shape({
        karma: PropTypes.string, 
        userID: PropTypes.string
    })
}

class Account extends Component { 
    constructor(props) { 
        super(props)
    }

    componentWillMount() { 
        //Check to make sure we have a user

        const { User, navigation } = this.props; 

        if (User === undefined || User === null) { 
            navigation.navigate('User'); 
        }
    }

    render() { 
        return(<View>
            <Text>Account</Text>
        </View>)
    }
}

Account.propTypes = propTypes; 

export default Account; 