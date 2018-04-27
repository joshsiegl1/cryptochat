import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, TextInput, Text, TouchableOpacity, Image, Keyboard, ScrollView } from 'react-native'; 

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
        const { type, crypto, postID } = this.props.navigation.state.params; 
        const { user, PostChat, PostReply } = this.props; 

        let text = this.state.myText; 
        if (text === '' || text === greeting) return; 

        let username = "anonymous"; 
        if (!(Object.keys(user).length === 0 && user.constructor === Object)) { 
            if (user.userID !== "") { 
                username = user.userID
            }
        }

        if (type === "comment") { 
            PostReply(crypto, username, text, postID); 
        }
        else {  
            PostChat(crypto, username, text); 
        }

        Keyboard.dismiss(); 

        if (this.props.navigation.state.params.onNavigateBack !== undefined) { 
            this.props.navigation.state.params.onNavigateBack(); 
        }

        this.props.navigation.goBack();
    }

    onChange = (text) => { 
        this.setState({myText: text}); 
    }

    render() { 

        const { topic, type } = this.props.navigation.state.params

        let postContent = (type === "comment") ? (
            <View style={styles.topic}>
                    <Text style={styles.topicText}>{topic}</Text>
            </View>
        ) : (
            <View style={styles.topic}>
            <Image 
            style={{width: 32, height: 32}}
            source={{uri: `http://www.joshsiegl.com/crypto/${topic}.png`}} />
            </View>
        )

        return (<View>
            <View style={{height: '10%', marginBottom: 10}}> 
            <View style={{backgroundColor: 'white'}}>
                <TouchableOpacity style={{padding: 20}} onPress={this.onPost}>
                    <Text style={styles.sendText}>POST</Text>
                </TouchableOpacity>
            </View>
            </View>
            <ScrollView style={{height: '20%', marginBottom: 10}}>
            {postContent}
            </ScrollView>
            <View style={{height: '70%'}}>
            <TextInput 
            placeholder={greeting}
            placeholderTextColor='lightgray'
            style={styles.textInput}
            multiline={true}
            onChangeText={this.onChange}
            value={this.state.myText} />
            </View>
        </View>)
    }
}

ChatWindow.propTypes = propTypes; 

export default ChatWindow; 