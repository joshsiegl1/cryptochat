import PropTypes from 'prop-types'; 
import React, {Component, PureComponent} from 'react'; 
import {TouchableOpacity, Text, Image} from 'react-native'; 

import style from '../styles/stylesheet'; 

const propTypes = { 
    navigate: PropTypes.func, 
    id: PropTypes.string, 
    participants: PropTypes.arrayOf(PropTypes.shape({}))
}

class MessageListButton extends PureComponent { 
    constructor(props) { 
        super(props)
    }

    onPress = () => { 

        const { id, navigate } = this.props; 

        navigate("Message", {id: id, group: id}); 
    }

    GetMessageTitle = (participants) => { 
        let s = ""; 
        let gt = false; 
        const maxDisplay = 3; 
        for (let i = 0; i < participants.length; i++) { 
            if (i > maxDisplay) { 
                gt = true; 
                break; 
            }

            if (i !== 0) 
                s += ', '; 
            
            let participant = participants[i].id; 
            if (participant !== null) { 
                if (participant.username !== null && participant.username !== '') { 
                    s += participant.username; 
                }
            }

        }

        if (gt) { 
            let numRemaining = participants.length - maxDisplay; 
            s += ' and ' + numRemaining + ' more'; 
        }

        return (<Text style={style.cryptoButtonText}>{s}</Text>)
    }

    render() { 
        
        let { id, num, participants } = this.props; 

        let p = participants; 

        let text = this.GetMessageTitle(participants); 

        return (<TouchableOpacity 
        style={style.container} 
        onPress={this.onPress}>
        <Text style={{paddingRight: 10, color: 'lightgray', lineHeight: 24}}>{num}</Text>
        {text}
        </TouchableOpacity>)
    }
}

MessageListButton.propTypes = propTypes; 

export default MessageListButton; 