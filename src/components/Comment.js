import PropTypes from 'prop-types'; 
import React, {Component} from 'react';

import {View, Text, TextInput, Keyboard, TouchableOpacity, Image, KeyboardAvoidingView, FlatList, Platform} from 'react-native'; 

import { AdMobBanner } from 'expo'; 

import ReplyThread from './ReplyThread'; 

import ChatBar from './ChatBar'; 

import styles from '../styles/commentSheet'; 
import { GetReplies } from '../actions/ChatActions';

const propTypes = { 
    comment: PropTypes.shape({}), 
    replies: PropTypes.shape({}), 
    GetPost: PropTypes.func, 
    GetReplies: PropTypes.func, 
    PostReply: PropTypes.func, 
    user: PropTypes.shape()
}

class Comment extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
        }
    }

    componentDidMount() { 
        
        const { navigation, GetReplies} = this.props; 
        
        const { postID } = navigation.state.params; 
        
        GetReplies(postID); 
    }

    componentDidUpdate() { 

        const { navigation, replies } = this.props; 

        const { postID } = navigation.state.params; 

        if (Object.keys(replies).length > 0) { 
            const thisReply = replies[postID]; 
            if (thisReply === undefined) { 
                GetReplies(postID); 
            }
        }
        else { 
            GetReplies(postID); 
        }
    }

    onNavigateBack = () => { 

        const { navigation } = this.props; 

        const { postID } = navigation.state.params; 
        
        GetReplies(postID);  
    }

    onScrollback = () => { 
        try { 
             this.flatList.scrollToEnd({animated: true}); 
        }
        catch(error) {  }
    }

    _renderItem =({item}) => (
        <ReplyThread item={item}
                   crypto={this.props.navigation.state.params.crpyto}
                   upvote={this.props.Upvote}
                   downvote={this.props.Downvote}
                   navigate={this.props.navigation.navigate}
                   likedPosts={this.props.likedPosts}
                   dislikedPosts={this.props.dislikedPosts}
                   currentTime={this.props.currentTime}
                   onNavigateBack={this.onNavigateBack}/>
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

        const { replies, comment, navigation } = this.props; 
        const { postID, crypto } = navigation.state.params; 

        let ad = this.displayAd(); 

        let replySet = []; 
        let subReplies = []; 
        let postContent = ""; 
        let user = ""; 
        if (Object.keys(replies).length > 0) { 
            replySet = replies[postID]; 
            if (replySet !== undefined) { 
                postContent = replySet.results.body; 
                user = replySet.results.userID; 
                subReplies = replySet.results.replies; 
            }
        }

        let userColor = '#373F51'; 
        if (user === "anonymous")
            userColor = 'lightgray'


        return(<KeyboardAvoidingView
                behavior="position"
                keyboardVerticleOffset={50}
                style={{flex: 1}}>

            <View style={styles.contentContainer}>
                <Text style={{fontSize: 18, color: '#373F51', fontFamily: 'arial'}}>{postContent}</Text>
            </View>

            <FlatList
                removeClippedSubviews
                ref={ref => this.flatList = ref}
                onContentSizeChange={this.onScrollback}
                onLayout={this.onScrollback}
                style={{height: '60%'}}
                data={subReplies} 
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
             />

             <View
                    style={{borderColor: 'gray', 
                            backgroundColor: 'black', 
                            borderWidth: 1, 
                            paddingLeft: 25, 
                            paddingRight: 25, 
                            height: '10%'}}>

                    {ad}
                </View> 

                <ChatBar id={crypto}
                         postID={postID}
                         type="comment"
                         topic={postContent}
                         navigate={this.props.navigation.navigate}
                         greeting="Add a comment" />


            </KeyboardAvoidingView>)
    }
}

Comment.propTypes = propTypes; 

export default Comment; 