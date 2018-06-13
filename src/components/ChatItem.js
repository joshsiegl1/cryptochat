import PropTypes, { object } from 'prop-types'; 
import React, {PureComponent, Component } from 'react'; 

import {View, Image, Text, TouchableOpacity, Modal} from 'react-native'; 

import { Asset } from 'expo'; 

import styles from '../styles/stylesheet'; 

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

class ChatItem extends PureComponent { 
    constructor(props) { 
        super(props)

        //pressedState 
        //0 = nothing pressed
        //1 = upvote pressed
        //-1 = downvote pressed
        this.state = { 
            pressedState: 0, 
            shareVisible: false, 
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

    onCommentsPressed = () => { 
        const { postID } = this.props.item; 

        const { navigate, crypto } = this.props; 

        navigate('Comment', {postID: postID, crypto: crypto, karma: this.state.karma}); 
    }

    onSharePressed = () => { 
        this.setState({shareVisible: true}); 
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
        const { item, likedPosts, dislikedPosts } = this.props

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
                    <Text style={{paddingLeft: 5, width: '90%', color: 'lightgray', fontFamily: 'arial'}}>anonymous</Text>  
                </View>
                <View style={styles.bodyBox}>
                    <View style={{fontSize: 18, color: '#373F51'}}><Transform body={item.body} navigate={this.props.navigate} /></View>
                </View>
                <View style={styles.voteBox}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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
                    <View style={styles.commentSection}>
                            <TouchableOpacity onPress={this.onCommentsPressed} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/comment.png')} style={{width: 10, height: 10}}/>
                                <Text style={{lineHeight: 12, fontSize:12, color: '#373F51', paddingLeft: 5, fontFamily: 'arial'}} >Comments</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={styles.timeSection}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: 15}}>
                            <Image source={require('../../assets/time.png')} style={{width: 10, height: 10}} />
                            <Text style={{lineHeight: 12, fontSize: 12, color: '#373F51', paddingLeft: 5, fontFamily: 'arial'}}>{friendlyDate}</Text>
                        </View>
                    </View>
                    </View>

                </View>
                </View>
                )
    }
}

ChatItem.propTypes = propTypes; 

export default ChatItem; 