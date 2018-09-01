import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View } from 'react-native';

const propTypes = { }

class NewTopic extends Component { 
    constructor(props) { 
        super(props) 
    }

    render() { 
        return (<View></View>)
    }
}

NewTopic.propTypes = propTypes; 

export default NewTopic; 