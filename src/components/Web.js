import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, WebView} from 'react-native'; 

//this.props.navigation.state.params
// topic: PropTypes.string, 
// type: PropTypes.string, 
// postID: PropTypes.string, 
// crypto: PropTypes.string, 

const propTypes = {

}

class Web extends Component { 
    constructor(props) {
        super(props)

        this.state = {}; 
    }

    render() { 
        const { url } = this.props.navigation.state.params; 
        const uri = url; 
        return (<WebView source={{uri}}></WebView>)
    }
}

Web.propTypes = propTypes; 

export default Web; 