import { GET_USER_URL } from '../constants/ApiConstants';

import * as types from '../constants/ActionTypes'; 
import { callApi } from '../utils/ApiUtils'; 

import { Alert } from 'react-native'; 

import { registerForPushNotifications } from '../utils/PushNotification'; 

///This is used to dispatch the user to redux if it's found in storage but not in the redux store
///Also used to remove the user from the redux store on log out
export const DispatchUserfromStorage = (user) => async (dispatch) => { 
    dispatch( { 
        type: types.GET_USER, 
        user
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

export const GetUser = (phone) => async (dispatch) => { 
    let reqbody = { 
        phone
    }; 

    let options = { 
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(reqbody)
    }
}