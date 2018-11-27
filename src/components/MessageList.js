import PropTypes from 'prop-types'; 
import React, {Component} from 'react'

import { View, FlatList, RefreshControl } from 'react-native'; 

import MessageListButton from './MessageListButton'; 
import { GetUser } from '../utils/Storage';

const propTypes = { 
    GetUserGroups: PropTypes.func, 
    groups: PropTypes.shape({})
}

class MessageList extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            refreshing: false
        }
    }

    UNSAFE_componentWillMount() { 
        const { GetUserGroups } = this.props; 

        GetUserGroups(); 
    }

    _onRefresh = () => { 
        const { GetUserGroups } = this.props; 
        this.setState({refreshing: true});
        GetUserGroups().then(() => { 
            this.setState({refreshing: false}); 
        })

    }

    _renderItem = ({item, index}) => (
        <MessageListButton 
        navigate={this.props.navigation.navigate}
        id={item.id}
        participants={item.participants}
        num={index + 1}
        />
    )

    _keyExtractor = (item, index) => item.id

    render() { 

        const { groups } = this.props; 

        return (<View>
            <FlatList
            style={{width: '100%', height: '100%'}} 
            refreshControl={
                <RefreshControl 
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
            }
            data={groups}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            />
        </View>)
    }
}

MessageList.propTypes = propTypes; 

export default MessageList; 