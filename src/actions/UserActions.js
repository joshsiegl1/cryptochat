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
    let reqbody = { 
        password
    }; 

    let options = { 
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(reqbody)
    }

    const { json } = await callApi(GET_USER_URL.replace(':name', username), options); 

    console.log(json); 

    dispatch(getUserSuccess(json)); 
}

export const AddUser = (username, password) => async (dispatch) => { 

    let user = { 
        'userID': username,
        'karma': 0,  
        'password': password
    }

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user)
    }

    const { json } = await callApi(ADD_USER_URL, options); 

    console.log(json); 
}