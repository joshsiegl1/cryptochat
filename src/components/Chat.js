import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, FlatList, TextInput, Button} from 'react-native'; 

import { AdMobBanner } from 'expo'; 

const propTypes = { 
    navigateTo: PropTypes.func
}

class Chat extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            myText: ''
        }; 
    }

    onPressPost = () => { 

    }

    render() { 
        return ( 
            <View> 
                <TextInput 
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