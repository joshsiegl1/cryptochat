import PropTypes from 'prop-types'; 
import React, {PureComponent} from 'react'; 

import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'; 

import moment from 'moment'; 

import Transform from './Transform'; 

const propTypes = { 
    item: PropTypes.shape, 
    group: PropTypes.string, 
    user: PropTypes.shape, 
    fullData: PropTypes.shape
}

class MessageItem extends PureComponent { 
    constructor(props) { 
        super(props)
    }

    render() { 

        const { item, user, fullData, group } = this.props; 

        let username = "anonymous"; 
        let profilepic = ''; 
        if (item.userID !== null) { 
            let user = item.userID[0]; 
            if (user !== undefined) { 
                if (user.username !== null && user.username !== undefined) { 
                    username = user.username; 
                }
                if (user.profilepic !== null && user.profilepic !== undefined) { 
                    profilepic = user.profilepic; 
                }
            }
        }

        if (profilepic === "") { 
            profilepic = `https://s2.coinmarketcap.com/static/img/coins/64x64/message.png`; 
        }

        let userColor = '#373F51'; 
        if (username === "anonymous")
            userColor = 'lightgray'

        let date = moment(item.date).fromNow(); 

        let data = fullData[group]; 

        return (<View style={styles.mainContent}>
            <TouchableOpacity style={styles.profilePicContent}>
                <Image style={styles.profilePic} 
                       source={{uri: profilepic, cache: 'reload'}} />
            </TouchableOpacity>
            <View style={styles.chatContent}>
                <Text style={styles.user}>{username}</Text>
                <View style={styles.body}>
                    <Transform body={item.body} 
                               navigate={this.props.navigate}
                               fullData={data}/>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.reply}>
                            <Image style={styles.replyImage} source={require('../../assets/reply.png')}/>
                            <Text style={styles.replyFont}>Reply</Text>
                    </TouchableOpacity>
                    <Text style={styles.date}>{date}</Text>
                    <TouchableOpacity style={styles.dots}>
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

export default MessageItem; 