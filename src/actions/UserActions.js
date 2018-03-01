import { GET_USER_URL, ADD_USER_URL } from '../constants/ApiConstants';
import * as types from '../constants/ActionTypes'; 
import { callApi } from '../utils/ApiUtils'; 

import { Alert } from 'react-native'; 

const getUserSuccess = (user) => { 
    return { 
        type: types.GET_USER, 
        user
    }
}

export const GetUser = (username, password) => async (dispatch) => { 
    let reqbody = { 
        'password': password
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
    let error = json.error; 
    if (error === "Incorrect username/password")
    { 
        Alert.alert("Invalid Username/Password", "The username or password combination entered is incorrect", {text: 'OK'})
    }
    else { 
        dispatch(getUserSuccess(json)); 
    }
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