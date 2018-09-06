import { ADD_CATEGORY } from '../constants/ApiConstants'; 

import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 

import { AsyncStorage, Alert } from 'react-native';

export const AddCategory = (category) => async (dispatch) => { 
    let reqbody = { 
        id: category.id, 
        source: category.source, 
        type: category.type, 
        _category: category._category, 
        name: category.name, 
        description: category.description, 
        slug: category.slug
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

    const { json } = await callApi(ADD_CATEGORY, options); 

    if (json.error) { 
        Alert.alert("Error", "There was an error adding this channel"); 
    }
}
