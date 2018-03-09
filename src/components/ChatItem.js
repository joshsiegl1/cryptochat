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
                <View style={styles.titleBox}>
                    <Image style={{width: 16, height: 16}}
                    source={{uri: `http://www.joshsiegl.com/crypto/${this.props.crypto}.png`}} />
                    <Text style={{paddingLeft: 5, width: '90%'}}>{item.userID}</Text>  
                    <Text style={styles.messageText}>{item.body}</Text>
                </View>
                
                </View>)
    }
}

ChatItem.propTypes = propTypes; 

export default ChatItem; 