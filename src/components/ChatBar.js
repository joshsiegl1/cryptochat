import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, TouchableOpacity, Text } from 'react-native'; 

import styles from '../styles/chatBarSheet'; 

const propTypes = { 
    id: PropTypes.string,
    postID: PropTypes.string,
    type: PropTypes.string,
    topic: PropTypes.string,
    navigate: PropTypes.func, 
    greeting: PropTypes.string, 
}

class ChatBar extends Component { 
    constructor(props) { 
        super(props) 
    }

    onPress = () => { 
        const { id, postID, type, topic, navigate } = this.props; 

        navigate("ChatWindow", 
        {
            postID: postID, 
            crypto: id, 
            type: type, 
            topic: topic
        }); 
    }

    render() { 
        return (<View style={styles.container}>
                    <TouchableOpacity onPress={this.onPress}>
                        <View style={styles.chatBar}>
                            <Text style={styles.centerText}>{this.props.greeting}</Text>
                        </View>
                    </TouchableOpacity>
                </View>)
    }
}

ChatBar.propTypes = propTypes; 

export default ChatBar; 