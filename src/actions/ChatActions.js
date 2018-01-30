import { POST_CHAT_URL } from '../constants/ApiConstants'; 
import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 


export const PostChat = (message) => async (dispatch) => { 
    const { json } = await callApi(POST_CHAT_URL, {}); 
}