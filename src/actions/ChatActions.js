import { POST_CHAT_URL, GET_CHAT_URL } from '../constants/ApiConstants'; 
import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 


export const PostChat = (message) => async (dispatch) => { 
    const { json } = await callApi(POST_CHAT_URL, {}); 
}

const getChatSuccess = (id, comments) => ({
    type: types.GET_POSTS,
    ticker: id,  
    chats: comments
})

export const GetChat = (id) => async (dispatch) => { 
    const { json } = await callApi(GET_CHAT_URL.replace(':crypto', id));
    
    dispatch(getChatSuccess(id, json))
}