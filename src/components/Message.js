import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View } from 'react-native'; 

const propTypes = { 

}

class Message extends Component { 
    constructor(props) { 
        super(props) 
    }

    render() { 
        return (<View />)
    }
}

Message.propTypes = propTypes; 

export default Message; 