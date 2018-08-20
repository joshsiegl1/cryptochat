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
    currentTime: PropTypes.date, 
    onReplyPressed: PropTypes.func, 
    fullData: PropTypes.shape, 
    cryptoID: PropTypes.num
}

class ChatItem extends PureComponent { 
    constructor(props) { 
        super(props)
    }

    _onReplyPressed = () => { 
        const { onReplyPressed, item } = this.props; 



        onReplyPressed(item.Id); 
    }

    _onFlagPressed = () => { 

    }

    render() { 
        const { item, likedPosts, dislikedPosts, fullData, cryptoID } = this.props; 

        let username = "anonymous"
        let profilepic = ''; 
        if (item.userID !== null) { 
            let user = item.userID[0]; 
            if (user !== undefined) { 
                if (user.username !== null && user.username !== undefined)
                {
                    username = user.username
                }

                if (user.profilepic !== null && user.profilepic !== undefined) 
                { 
                    profilepic = user.profilepic; 
                }
            }
        }

        if (profilepic === "") { 
            profilepic = `https://s2.coinmarketcap.com/static/img/coins/64x64/${cryptoID}.png`; 
        }

        let userColor = '#373F51'; 
        if (username === "anonymous")
            userColor = 'lightgray'

        let date = moment(item.date).fromNow(); 

        let data = fullData[this.props.crypto]; 

        return (<View style={styles.mainContent}>
                    <View style={styles.profilePicContent}>
                        <Image style={styles.profilePic} 
                        source={{uri: profilepic, cache: 'reload'}}/>
                    </View>
                    <View style={styles.chatContent}>
                        <Text style={styles.user}>{username}</Text>  
                        <View style={styles.body}>
                            <Transform body={item.body} 
                                       navigate={this.props.navigate}
                                       fullData={data} />
                        </View>
                        <View style={styles.bottom}>
                            <TouchableOpacity style={styles.reply} onPress={this._onReplyPressed}>
                                <Image style={styles.replyImage} source={require('../../assets/reply.png')}/>
                                <Text style={styles.replyFont}>Reply</Text>
                            </TouchableOpacity>
                            <Text style={styles.date}>{date}</Text>
                            <TouchableOpacity style={styles.flag} onPress={this._onFlagPressed}>
                                <Image style={styles.flagImage} source={require("../../assets/flag.png")}/>
                                <Text style={styles.flagFont}>Flag</Text>
                            </TouchableOpacity>
                        </View>
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
    user: { 
        color: 'black'
    }, 
    date: { 
        color: 'lightgray'
    }, 
    body: { 
        maxWidth: '100%', 
        paddingTop: 10, 
        paddingBottom: 10
    }, 
    bottom: { 
        flex: 1, 
        flexDirection: 'row', 
        paddingTop: 10, 
        paddingBottom: 10
    }, 
    reply: { 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
    }, 
    flag: { 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
    }, 
    replyImage: { 
        width: 15, 
        height: 15, 
        paddingRight: 5
    }, 
    flagImage: { 
        width: 15, 
        height: 15, 
        paddingLeft: 5
    }, 
    replyFont: { 
        lineHeight: 12, 
        fontSize: 12, 
        color: '#373F51',
        paddingLeft: 5, 
        paddingRight: 15
    }, 
    flagFont: { 
        lineHeight: 12, 
        fontSize: 12, 
        color: '#373F51',
        paddingLeft: 5, 
        paddingRight: 15
    }
})

ChatItem.propTypes = propTypes; 

export default ChatItem; 