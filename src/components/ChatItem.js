import PropTypes from 'prop-types'; 
import React, {PureComponent } from 'react'; 

import {View, Image, Text, TouchableOpacity} from 'react-native'; 

import { Asset } from 'expo'; 

import styles from '../styles/stylesheet'; 

const propTypes = { 
    item: PropTypes.shape,
    crypto: PropTypes.string.isRequired, 
    upvote: PropTypes.func, 
    downvote: PropTypes.func, 
    navigate: PropTypes.func, 
    likedPosts: PropTypes.arrayOf(PropTypes.string), 
    dislikedPosts: PropTypes.arrayOf(PropTypes.string)
}

class ChatItem extends PureComponent { 
    constructor(props) { 
        super(props)

        //pressedState 
        //0 = nothing pressed
        //1 = upvote pressed
        //-1 = downvote pressed
        this.state = { 
            pressedState: 0
        }
    }

    onUpvotePressed = () => { 
        if (this.state.pressedState !== 1) { 
            const { postID, userID } = this.props.item; 
            const { dislikedPosts } = this.props; 

            let karma = 1; 
            if (dislikedPosts !== undefined) { 
                if (dislikedPosts.indexOf(postID) >= 0) { 
                    karma++; 
                }
            }
        
            this.props.upvote(postID, userID, karma)

            this.setState({pressedState: 1})
        }
    }

    onDownvotePressed = () => { 
        if (this.state.pressedState !== -1) { 
            const { postID, userID } = this.props.item; 
            const { likedPosts } = this.props; 

            let karma = -1; 
            if (likedPosts !== undefined) { 
                if (likedPosts.indexOf(postID) >= 0) { 
                    karma--; 
                }
            }

            this.props.downvote(postID, userID, karma)

            this.setState({pressedState: -1})
        }
    }

    onCommentsPressed = () => { 
        const { postID } = this.props.item; 

        const { navigate, crypto } = this.props; 

        navigate('Comment', {postID: postID, crypto: crypto}); 
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

        if (this.state.pressedState === -1) return <Image source={require('../../assets/down_arrow_pressed.png')}></Image>
        else return <Image source={require('../../assets/down_arrow.png')}></Image>
    }

    getUpArrowGraphic(likedPosts, postID) { 
        
        if (this.state.pressedState === 1) return <Image source={require('../../assets/up_arrow_pressed.png')}></Image>
        else return <Image source={require('../../assets/up_arrow.png')}></Image>
    }

    render() { 
        const { item, likedPosts, dislikedPosts } = this.props

        this.updatePressedStatefromStore(likedPosts, dislikedPosts, item.postID)

        let upArrow = this.getUpArrowGraphic(likedPosts, item.postID); 
        let downArrow = this.getDownArrowGraphic(dislikedPosts, item.postID); 

        return (<View style={styles.messageBox}>
                <View style={styles.titleBox}>
                    <Image style={{width: 16, height: 16}}
                    source={{uri: `http://www.joshsiegl.com/crypto/${this.props.crypto}.png`}} />
                    <Text style={{paddingLeft: 5, width: '90%'}}>{item.userID}</Text>  
                    <Text style={styles.messageText}>{item.body}</Text>
                </View>
                <View style={styles.voteBox}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.voteSection}>
                        <TouchableOpacity onPress={this.onUpvotePressed}>
                            {upArrow}
                        </TouchableOpacity>
                        <Text style={{lineHeight: 18, fontSize:18, color: '#373F51', paddingRight: 5, paddingLeft: 5}}>vote</Text>
                        <TouchableOpacity onPress={this.onDownvotePressed}>
                            {downArrow}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.commentSection}>
                            <TouchableOpacity onPress={this.onCommentsPressed} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/reply.png')} />
                                <Text style={{lineHeight: 18, fontSize:18, color: '#373F51', paddingLeft: 5}} >comments</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </View>)
    }
}

ChatItem.propTypes = propTypes; 

export default ChatItem; 