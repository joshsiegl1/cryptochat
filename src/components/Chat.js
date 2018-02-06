import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, FlatList, TextInput, Button} from 'react-native'; 

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

        const { id, GetChat } = this.props; 
        GetChat(id); 
    }

    onPressPost = () => { 

    }

    render() { 

        const { chat } = this.props;

        let chats = []; 
        console.log(chat); 
        if (Object.keys(chat).length > 0) {
            chats = chat.map(c => { 
                return (<View> {c.body} </View>)
            })
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