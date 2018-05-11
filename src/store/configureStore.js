import {createStore, applyMiddleware} from 'redux'; 
import thunkMiddleware from 'redux-thunk'; 
import rootReducer from '../reducers/index'; 

const middleware = [
    thunkMiddleware
]; 

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore); 

export default function configureStore(initialState) { 
    const store = createStoreWithMiddleware(rootReducer, initialState); 

    return store; 
}