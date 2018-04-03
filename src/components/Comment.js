import PropTypes from 'prop-types'; 
import React, {Component} from 'react';

import {View, Text, TextInput, Keyboard, TouchableOpacity, Image, KeyboardAvoidingView, FlatList, Platform} from 'react-native'; 

import { AdMobBanner } from 'expo'; 

import ReplyItem from './ReplyItem'; 

import ChatBar from './ChatBar'; 

import styles from '../styles/commentSheet'; 

const propTypes = { 
    comment: PropTypes.shape({}), 
    GetPost: PropTypes.func, 
    PostReply: PropTypes.func, 
    user: PropTypes.shape()
}

const friendlyGreeting = "Leave a comment"; 
const totalChatLength = 200; 

class Comment extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            myText: friendlyGreeting, 
            chatColor: 'darkgray'
        }
    }

    componentDidMount() { 
        
        const { navigation, GetPost} = this.props; 
        
        const { postID } = navigation.state.params; 
        
        GetPost(postID); 
    }

    componentDidUpdate() { 

        const { navigation, comment } = this.props; 

        const { postID } = navigation.state.params; 

        if (Object.keys(comment).length > 0) { 
            const thisComment = comment[postID]; 
            if (thisComment === undefined) { 
                GetPost(postID); 
            }
            else { 
                //console.log(thisComment)
            }
        }
        else { 
            GetPost(postID); 
        }
    }

    onPressPost = () => { 
        const { navigation, PostReply, user} = this.props; 

        const { crypto, postID } = navigation.state.params; 

        let text = this.state.myText; 
        if (text === '' || text === friendlyGreeting) return; 

        Keyboard.dismiss(); 

        let username = "anonymous"; 
        if (!(Object.keys(user).length === 0 && user.constructor === Object)) { 
            if (user.userID !== "") { 
                username = user.userID
            }
        }

        PostReply(crypto, username, text, postID)

        this.setState({myText: friendlyGreeting, chatColor: 'darkgrey'}); 
    }

    onInputFocused = () => { 
        if (this.state.myText === friendlyGreeting) { 
            this.setState({myText: ''}); 
        }

        this.setState({chatColor: 'black'}); 
    }

    onChangeText = (text) => { 
        this.setState({myText: text}); 
    }

    onScrollback = () => { 
        try { 
             this.flatList.scrollToEnd({animated: true}); 
        }
        catch(error) {  }
    }

    _renderItem =({item}) => (
        <ReplyItem item={item}
                   navigate={this.props.navigation.navigate}/>
    )

    _keyExtractor = (item, index) => item.postID

    displayAd = () => { 
        if (Platform.OS === 'ios') { 
            return (<AdMobBanner 
            bannerSize="fullbanner"
            adUnitID="ca-app-pub-2896471597472603/8703233139"
            didFailToReceiveAdWithError={this.bannerError}
            />) 
        }
        else { 
            return (<AdMobBanner 
            bannerSize="fullbanner"
            adUnitID="ca-app-pub-2896471597472603/2666295016"
            didFailToReceiveAdWithError={this.bannerError}
            />) 
        }
    }

    render() { 

        const { comment, navigation } = this.props; 
        const { postID } = navigation.state.params; 

        let ad = this.displayAd(); 

        let comments = []; 
        let replies = []; 
        let postContent = ""; 

        if (Object.keys(comment).length > 0) { 
            comments = comment[postID]; 
            if (comments !== undefined) 
            {
                postContent = comments.content[0].body; 
                replies = comments.replies; 
            }

        }


        return(<KeyboardAvoidingView
                behavior="position"
                keyboardVerticleOffset={50}
                style={{flex: 1}}>

            <View style={styles.contentContainer}>
                <Text>{postContent}</Text>
            </View>

            <FlatList
                removeClippedSubviews
                ref={ref => this.flatList = ref}
                onContentSizeChange={this.onScrollback}
                onLayout={this.onScrollback}
                style={{height: '70%'}}
                data={replies} 
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
             />

             <View
                    style={{borderColor: 'gray', 
                            backgroundColor: 'black', 
                            borderWidth: 1, 
                            paddingLeft: 25, 
                            paddingRight: 25}}>

                    {ad}
                </View> 

                <ChatBar id="none"
                         postID={postID}
                         type="comment"
                         topic={postContent}
                         navigate={this.props.navigation.navigate}
                         greeting="Add a comment" />

             {/* <View style={{
                 flexDirection: 'row', 
                 width: '100%', 
                 height: 60}}> 
            <TextInput 
            style={{
                width: '60%', 
                height: '100%', 
                backgroundColor: 'white', 
                color: this.state.chatColor, 
                padding: 5
            }}
            multiline={false}
            onChangeText={this.onChangeText}
            value={this.state.myText} 
            onFocus={this.onInputFocused}/>

                <View style={styles.chatButton}>
                    <Text style={{
                        paddingTop: 20, 
                    }}>{this.state.myText.length} / {totalChatLength}</Text> 
                 </View>


                <TouchableOpacity 
                    style={styles.chatButton}
                    onPress={this.onPressPost}>
                    <Image source={require('../../assets/ic_send.png')}
                           style={{marginLeft: 25, marginTop: 20, width: 24, height: 24}}></Image>

                </TouchableOpacity>
            </View> */}

            </KeyboardAvoidingView>)
    }
}

Comment.propTypes = propTypes; 

export default Comment; 