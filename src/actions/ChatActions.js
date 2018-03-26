
import { POST_CHAT_URL, GET_CHAT_URL, UPVOTE_URL, DOWNVOTE_URL } from '../constants/ApiConstants'; 
import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 

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

    }
}

export const GetPost = (postID) => async (dispatch) => { 
    const { json } = await callApi()

    dispatch(getPostSuccess(postID, json)); 
}