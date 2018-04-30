import { POST_LINK_URL } from '../constants/ApiConstants'; 

import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 


export const PostLink = (id, name, url) => async (dispatch) => { 
    let link = { 
        id, 
        name, 
        url
    }

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(link)
    }

    const { json } = callApi(POST_LINK_URL, options); 
}