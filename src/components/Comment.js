import PropTypes from 'prop-types'; 
import React, {Component} from 'react';

import {View, Text, TextInput, Keyboard, TouchableOpacity, Image, KeyboardAvoidingView, FlatList} from 'react-native'; 

import ReplyThread from './ReplyThread'; 

import ChatBar from './ChatBar'; 

import Transform from './Transform'; 

import Ad from './Ad'; 

import styles from '../styles/stylesheet'; 

const propTypes = { 
    comment: PropTypes.shape({}), 
    replies: PropTypes.shape({}), 
    GetPost: PropTypes.func, 
    GetReplies: PropTypes.func, 
    PostReply: PropTypes.func, 
    phone: PropTypes.string
}

class Comment extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            pressedState: 0, 
            karma: props.navigation.state.params.karma
        }
    }

    componentDidMount() { 
        
        const { navigation, GetReplies} = this.props; 
            
        const { postID } = navigation.state.params; 
            
        GetReplies(postID); 
    }

    componentDidUpdate() { 
        const { navigation, GetReplies} = this.props; 

        const { postID } = navigation.state.params; 

        GetReplies(postID); 
    }

    onNavigateBack = () => { 

        setTimeout(function() { 

            const { navigation, GetReplies } = this.props; 
            
            const { postID } = navigation.state.params; 
                    
            GetReplies(postID);  

        }.bind(this), 1500); 

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

    render() { 

        const { replies, comment, navigation } = this.props; 
        const { postID, crypto } = navigation.state.params; 

        let replySet = []; 
        let subReplies = []; 
        let postContent = ""; 
        let user = ""; 
        if (Object.keys(replies).length > 0) { 
            replySet = replies[postID]; 
            if (replySet !== undefined) { 
                postContent = replySet.results.body; 
                user = replySet.results.userID; 
                subReplies[0] = replySet.results; 
            }
        }

        return(
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticleOffset={50}
                style={{flex: 1}}>

            <FlatList
                removeClippedSubviews
                ref={ref => this.flatList = ref}
                style={{height: '80%'}}
                data={subReplies} 
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
             />

             <Ad />

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