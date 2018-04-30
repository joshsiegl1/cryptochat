import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, TextInput, Text, TouchableOpacity, Image, Keyboard, ScrollView } from 'react-native'; 
import Modal from 'react-native-modal'

const uuid = require("uuid/v4")

import styles from '../styles/chatWindowSheet'; 

//this.props.navigation.state.params
// topic: PropTypes.string, 
// type: PropTypes.string, 
// postID: PropTypes.string, 
// crypto: PropTypes.string, 

const propTypes = { 
    user: PropTypes.shape(), 
    PostChat: PropTypes.func, 
    PostReply: PropTypes.func, 
    PostLink: PropTypes.func
}

const greeting = "My Comment"; 

class ChatWindow extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            myText: "", 
            menuVisible: false, 
            linkName: "", 
            link: ""
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

    onLink = () => { 
        this.setState({menuVisible: !this.state.menuVisible}); 
    }

    onSubmitLink = () => { 

        const { PostLink } = this.props; 

        let id = uuid(); 
        let name = this.state.linkName; 
        let url = this.state.link; 

        //check to make sure it's a valid url

        PostLink(id, name, url); 

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
            <Modal 
            isVisible={this.state.menuVisible}>

            <View style={{
                flex: 1, 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%'
            }}> 
                <View style={{ backgroundColor: 'white', width: '100%', height: 'auto', padding: 10}}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={this.onLink}>
                        <Image style={{width: 20, height: 20}} source={require('../../assets/ic_close.png')} />
                        </TouchableOpacity>
                        <Text style={{paddingLeft: 125, fontSize: 18, fontWeight: 'bold'}}>Link</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', paddingTop: 25}}> 
                        <TextInput style={{fontSize: 18, width: '100%'}} 
                                   placeholder="Name"
                                   onChangeText={(text) => this.setState({linkName: text})}/>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', paddingTop: 25}}>
                        <TextInput style={{fontSize: 18, width: '100%'}} 
                                   placeholder="Link"
                                   onChangeText={(text) => this.setState({link: text})}/>
                    </View>
                    <View style={{paddingTop: 25}}>
                        <TouchableOpacity onPress={this.onSubmitLink}>
                            <View style={{backgroundColor: '#373F51', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', padding: 10}}>
                                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', lineHeight: 18}}>Submit Link</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            </Modal>
            <View style={{height: '10%', marginBottom: 10}}> 
            <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{padding: 20}} onPress={this.onPost}>
                    <Text style={styles.sendText}>POST</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 20}} onPress={this.onLink}> 
                    <Image style={{width: 24, height: 24}} source={require('../../assets/ic_link.png')} />
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