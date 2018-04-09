
import { 
    POST_CHAT_URL, 
    GET_CHAT_URL, UPVOTE_URL, 
    DOWNVOTE_URL, GET_POST_URL, 
    POST_REPLY_URL } from '../constants/ApiConstants'; 
import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 
import { SetLikedPosts, GetLikedPosts } from '../utils/Storage'; 

export const Upvote = (postID, userID) => async (dispatch) => { 
    let upvote = { 
        postID, 
        userID
    }

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(upvote)
    }

    const { json } = await callApi(UPVOTE_URL, options); 

    await SetLikedPosts([postID], []); 

    await GetLikedPosts(function (likedPosts, dislikedPosts){ 
        dispatch({
            type: types.LIKED_POSTS, 
            likedPosts, 
            dislikedPosts
        })
    })
}

export const Downvote = (postID, userID) => async (dispatch) => { 
    let downvote = { 
        postID, 
        userID
    }

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(downvote)
    }

    const { json } = await callApi(DOWNVOTE_URL, options); 

    await SetLikedPosts([], [postID]); 
    
    await GetLikedPosts(function (likedPosts, dislikedPosts){ 
            dispatch({
                type: types.LIKED_POSTS, 
                likedPosts, 
                dislikedPosts
            })
        })
}

export const PostChat = (id, userID, message) => async (dispatch) => { 

    let chat = { 
        id, 
        userID, 
        body: message
    }

    let options = {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(chat)
    }

    const { json } = await callApi(POST_CHAT_URL, options); 

    dispatch(GetChat(id)); 
}

export const PostReply = (id, userID, message, postID) => async (dispatch) => { 
    let reply = { 
        id, 
        userID, 
        body: message, 
        inReplyTo: postID
    }

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(reply)
    }

    console.log("hit"); 

    const { json } = await callApi(POST_REPLY_URL, options)

    dispatch(GetPost(postID))
}

const getChatSuccess = (id, comments) => {
    return { 
        type: types.GET_CHAT,
        ticker: id,  
        chats: comments
    }
}

export const GetChat = (id) => async (dispatch) => { 
    const { json } = await callApi(GET_CHAT_URL.replace(':crypto', id));

    dispatch(getChatSuccess(id, json))
}

const getPostSuccess = (postID, content) => { 
    return { 
           type: types.GET_POST,
           postID: postID,
           comment: content.comment, 
           replies: content.replies 
    }
}

export const GetPost = (postID) => async (dispatch) => { 
    const { json } = await callApi(GET_POST_URL.replace(":postID", postID)); 

    dispatch(getPostSuccess(postID, json)); 
}