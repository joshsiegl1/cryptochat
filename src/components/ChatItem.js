import PropTypes from 'prop-types'; 
import React, {PureComponent } from 'react'; 

import {View, Image, Text, TouchableOpacity} from 'react-native'; 

import styles from '../styles/stylesheet'; 

const propTypes = { 
    item: PropTypes.shape,
    crypto: PropTypes.string.isRequired
}

class ChatItem extends PureComponent { 
    constructor(props) { 
        super(props)
    }

    onUpvotePressed = () => { 

    }

    onDownvotePressed = () => { 

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
                <View style={styles.voteBox}>
                    <View style={styles.voteSection}>
                        <TouchableOpacity onPress={this.onUpvotePressed}>
                            <Image source={require('../../assets/up_arrow.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{paddingRight: 5, paddingLeft: 5}}>vote</Text>
                        <TouchableOpacity onPress={this.onDownvotePressed}>
                            <Image source={require('../../assets/down_arrow.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>)
    }
}

ChatItem.propTypes = propTypes; 

export default ChatItem; 