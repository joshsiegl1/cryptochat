import PropTypes from 'prop-types'; 
import React, {Component} from 'react';

import {View, Text, TextInput, Keyboard, TouchableOpacity, Image, KeyboardAvoidingView, FlatList, Platform} from 'react-native'; 

import { AdMobBanner } from 'expo'; 

import ReplyThread from './ReplyThread'; 

import ChatBar from './ChatBar'; 

import Link from './Link'; 
import SmartImage from './SmartImage'; 

import { parseLinks, parseImage } from '../utils/ChatUtils'; 

import styles from '../styles/commentSheet'; 

const propTypes = { 
    comment: PropTypes.shape({}), 
    replies: PropTypes.shape({}), 
    GetPost: PropTypes.func, 
    GetReplies: PropTypes.func, 
    PostReply: PropTypes.func, 
    user: PropTypes.shape()
}

class Comment extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
        }
    }

    componentDidMount() { 
        
        const { navigation, GetReplies} = this.props; 
            
        const { postID } = navigation.state.params; 
            
        GetReplies(postID); 
    }

    onNavigateBack = () => { 

        setTimeout(function() { 

            const { navigation, GetReplies } = this.props; 
            
            const { postID } = navigation.state.params; 
                    
            GetReplies(postID);  

        }.bind(this), 1500); 

    }

    onScrollback = () => { 
        try { 
             this.flatList.scrollToEnd({animated: true}); 
        }
        catch(error) {  }
    }

    _renderItem =({item}) => (
        <ReplyThread item={item}
                   crypto={this.props.navigation.state.params.crpyto}
                   upvote={this.props.Upvote}
                   downvote={this.props.Downvote}
                   navigate={this.props.navigation.navigate}
                   likedPosts={this.props.likedPosts}
                   dislikedPosts={this.props.dislikedPosts}
                   currentTime={this.props.currentTime}
                   onNavigateBack={this.onNavigateBack}/>
    )

    _keyExtractor = (item, index) => item.postID

    displayAd = () => { 
        if (Platform.OS === 'ios') { 
            return (<AdMobBanner 
            bannerSize="fullbanner"
            adUnitID="ca-app-pub-2896471597472603/8703233139"
            didFailToReceiveAdWithError={this.bannerError}
            />) 
        }
        else { 
            return (<AdMobBanner 
            bannerSize="fullbanner"
            adUnitID="ca-app-pub-2896471597472603/2666295016"
            didFailToReceiveAdWithError={this.bannerError}
            />) 
        }
    }

    Transform = (body) => { 
        let image = parseImage(body); 
        let links = parseLinks(body); 

        let uri = "https://s3.amazonaws.com/cryptochat-app-45/" + image; 

        let b = body; 

        let imageIndex = []; 
        if (image !== "") { 
            imageIndex.push(b.search(image)); 
            b = b.replace("{" + image + "}", ""); 
        }

        let linkIndexes = []; 
        for (let i = 0; i < links.length; i++) { 
            let p = `|name=${links[i].name};url=${links[i].url}|`; 
            linkIndexes.push(b.search(p)); 
            b = b.replace(p, ""); 
        }

        let indexes = [...imageIndex, ...linkIndexes]; 
        indexes = indexes.sort((a, b) => a - b); 

        let objectBody = []; 
        for (let x = 0; x < indexes.length; x++) {

            let type = (linkIndexes.indexOf(indexes[x]) !== -1) ? "Link" : "Image"; 

            let start_pos = (x === 0) ? 0 : indexes[x - 1];
            let piece = b.slice(start_pos, indexes[x]); 

            objectBody.push(<Text style={{fontSize: 18, color: '#373F51', fontFamily: 'arial'}}>{piece}</Text>)

            let component = (<Text></Text>); 
            if (type === "Image") {
                component = (<SmartImage uri={uri} />)
            }
            else {  
                component = (<Link navigate={this.props.navigation.navigate}
                                   name={links[x].name}
                                   url={links[x].url} />)
            }

            objectBody.push(component); 

            if (x === indexes.length - 1) { 
                let lastPiece = b.slice(indexes[x])
                objectBody.push(<Text style={{fontSize: 18, color: '#373F51', fontFamily: 'arial'}}>{lastPiece}</Text>)
            }
        }

        return (objectBody.length > 0) ? (<View>{objectBody}</View>) : (<Text style={{fontSize: 18, color: '#373F51', fontFamily: 'arial'}}>{b}</Text>)
    }

    render() { 

        const { replies, comment, navigation } = this.props; 
        const { postID, crypto } = navigation.state.params; 

        let ad = this.displayAd(); 

        let replySet = []; 
        let subReplies = []; 
        let postContent = ""; 
        let user = ""; 
        if (Object.keys(replies).length > 0) { 
            replySet = replies[postID]; 
            if (replySet !== undefined) { 
                postContent = this.Transform(replySet.results.body); 
                user = replySet.results.userID; 
                subReplies = replySet.results.replies; 
            }
        }

        let userColor = '#373F51'; 
        if (user === "anonymous")
            userColor = 'lightgray'


        return(<KeyboardAvoidingView
                behavior="position"
                keyboardVerticleOffset={50}
                style={{flex: 1}}>

            <View style={styles.contentContainer}>
                <View style={{fontSize: 18, color: '#373F51'}}>{postContent}</View>
            </View>

            <FlatList
                removeClippedSubviews
                ref={ref => this.flatList = ref}
                onContentSizeChange={this.onScrollback}
                //onLayout={this.onScrollback}
                style={{height: '60%'}}
                data={subReplies} 
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
             />

             <View
                    style={{borderColor: 'gray', 
                            backgroundColor: 'black', 
                            borderWidth: 1, 
                            paddingLeft: 25, 
                            paddingRight: 25, 
                            height: '10%'}}>

                    {ad}
                </View> 

                <ChatBar id={crypto}
                         postID={postID}
                         type="comment"
                         topic={postContent}
                         navigate={this.props.navigation.navigate}
                         greeting="Add a comment" />


            </KeyboardAvoidingView>)
    }
}

Comment.propTypes = propTypes; 

export default Comment; 