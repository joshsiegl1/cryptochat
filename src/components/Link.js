import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {Text} from 'react-native'; 

const propTypes = {
    navigate: PropTypes.func, 
    name: PropTypes.string, 
    url: PropTypes.string, 
    style: PropTypes.shape({})
}

class Link extends Component { 
    constructor(props) { 
        super(props)
    }

    onPress = () => { 
        const { url, navigate} = this.props; 

        navigate("Web", { url }); 
    }

    render() { 

        const {name} = this.props;
        let style = {...{color: 'blue', fontSize: 18}, ...this.props.style};  
        return (
            <Text onPress={this.onPress} style={style}>{name}</Text>)
    }
}

Link.propTypes = propTypes; 

export default Link; 