import { GET_USER_URL, VALIDATE_TOKEN, UPDATE_USERNAME, GET_USER, UPDATE_PROFILE_PIC } from '../constants/ApiConstants';

import * as types from '../constants/ActionTypes'; 
import { callApi } from '../utils/ApiUtils'; 

import { Alert } from 'react-native'; 

import { registerForPushNotifications } from '../utils/PushNotification'; 

import { AsyncStorage } from 'react-native'; 

///This is used to dispatch the user to redux if it's found in storage but not in the redux store
///Also used to remove the user from the redux store on log out
export const DispatchUserfromStorage = (phone) => async (dispatch) => { 
    dispatch( { 
        type: types.GET_PHONE, 
        phone
    } )
}

//Used to dispatch a user's liked and disliked posts from storage, may want to persist this data
//to a mongo upon register
export const DispatchLikedPostsfromStorage = (likedPosts, dislikedPosts) => async (dispatch) => { 
    dispatch({
        type: types.LIKED_POSTS, 
        likedPosts: likedPosts.likedPosts, 
        dislikedPosts: likedPosts.dislikedPosts
    })
}

export const GetPhone = (phone) => async (dispatch) => { 
    let reqbody = { 
        phone
    }; 

    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'post', 
        headers: {
            'Content-Type': 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(reqbody)
    }
}

export const GetUser = () => async (dispatch) => { 
    
    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'get', 
        headers: {
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }
    }

    const { json } = await callApi(GET_USER, options); 

    if (json) { 
        dispatch({ 
            type: types.GET_USER, 
            user: json.user
        })
    }
}

export const dispatchLoad = (user) => async (dispatch) => { 
    dispatch({
        type: types.UPDATE_PROFILE_PIC, 
        profilepic: "https://s3.amazonaws.com/cryptochat-app-45/loading.gif"
    })
}

export const UpdateProfilePicUrl = (url, user) => async (dispatch) => { 
    let token = await AsyncStorage.getItem('token'); 
    let phone = await AsyncStorage.getItem('phone'); 

    let reqbody = { 
        phone, 
        url
    }

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(reqbody)
    }

    const { json } = await callApi(UPDATE_PROFILE_PIC, options); 

    if (json.ok === "profile pic updated") { 
        dispatch({
            type: types.UPDATE_PROFILE_PIC, 
            profilepic: url, 
        })
    }
}

export const UpdateUsername = (username, user) => async (dispatch) => { 
      
    let token = await AsyncStorage.getItem('token'); 
    let phone = await AsyncStorage.getItem('phone'); 

    let reqbody = { 
        phone,
        username 
    }

    let options = { 
        method: 'post',
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(reqbody)
    }

    const { json } = await callApi(UPDATE_USERNAME, options); 

    //this is dumb
    if (json.ok === "username updated") { 
        dispatch({
            type: types.GET_USER, 
            user: {
                ...user, 
                username: username, 
            }
        })
    }
}

export const ValidateToken = () => async (dispatch) => { 
    let token = await AsyncStorage.getItem('token'); 

    if (token === null || token === undefined) { 
        dispatch({
            type: types.VALIDATE, 
            validated: false
        })

        return; 
    }

    let reqbody = { 
        token
    }

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(reqbody)
    }
    
    const { json } = await callApi(VALIDATE_TOKEN, options); 

    if (json.result === "valid") { 
        dispatch({
            type: types.VALIDATE, 
            validated: true
        })
    }
    else { 
        dispatch({
            type: types.VALIDATE, 
            validated: false
        })
    }
}