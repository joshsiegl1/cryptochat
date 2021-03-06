
import { 
    POST_CHAT_URL, 
    GET_CHAT_URL, UPVOTE_URL, 
    DOWNVOTE_URL, GET_POST_URL, 
    POST_REPLY_URL, VOTE_URL, 
    GET_REPLY_URL, 
    DELETE_POST } from '../constants/ApiConstants'; 
import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 
import { SetLikedPosts, GetLikedPosts } from '../utils/Storage'; 
import { AsyncStorage } from 'react-native'; 

export const Vote = async (postID, userID, karma) => { 
    let vote = { 
        postID, 
        userID, 
        karma
    }

    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(vote)
    }

    const { json } = callApi(VOTE_URL, options); 
}


export const Upvote = (postID, userID, karma) => async (dispatch) => { 

    Vote(postID, userID, karma); 

    await SetLikedPosts(postID, [postID], []); 

    await GetLikedPosts(function (likedPosts, dislikedPosts){ 
        dispatch({
            type: types.LIKED_POSTS, 
            likedPosts, 
            dislikedPosts
        })
    })
}

export const Downvote = (postID, userID, karma) => async (dispatch) => {  

    Vote(postID, userID, karma); 

    await SetLikedPosts(postID, [], [postID]); 
    
    await GetLikedPosts(function (likedPosts, dislikedPosts){ 
            dispatch({
                type: types.LIKED_POSTS, 
                likedPosts, 
                dislikedPosts
            })
        })
}

export const DeletePost = (postID) => async (dispatch) => { 
    let body = { 
        postID: postID
    }

    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'delete', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x': token
        }, 
        body: JSON.stringify(body)
    }

    const { json } = await callApi(DELETE_POST, options); 
}

export const PostChat = (id, userID, message) => async (dispatch) => { 

    let chat = { 
        id, 
        userID, 
        body: message
    }

    let token = await AsyncStorage.getItem('token'); 

    let options = {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(chat)
    }

    const { json } = await callApi(POST_CHAT_URL, options); 
}

export const PostReply = (id, userID, message, postID) => async (dispatch) => { 
    let reply = { 
        id, 
        userID, 
        body: message, 
        inReplyTo: postID
    }

    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(reply)
    }

    const { json } = await callApi(POST_REPLY_URL, options)
}

const getChatSuccess = (id, content) => {
    return { 
        type: types.GET_CHAT,
        ticker: id,  
        chats: content.chats, 
        time: content.time
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
           replies: content.replies, 
           time: content.time 
    }
}

export const GetPost = (postID) => async (dispatch) => { 
    const { json } = await callApi(GET_POST_URL.replace(":postID", postID)); 

    dispatch(getPostSuccess(postID, json)); 
}

const getReplySuccess = (postID, results) => { 
    return { 
        type: types.GET_REPLIES, 
        postID: postID, 
        results: results, 
        time: results.time
    }
}

export const GetReplies = (postID) => async (dispatch) => { 
    const { json } = await callApi(GET_REPLY_URL.replace(":postID", postID)); 

    dispatch(getReplySuccess(postID, json)); 
}