
import { POST_CHAT_URL, GET_CHAT_URL } from '../constants/ApiConstants'; 
import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 

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

    console.log(json); 

    if (json === "Success") { 

    }

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