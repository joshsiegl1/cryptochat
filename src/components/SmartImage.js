import React, {Component} from 'react'; 
import PropTypes from 'prop-types'; 

import { Image } from 'react-native-expo-image-cache'; 

const propTypes = { 
    uri: PropTypes.string
}

class SmartImage extends Component { 
    constructor(props) { 
        super(props)
    }

    render() { 
        const preview = require('../../assets/image_preview.png'); 
        const uri = this.props.uri; 

        return <Image style={{height: 350, width: '100%'}} {...{preview, uri}}/>
    }
}

SmartImage.propTypes = propTypes; 

export default SmartImage; 