import React from 'react'; 
import { connect } from 'react-redux'; 

import NewTopic from '../components/NewTopic'; 

import { AddCategory } from '../actions/ContentActions'; 
import { fetchOthers } from '../actions/CoinMarketCapActions'; 

const NewTopicContainer = props => <NewTopic {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 
    AddCategory, 
    fetchOthers
})(NewTopicContainer)