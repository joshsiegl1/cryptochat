import PropTypes, { object } from 'prop-types'; 
import React, {PureComponent, Component} from 'react'; 

import { View, Image, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native'; 

import { Asset } from 'expo'; 

import moment from 'moment'; 

import Transform from './Transform'; 

const propTypes = { 
    item: PropTypes.shape,
    user: PropTypes.shape, 
    crypto: PropTypes.string.isRequired, 
    upvote: PropTypes.func, 
    downvote: PropTypes.func, 
    navigate: PropTypes.func, 
    likedPosts: PropTypes.arrayOf(PropTypes.string), 
    dislikedPosts: PropTypes.arrayOf(PropTypes.string), 
    currentTime: PropTypes.date, 
    onReplyPressed: PropTypes.func, 
    fullData: PropTypes.shape, 
    cryptoID: PropTypes.num, 
    onMoreDotsPressed: PropTypes.func, 
    onProfilePressed: PropTypes.func
}

class ChatItem extends PureComponent { 
    constructor(props) { 
        super(props)
    }

    _onReplyPressed = () => { 
        const { onReplyPressed, item } = this.props; 



        onReplyPressed(item.Id); 
    }

    _onMoreDotsPressed = () => { 
        const {onMoreDotsPressed, item} = this.props; 

        onMoreDotsPressed(item); 
    }

    _onProfilePressed = () => { 
        const {onProfilePressed, item} = this.props; 

        if (item.userID !== null) 
            onProfilePressed(item.userID); 
    }

    render() { 
        const { item, user, likedPosts, dislikedPosts, fullData, cryptoID } = this.props; 

        let blocked = false; 
        for (let i = 0; i < user.blockedPosts.length; i++) { 
            if (item.postID === user.blockedPosts[i].Id) { 
                blocked = true; 
                break; 
            }
        }

        if (!blocked && item.userID !== null) { 
            for (let i = 0; i < user.blockedBy.length; i++) { 
                if (item.userID[0].Id === user.blockedBy[i].Id) { 
                    blocked = true; 
                    break; 
                }
            }
        }

        if (!blocked && item.userID !== null) { 
            for (let i = 0; i < user.blockedUsers.length; i++) { 
                if (item.userID[0].Id === user.blockedUsers[i].Id) { 
                    blocked = true; 
                    break; 
                }
            }
        }

        if (blocked) { 
            return (<View></View>)
        }

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
                    <TouchableOpacity style={styles.profilePicContent} onPress={this._onProfilePressed}>
                        <Image style={styles.profilePic} 
                        source={{uri: profilepic, cache: 'reload'}}/>
                    </TouchableOpacity>
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
                            <TouchableOpacity style={styles.dots} onPress={this._onMoreDotsPressed}>
                                <Image style={styles.dotsImage} source={require("../../assets/dots.png")}/>
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
    dots: { 
        paddingLeft: 15, 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
    }, 
    replyImage: { 
        width: 15, 
        height: 15, 
        paddingRight: 5
    }, 
    dotsImage: { 
        width: 15, 
        height: 15, 
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