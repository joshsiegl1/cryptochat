import PropTypes from 'prop-types'; 
import React, {PureComponent, Component } from 'react'; 

import {View, Image, Text, TouchableOpacity, Modal} from 'react-native'; 

import { Asset } from 'expo'; 

import Link from './Link'; 

import { parseLinks, parseImage } from '../utils/ChatUtils'; 

import styles from '../styles/stylesheet'; 

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

        navigate('Comment', {postID: postID, crypto: crypto}); 
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

    LinkifyBody = (body) => { 
        try {
            const links = parseLinks(body); 

            let b = body; 

            let indexes = []; 
            for (let i = 0; i < links.length; i++) { 
                let p = `|name=${links[i].name};url=${links[i].url}|`; 
                indexes.push(b.search(p)); 
                b = b.replace(p, "")
            }

            let objectBody = []; 
            for (let x = 0; x < indexes.length; x++) { 
                let piece = b.slice(x, indexes[x]); 
                objectBody.push(<Text>{piece}</Text>)
                objectBody.push(
                <Link navigate={this.props.navigate}
                      name={links[x].name}
                      url={links[x].url} />); 

                if (x === indexes.length - 1) { 
                    let lastPiece = b.slice(indexes[x])
                    objectBody.push(<Text>{lastPiece}</Text>)
                }
            }

            if (objectBody.length > 0) { 
                return (<Text>{objectBody}</Text>)
            }
            else { 
                return (<Text>{b}</Text>)
            }
        }
        catch(e) { 
            return body; 
        }
    }

    ImagifyBody = (body) => { 
        try { 
            let link = parseImage(body); 

            let b = body; 

            let indexes = []; 
            if (link !== "") {
                indexes.push(b.search(link));  
                b = b.replace("{" + link + "}", ""); 
            }

            let uri = "https://s3.amazonaws.com/cryptochat-app-45/" + link

            let objectBody = []; 
            for (let x = 0; x < indexes.length; x++) { 
                let piece = b.slice(x, indexes[x]); 
                objectBody.push(<Text>{piece}</Text>)
                objectBody.push(
                    <Image style={{width: 150, height: 150}} source={{uri: uri}} />
                )

                if (x === indexes.length - 1) { 
                    let lastPiece = b.slice(indexes[x])
                    objectBody.push(<Text>{lastPiece}</Text>)
                }
            }

            if (objectBody.length > 0) { 
                return (<Text>{objectBody}</Text>)
            }
            else { 
                return (<Text>{b}</Text>)
            }
            }
        catch(e) { 
            return body; 
        }
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

        let body = this.ImagifyBody(item.body); 
        if (body !== "") { 
            body = this.LinkifyBody(body); 
        }

        return (
                <View style={styles.messageBox}>
                <View style={styles.titleBox}>
                    <Image style={{width: 16, height: 16}}
                    source={{uri: `http://www.joshsiegl.com/crypto/${this.props.crypto}.png`}} />
                    <Text style={{paddingLeft: 5, width: '90%', color: userColor, fontFamily: 'arial'}}>{item.userID}</Text>  
                </View>
                <View style={styles.bodyBox}>
                    <Text style={{paddingLeft: 21, fontSize: 18, color: '#373F51', fontFamily: 'arial'}}>{body}</Text>
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