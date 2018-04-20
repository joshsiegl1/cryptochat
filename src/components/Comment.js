import PropTypes from 'prop-types'; 
import React, {Component} from 'react';

import {View, Text, TextInput, Keyboard, TouchableOpacity, Image, KeyboardAvoidingView, FlatList, Platform} from 'react-native'; 

import { AdMobBanner } from 'expo'; 

import ReplyItem from './ReplyItem'; 

import ChatBar from './ChatBar'; 

import styles from '../styles/commentSheet'; 
import { GetReplies } from '../actions/ChatActions';

const propTypes = { 
    comment: PropTypes.shape({}), 
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
        
        const { navigation, GetPost} = this.props; 
        
        const { postID } = navigation.state.params; 
        
        GetReplies(postID); 
    }

    componentDidUpdate() { 

        const { navigation, comment } = this.props; 

        const { postID } = navigation.state.params; 

        if (Object.keys(comment).length > 0) { 
            const thisComment = comment[postID]; 
            if (thisComment === undefined) { 
                GetReplies(postID); 
            }
        }
        else { 
            GetReplies(postID); 
        }
    }

    onScrollback = () => { 
        try { 
             this.flatList.scrollToEnd({animated: true}); 
        }
        catch(error) {  }
    }

    _renderItem =({item}) => (
        <ReplyItem item={item}
                   crypto={this.props.navigation.state.params.crpyto}
                   upvote={this.props.Upvote}
                   downvote={this.props.Downvote}
                   navigate={this.props.navigation.navigate}
                   likedPosts={this.props.likedPosts}
                   dislikedPosts={this.props.dislikedPosts}
                   currentTime={this.props.currentTime}/>
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

        // let comments = []; 
        // let replies = []; 
        // let postContent = ""; 

        // if (Object.keys(comment).length > 0) { 
        //     comments = comment[postID]; 
        //     if (comments !== undefined) 
        //     {
        //         postContent = comments.content[0].body; 
        //         replies = comments.replies; 
        //     }

        // }

        let replySet = []; 
        let subReplies = []; 
        let postContent = ""; 
        if (Object.keys(replies).length > 0) { 
            replySet = replies[postID]; 
            if (replySet !== undefined) { 
                postContent = replySet.body; 
                subReplies = replySet.replies; 
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