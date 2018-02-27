import { GET_USER_URL, ADD_USER_URL } from '../constants/ApiConstants';
import * as types from '../constants/ActionTypes'; 
import { callApi } from '../utils/ApiUtils'; 

const getUserSuccess = (user) => { 
    return { 
        type: types.GET_USER, 
        user
    }
}

export const GetUser = (username, password) => async (dispatch) => { 
    let body = { 
        username, 
        password
    }; 

    let options = { 
        method: 'post', 
        header: {
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(body)
    }

    const { json } = await callApi(GET_USER_URL, options); 

    console.log(json); 

    dispatch(getUserSuccess(json)); 
}

const addUserSuccess = (user) => { 
    
}