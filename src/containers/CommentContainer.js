import React from 'react'; 
import { connect } from 'react-redux'; 

import Comment from '../components/Comment.js'; 

import { getComment, getUser } from '../selectors/CommonSelectors.js';
import { GetPost, PostReply } from '../actions/ChatActions.js';  

const CommentsContainer = props => <Comment {...props} />

const mapStateToProps = (state) => { 
    return { 
        comment: getComment(state), 
        user: getUser(state)
    }
}

export default connect(mapStateToProps, { 
    GetPost, 
    PostReply
})(CommentsContainer); 