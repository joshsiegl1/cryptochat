import React from 'react'; 
import { connect } from 'react-redux'; 

import Comment from '../components/Comment.js'; 

const CommentsContainer = props => <Comment {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 

})(CommentsContainer); 