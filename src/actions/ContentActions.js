import { POST_LINK_URL } from '../constants/ApiConstants'; 

import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 


export const PostLink = (links) => async (dispatch) => { 
    // let link = { 
    //     id, 
    //     name, 
    //     url
    // }

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify({links})
    }

    const { json } = await callApi(POST_LINK_URL, options); 
}
