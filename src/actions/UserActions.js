import { GET_USER_URL, ADD_USER_URL, FACEBOOK_LOGIN_URL } from '../constants/ApiConstants';
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
        if (json.length > 0) { 
            let user = json[0]; 
            dispatch(getUserSuccess(user)); 
        }
        else { 
            Alert.alert("Something went wrong", "Please let us know if this happens again"); 
        }
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
    let response = json.response; 

    if (response === "Success")
        Alert.alert("Success", 'Successfully registered user: ' + username)
    else if (response === "username already exists")
        Alert.alert("Username Already Exists", "The username provided already exists in our database, please try something else"); 
}

export const FacebookLogin = (fbid) => async (dispatch) => { 
    let body = { 
        fbid: fbid
    }

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(body)
    }

    const { json } = await callApi(FACEBOOK_LOGIN_URL, options); 

    console.log(json); 

    dispatch(getUserSuccess(json)); 
}