import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, WebView} from 'react-native'; 

const propTypes = {}

class Web extends Component { 
    constructor(props) {
        super(props)

        this.state = {}; 
    }

    render() { 
        return (<View></View>)
    }
}

Web.propTypes = propTypes; 

export default Web; 