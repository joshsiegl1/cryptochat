import PropTypes from 'prop-types'; 
import React, {Component} from 'react'

import { View, FlatList } from 'react-native'; 

import MessageListButton from './MessageListButton'; 

const propTypes = { 
    GetUserGroups: PropTypes.func, 
    groups: PropTypes.shape({})
}

class MessageList extends Component { 
    constructor(props) { 
        super(props)
    }

    UNSAFE_componentWillMount() { 
        const { GetUserGroups } = this.props; 

        GetUserGroups(); 
    }

    _renderItem = ({item, index}) => (
        <MessageListButton 
        navigate={this.props.navigation.navigate}
        id={item.id}
        num={index}
        />
    )

    _keyExtractor = (item, index) => item.id

    render() { 

        const { groups } = this.props; 

        return (<View>
            <FlatList 
            data={groups}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            />
        </View>)
    }
}

MessageList.propTypes = propTypes; 

export default MessageList; 