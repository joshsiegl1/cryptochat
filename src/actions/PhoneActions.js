import { Alert } from 'react-native'; 

import * as types from '../constants/ActionTypes'; 

import { SEND_CODE, SUBMIT_CODE } from '../constants/ApiConstants'; 
import { callApi } from '../utils/ApiUtils'; 

import { SetPhone, SetToken } from '../utils/UserStorage'; 

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

export const SubmitCode = (code) => async (dispatch) => { 
    let body = { 
        code
    }

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(body)
    }

    const { json } = await callApi(SUBMIT_CODE, options); 

    if (json.error === null) { 
        await SetPhone(json.phone); 
        await SetToken(json.token); 

        dispatch({
            type: types.GET_PHONE, 
            phone: json.phone
        })
    }
    else { 
        Alert.alert("Error", json.error); 
    }
}