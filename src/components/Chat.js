import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, FlatList, TextInput, Button, Text} from 'react-native'; 

import styles from '../styles/stylesheet'; 

import { AdMobBanner } from 'expo'; 

const propTypes = { 
    id: PropTypes.string, 
    GetChat: PropTypes.func, 
    PostChat: PropTypes.func, 
    chat: PropTypes.shape()
}

class Chat extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            myText: ''
        }; 
    }

    componentDidMount() { 

        const { navigation, GetChat } = this.props; 

        const { crypto } = navigation.state.params; 

        GetChat(crypto); 
    }

    componentDidUpdate() { 

        const { navigation, GetChat, chat } = this.props;

        const { crypto } = navigation.state.params; 

        console.log(chat); 

        if (Object.keys(chat).length > 0) {
            const thisChat = chat[crypto]; 
            if (thisChat === undefined) { 
                console.log(chat); 
                GetChat(crypto); 
            }
        }
        
    }

    onPressPost = () => { 

        const { navigation, PostChat } = this.props; 

        const { crypto } = navigation.state.params; 

        let text = this.state.myText; 
        if (text === '') return; 

        PostChat(crypto, "joshsiegl", text); 
    }

    render() { 

        const { chat, navigation } = this.props;
        const { crypto } = navigation.state.params; 

        let chats = []; 
        console.log(chat); 
        if (Object.keys(chat).length > 0) {
            const thisChat = chat[crypto]; 
            if (thisChat !== undefined) { 
                console.log(crypto); 
                console.log(thisChat); 
                chats = thisChat.map(c => { 
                    console.log(c.body); 
                    return (<View><Text>{c.body}</Text></View>)
            })
        }
        }

        return ( 
            <View> 
                {chats}
                <TextInput 
                style={styles.chatBox}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => this.setState({myText: text})}
                value={this.state.myText} />
                <Button 
                title="Post"
                onPress={this.onPressPost}
                 /> 
            </View>
        )
    }
}

{/* <AdMobBanner 
bannerSize="fullbanner"
adUnitID="ca-app-pub-2896471597472603/8703233139"
testDeviceID="EMULATOR"
didFailToReceiveAdWithError={this.bannerError}
/>  */}

Chat.propTypes = propTypes; 

export default Chat; 