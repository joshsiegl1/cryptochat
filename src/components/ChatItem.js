import PropTypes from 'prop-types'; 
import React, {PureComponent } from 'react'; 

import {View, Image, Text} from 'react-native'; 

import styles from '../styles/stylesheet'; 

const propTypes = { 
    item: PropTypes.shape,
    crypto: PropTypes.string.isRequired
}

class ChatItem extends PureComponent { 
    constructor(props) { 
        super(props)
    }

    render() { 
        const { item } = this.props

        return (<View style={styles.messageBox}>
                    <Image style={{width: 16, height: 16}}
                    source={{uri: `http://www.joshsiegl.com/crypto/${this.props.crypto}.png`}} />
                <Text style={styles.messageText}>{item.body}</Text>
                </View> )
    }
}

ChatItem.propTypes = propTypes; 

export default ChatItem; 