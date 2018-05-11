import {createStore, applyMiddleware} from 'redux'; 
import thunkMiddleware from 'redux-thunk'; 
import createSagaMiddleware from 'redux-saga'; 
import rootReducer from '../reducers/index'; 
import sagas from '../saga'; 

const sagaMiddleware = createSagaMiddleware(); 
const middleware = [
    thunkMiddleware, 
    sagaMiddleware
]; 

//const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore); 

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore); 

// const store = createStore(
//     rootReducer, 
//     applyMiddleware(...middleware)
// )



export default function configureStore(initialState) { 
    const store = createStoreWithMiddleware(rootReducer, initialState); 

    sagaMiddleware.run(sagas); 

    return store; 
}

// export default function configureStore(initialState) { 
//     const store = createStoreWithMiddleware(rootReducer, initialState); 

//     return store; 
// }