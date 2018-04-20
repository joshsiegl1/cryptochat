import PropTypes from 'prop-types'; 
import React, {PureComponent} from 'react'; 

import {View, Image, Text, TouchableOpacity, Modal} from 'react-native'; 

import { Asset } from 'expo'; 

import styles from '../styles/stylesheet'; 

const propTypes = { 
    item: PropTypes.shape, 
    index: PropTypes.number, 
    navigate: PropTypes.func, 
    upvote: PropTypes.func, 
    downvote: PropTypes.func, 
    crypto: PropTypes.string.isRequired, 
    likedPosts: PropTypes.arrayOf(PropTypes.string), 
    dislikedPosts: PropTypes.arrayOf(PropTypes.string), 
    currentTime: PropTypes.date
}

class ReplyItem extends PureComponent { 
    constructor(props) { 
        super(props)

        this.state = { 
            pressedState: 0, 
            karma: props.item.karma
        }
    }

    onUpvotePressed = () => { 
        if (this.state.pressedState !== 1) { 
            const { postID, userID } = this.props.item; 
            const { dislikedPosts } = this.props; 

            let Newkarma = 1; 
            if (dislikedPosts !== undefined) { 
                if (dislikedPosts.indexOf(postID) >= 0) { 
                    Newkarma++; 
                }
            }
        
            this.props.upvote(postID, userID, Newkarma)

            this.setState({pressedState: 1})
            this.setState({ karma: this.state.karma + Newkarma})
        }
    }

    onDownvotePressed = () => { 
        if (this.state.pressedState !== -1) { 
            const { postID, userID } = this.props.item; 
            const { likedPosts } = this.props; 

            let Newkarma = -1; 
            if (likedPosts !== undefined) { 
                if (likedPosts.indexOf(postID) >= 0) { 
                    Newkarma--; 
                }
            }

            this.props.downvote(postID, userID, Newkarma)

            this.setState({pressedState: -1})
            this.setState({karma: this.state.karma + Newkarma})
        }
    }

    onReplyPressed = () => { 
        const { postID, id } = this.props.item; 

        const { navigate } = this.props; 

        navigate('ChatWindow', 
        {
            postID: postID, 
            crypto: id, 
            type: "comment", 
            topic: "Post Reply"
        }); 
    }

    updatePressedStatefromStore(likedPosts, dislikedPosts, postID) { 
        if (dislikedPosts !== undefined) { 
            if (dislikedPosts.indexOf(postID) >= 0) { 
                this.setState({pressedState: -1})
            }
        }

        if (likedPosts !== undefined) { 
            if (likedPosts.indexOf(postID) >= 0) { 
                this.setState({pressedState: 1})
            }
        }
    }

    getDownArrowGraphic(dislikedPosts, postID) { 

        if (this.state.pressedState === -1) return <Image source={require('../../assets/down_arrow_pressed.png')} style={{width: 10, height: 10}}></Image>
        else return <Image source={require('../../assets/down_arrow.png')} style={{width: 10, height: 10}}></Image>
    }

    getUpArrowGraphic(likedPosts, postID) { 
        
        if (this.state.pressedState === 1) return <Image source={require('../../assets/up_arrow_pressed.png')} style={{width: 10, height: 10}}></Image>
        else return <Image source={require('../../assets/up_arrow.png')} style={{width: 10, height: 10}}></Image>
    }

    render() { 
        const { item, likedPosts, dislikedPosts } = this.props; 

        this.updatePressedStatefromStore(likedPosts, dislikedPosts, item.postID)
        
        let upArrow = this.getUpArrowGraphic(likedPosts, item.postID); 
        let downArrow = this.getDownArrowGraphic(dislikedPosts, item.postID); 

        let karma = "vote"; 
        if (this.state.karma !== 0)
            karma = this.state.karma; 

        let date = new Date(this.props.item.date); 
        let currentDate = new Date(this.props.currentTime); 
        let friendlyDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        
        let userColor = '#373F51'; 
        if (item.userID === "anonymous")
            userColor = 'lightgray'

            return (
                <View style={styles.messageBox}>
                <View style={styles.titleBox}>
                    <Image style={{width: 16, height: 16}}
                    source={{uri: `http://www.joshsiegl.com/crypto/${this.props.crypto}.png`}} />
                    <Text style={{paddingLeft: 5, width: '90%', color: userColor, fontFamily: 'arial'}}>{item.userID}</Text>  
                </View>
                <View style={styles.bodyBox}>
                    <Text style={{paddingLeft: 21, fontSize: 18, color: '#373F51', fontFamily: 'arial'}}>{item.body}</Text>
                </View>
                <View style={styles.voteBox}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <View style={styles.voteSection}>
                    <TouchableOpacity onPress={this.onUpvotePressed}>
                        {upArrow}
                    </TouchableOpacity>
                    <View style={{width: 35, justifyContent: "center"}}>
                        <Text style={{lineHeight: 12, fontSize: 12, color: '#373F51', textAlign: "center", fontFamily: 'arial'}}>{karma}</Text>
                    </View>
                    <TouchableOpacity onPress={this.onDownvotePressed}>
                        {downArrow}
                    </TouchableOpacity>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', paddingRight: 15, paddingLeft: 30}}>
                            <TouchableOpacity onPress={this.onReplyPressed} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/reply.png')} style={{width: 10, height: 10}} />
                                <Text style={{lineHeight: 12, fontSize:12, color: '#373F51', paddingLeft: 5, fontFamily: 'arial'}} >Reply</Text>
                            </TouchableOpacity>
                    </View>
                    </View>

                </View>
                </View>
                )
    }
}

ReplyItem.propTypes = propTypes; 

export default ReplyItem; 