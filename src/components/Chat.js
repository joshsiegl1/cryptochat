import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, FlatList, TextInput, Button, Text, Image} from 'react-native'; 

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

        const { setParams } = this.props.navigation; 

        setParams({title: crypto}); 

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

    _renderItem = ({item}) => (
        <View style={styles.messageBox}>
        <Image style={{width: 16, height: 16}}
               source={{uri: `https://files.coinmarketcap.com/static/img/coins/32x32/${this.props.navigation.state.params.crypto}.png`}} />
        <Text style={styles.messageText}>{item.body}</Text>
        </View>
    )

    _keyExtractor = (item, index) => item.id

    render() { 

        const { chat, navigation } = this.props;
        const { crypto } = navigation.state.params; 

        let chats = []; 
        if (Object.keys(chat).length > 0) {

            chats = chat[crypto]; 
        }

        return ( 
            <View>
            <FlatList 
                data={chats}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem} /> 
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