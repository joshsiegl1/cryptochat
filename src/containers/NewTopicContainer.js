import React from 'react'; 
import { connect } from 'react-redux'; 

import NewTopic from '../components/NewTopic'; 

const NewTopicContainer = props => <NewTopic {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 

})(NewTopicContainer)