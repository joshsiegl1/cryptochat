import React from 'react'; 
import { connect } from 'react-redux'; 

import Comment from '../components/Comment.js'; 

import { GetPost, PostReply, Upvote, Downvote, GetReplies } from '../actions/ChatActions.js';

import { 
    getUser, 
    getComment,
    getReplies, 
    getLikedPosts, 
    getDislikedPosts, 
    getCurrentTime
} from '../selectors/CommonSelectors'; 

const CommentsContainer = props => <Comment {...props} />

const mapStateToProps = (state) => { 
    return { 
        replies: getReplies(state), 
        comment: getComment(state), 
        user: getUser(state), 
        likedPosts: getLikedPosts(state), 
        dislikedPosts: getDislikedPosts(state), 
        currentTime: getCurrentTime(state)
    }
}

export default connect(mapStateToProps, { 
    GetPost, 
    GetReplies, 
    PostReply, 
    Upvote, 
    Downvote
})(CommentsContainer); 