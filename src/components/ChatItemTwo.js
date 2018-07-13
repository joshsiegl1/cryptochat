import PropTypes, { object } from 'prop-types'; 
import React, {PureComponent, Component} from 'react'; 

import { View, Image, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native'; 

import { Asset } from 'expo'; 

import moment from 'moment'; 

import Transform from './Transform'; 

const propTypes = { 
    item: PropTypes.shape,
    crypto: PropTypes.string.isRequired, 
    upvote: PropTypes.func, 
    downvote: PropTypes.func, 
    navigate: PropTypes.func, 
    likedPosts: PropTypes.arrayOf(PropTypes.string), 
    dislikedPosts: PropTypes.arrayOf(PropTypes.string), 
    currentTime: PropTypes.date
}

class ChatItemTwo extends PureComponent { 
    constructor(props) { 
        super(props)
    }

    render() { 
        const { item, likedPosts, dislikedPosts } = this.props; 

        let username = "anonymous"
        let profilepic = ''; 
        if (item.userID !== null) { 
            let user = item.userID[0]; 
            username = user.username
            profilepic = user.profilepic; 
        }

        if (profilepic === "") { 
            profilepic = `http://www.joshsiegl.com/crypto/${this.props.crypto}.png`; 
        }

        let userColor = '#373F51'; 
        if (username === "anonymous")
            userColor = 'lightgray'

        let date = moment(item.date).fromNow(); 

        return (<View style={styles.mainContent}>
                    <View style={styles.profilePicContent}>
                        <Image style={styles.profilePic} 
                        source={{uri: profilepic, cache: 'reload'}}/>
                    </View>
                    <View style={styles.chatContent}>
                        <Text style={styles.username}>{username}</Text>  
                        <View style={styles.body}>
                            <Transform body={item.body} navigate={this.props.navigate} />
                        </View>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                </View>)
    }
}

const styles = StyleSheet.create({
    mainContent: { 
        flex: 1, 
        flexDirection: 'row', 
        paddingTop: 10, 
        paddingRight: 10, 
        width: '100%'
    }, 
    profilePicContent: { 
        padding: 10
    }, 
    profilePic: { 
        width: 40, 
        height: 40, 
        borderRadius: 20
    }, 
    chatContent: { 
        backgroundColor: 'white', 
        borderRadius: 20, 
        padding: 20, 
        maxWidth: '85%'
    }, 
    username: { 
        color: 'black'
    }, 
    date: { 
        color: 'lightgray'
    }, 
    body: { 
        maxWidth: '100%', 
        paddingTop: 10, 
        paddingBottom: 10
    }
})

ChatItemTwo.propTypes = propTypes; 

export default ChatItemTwo; 