import React from 'react'; 
import { connect } from 'react-redux'; 

import Comment from '../components/Comment.js'; 

import { GetPost, PostReply, Upvote, Downvote } from '../actions/ChatActions.js';

import { 
    getUser, 
    getComment,
    getLikedPosts, 
    getDislikedPosts, 
    getCurrentTime
} from '../selectors/CommonSelectors'; 

const CommentsContainer = props => <Comment {...props} />

const mapStateToProps = (state) => { 
    return { 
        comment: getComment(state), 
        user: getUser(state), 
        likedPosts: getLikedPosts(state), 
        dislikedPosts: getDislikedPosts(state), 
        currentTime: getCurrentTime(state)
    }
}

export default connect(mapStateToProps, { 
    GetPost, 
    PostReply, 
    Upvote, 
    Downvote
})(CommentsContainer); 