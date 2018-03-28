import PropTypes from 'prop-types'; 
import React, {PureComponent} from 'react'; 

import {View, Image, Text, TouchableOpacity} from 'react-native'; 

import style from '../styles/commentSheet'; 

const propTypes = { 
    item: PropTypes.shape, 
    navigate: PropTypes.func
}

class ReplyItem extends PureComponent { 
    constructor(props) { 
        super(props)

        this.state = { 

        }
    }

    render() { 
        const { item } = this.props; 

        return (<View style={style.replyBox}>
                <View style={style.replyTitleBox}>
                    <Text>{item.body}</Text>
                </View>

            </View>)
    }
}

ReplyItem.propTypes = propTypes; 

export default ReplyItem; 