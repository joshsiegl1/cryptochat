import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native'; 

import styles from '../styles/chatWindowSheet'; 

//this.props.navigation.state.params
// topic: PropTypes.string, 
// type: PropTypes.string, 
// postID: PropTypes.string, 
// crypto: PropTypes.string, 

const propTypes = { 
    user: PropTypes.shape(), 
    PostChat: PropTypes.func, 
    PostReply: PropTypes.func
}

const greeting = "My Comment"; 

class ChatWindow extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            myText: ""
        }
    }

    onPost = () => { 
        const { type } = this.props.navigation.state.params; 
        const { user, PostChat, PostReply } = this.props; 

        if (type === "comment") { 

        }
        else { 

        }
    }

    onChange = (text) => { 
        this.setState({myText: text}); 
    }

    render() { 

        const { topic } = this.props.navigation.state.params

        return (<View>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={this.onPost}>
                    <Text style={styles.sendText}>SEND</Text>
                    <Image 
                    style={styles.sendImage}
                    source={require("../../assets/ic_send.png")} />
                </TouchableOpacity>
            </View>
            <View style={styles.topic}>
                <View style={styles.topicInner}>
                    <Text style={styles.topicText}>{topic}</Text>
                </View>
            </View>
            <TextInput 
            placeholder={greeting}
            placeholderTextColor='lightgray'
            style={styles.textInput}
            multiline={true}
            onChange={this.onChange}
            value={this.state.myText} />
        </View>)
    }
}

ChatWindow.propTypes = propTypes; 

export default ChatWindow; 