import React from 'react'; 
import { connect } from 'react-redux'; 

import Comment from '../components/Comment.js'; 

import { getComment } from '../selectors/CommonSelectors.js';
import { GetPost } from '../actions/ChatActions.js';  

const CommentsContainer = props => <Comment {...props} />

const mapStateToProps = (state) => { 
    return { 
        comment: getComment(state)
    }
}

export default connect(mapStateToProps, { 
    GetPost
})(CommentsContainer); 