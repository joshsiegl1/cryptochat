import React from 'react'; 
import { connect } from 'react-redux'; 

import ChatWindow from '../components/ChatWindow'; 

const ChatWindowContainer = props => <ChatWindow {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 

})(ChatWindowContainer)

