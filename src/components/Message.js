import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, FlatList, TextInput, Button, Text, Image, StyleSheet, 
Keyboard, KeyboardAvoidingView } from 'react-native'; 

import MessageItem from './MessageItem'; 

const propTypes = { 

}

class Message extends Component { 
    constructor(props) { 
        super(props) 

        this.state = { 
            posting: false, 
            message: "", 
            height: '100%', 
            chatHeight: '10%', 
            flatHeight: '90%', 
            hasFocus: false
        }
    }

    onFocus = () => { 
        this.setState({hasFocus: true})
    }

    onBlur = () => { 
        this.setState({hasFocus: false})
    }

    onPost = async () => { 
        if (!this.state.posting) { 

            let message = this.state.message;
            if (message === '') return; 

            this.setState({
                posting: true
            })

            Keyboard.dismiss(); 

            this.setState({
                message: "", 
                posting: false
            })
        }
    }

    _renderItem = ({item}) => (
        <MessageItem item={item}
                     user={this.props.user}
        />
    )

    _keyExtractor = (item, index) => item.postID

    render() { 
        const { messages, navigation} = this.props; 
        const { messageID, postID} = navigation.state.params; 
        const { message } = this.state; 

        let textInputStyle = StyleSheet.flatten([styles.chatBar, {height: this.state.height}]); 
        let chatContainerStyle = StyleSheet.flatten([styles.chatBarContainer, {height: this.state.chatHeight}]); 
        let flatStyle = StyleSheet.flatten([styles.flatList, {height: this.state.flatHeight}])
        let link = <View />
        let submit = <View />

        let { width, height } = Dimensions.get('window'); 
        
        let offset = height * 0.1; 

        if (this.state.hasFocus) { 
            link = (
                <TouchableOpacity onPress={this.onPost}>
                    <Image style={styles.submitImage} 
                    source={require("../../assets/ic_send.png")}/> 
                </TouchableOpacity>
            )
            submit = (
                <TouchableOpacity onPress={this.onPost}>
                    <Image style={styles.submitImage}
                    source={require('../../assets/ic_send.png')} />
                </TouchableOpacity>
            )
            chatContainerStyle = StyleSheet.flatten([styles.chatBarContainer, {
                display: 'flex', 
                flexDirection: 'row', 
                //height: '30%'
            }])
            textInputStyle = StyleSheet.flatten([styles.chatBar, {height: this.state.height, flex: 1}])
        }

        return (<KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={offset} 
                style={styles.KeyboardView}>
                
                <FlatList removeClippedSubviews
                          ref={ref => this.flatList = ref}
                          stlye={flatStyle}
                          data={messages} 
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderItem} />

                <View style={chatContainerStyle}>
                    {link} 
                    <TextInput
                               ref={(input) => {this.messageBox = input}}
                               blurOnSubmit={false}
                               style={textInputStyle}
                               multiline={true}
                               placeholder="Message"
                               editable={true}
                               value={message}
                               onChangeText={(message) => this.setState({message})}
                               onBlur={this.onBlur}
                               onFocus={this.onFocus}
                               >
                    </TextInput>
                    {submit}
                </View>

                </KeyboardAvoidingView> )
    }
}

const styles = StyleSheet.create({
    KeyboardView: { 
        flex: 1, 
        //height: '100%'
    }, 
    flatList: { 
        height: '90%'
    }, 
    chatBarContainer: { 
        backgroundColor: 'white', 
        borderColor: 'lightgray', 
        borderTopWidth: 1, 
        width: '100%', 
        height: '10%', 
        padding: 10, 
    }, 
    chatBar: { 
        backgroundColor: '#F2F2F2', 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#E5E5E5', 
        padding: 5
    }, 
    linkImage: { 
        width: 20, 
        height: 20, 
        marginRight: 10
    }, 
    submitImage: { 
        width: 20, 
        height: 20, 
        marginLeft: 10
    }
})

Message.propTypes = propTypes; 

export default Message; 