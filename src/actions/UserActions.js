import { 
    GET_USER_URL, 
    VALIDATE_TOKEN, 
    UPDATE_USERNAME, 
    GET_USER, 
    UPDATE_PROFILE_PIC, 
    DELETE_USER, 
    BLOCK_POST, 
    BLOCK_USER, 
    FLAG_POST } from '../constants/ApiConstants';

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

export const BlockUser = (username, id) => async (dispatch) => { 
    let reqbody = { 
        username, 
        id
    }

    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(reqbody)
    }

    const { json } = await callApi(BLOCK_USER, options);
    
    if (json.error) { 
        Alert.alert("User not found", "The user you are trying to block could not be found"); 
    }
    else if (json) { 
        dispatch({
            type: types.GET_USER, 
            user: json
        })
    }
}

export const BlockPost = (postID) => async (dispatch) => { 
    let reqbody = { 
        postID
    }

    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(reqbody)
    }

    const { json } = await callApi(BLOCK_POST, options); 
}

export const FlagPost = (postID) => async (dispatch) => { 
    let reqbody = { 
        postID
    }

    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(reqbody)
    }

    const { json } = await callApi(FLAG_POST, options); 
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

export const DeleteAccount = () => async (dispatch) => { 
    let token = await AsyncStorage.getItem('token'); 
    let phone = await AsyncStorage.getItem('phone'); 

    let reqbody = { 
        phone
    }

    let options = { 
        method: 'delete', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(reqbody)
    }

    const { json } = await callApi(DELETE_USER, options);

    dispatch({
        type: types.DELETE_USER,  
        user: {}  
    })
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