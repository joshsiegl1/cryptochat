import PropTypes from 'prop-types'; 
import React, {PureComponent} from 'react'; 

import ReplyItem from './ReplyItem'; 

import { View } 

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
        for (let i = 0; i < item.replies.length; i++) { 
            replies.push(getReply(item.replies[i], 0)); 

            for (let x = 0; x < item.replies[i].replies.length; x++) { 
                replies.push(getReply(item.replies[i].replies[x], 1)); 

                for (let y = 0; y < item.replies[i].replies[x].replies.length; y++) { 
                    replies.push(getReply(item.replies[i].replies[x].replies[y], 2)); 
                }
            }
        }
        
        return (<View>
                {replies}
                </View>)
    }
}