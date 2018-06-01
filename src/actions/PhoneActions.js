
import { SEND_CODE } from '../constants/ApiConstants'; 
import { callApi } from '../utils/ApiUtils'; 

export const SendCode = (phone) => async (dispatch) => { 
    let body = { 
        phone
    }

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(body)
    }

    const { json } = await callApi(SEND_CODE, options); 
}