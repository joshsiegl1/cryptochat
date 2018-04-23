import PropTypes from 'prop-types'; 
import React, {PureComponent} from 'react'; 

import ReplyItem from './ReplyItem'; 

import { View } from 'react-native'; 

const propTypes = { 
    item: PropTypes.shape
}

class ReplyThread extends PureComponent { 
    constructor(props) { 
        super(props)

        this.state = { 

        }
    }

    getReply(item, index) { 
        const { 
            navigate, 
            upvote, 
            downvote, 
            crypto, 
            likedPosts, 
            dislikedPosts, 
            currentTime
        } = this.props; 

        return (<ReplyItem 
                item={item}
                index={index} 
                navigate={navigate}
                upvote={upvote}
                downvote={downvote}
                crypto={crypto}
                likedPosts={likedPosts}
                dislikedPosts={dislikedPosts} 
                currentTime={currentTime}
                />)

    }

    render() { 
        const { item } = this.props; 

        const replies = []; 

        replies.push(this.getReply(item, 0)); 

        for (let i = 0; i < item.replies.length; i++) { 
            replies.push(this.getReply(item.replies[i], 1)); 

            for (let x = 0; x < item.replies[i].replies.length; x++) { 
                replies.push(this.getReply(item.replies[i].replies[x], 2)); 

                for (let y = 0; y < item.replies[i].replies[x].replies.length; y++) { 
                    replies.push(this.getReply(item.replies[i].replies[x].replies[y], 3)); 
                }
            }
        }
        
        return (<View style={{borderColor: '#EFEFED', borderBottomWidth: 10}}>
                {replies}
                </View>)
    }
}

ReplyThread.propTypes = propTypes; 

export default ReplyThread; 