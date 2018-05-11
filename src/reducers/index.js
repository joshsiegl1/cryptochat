import {combineReducers} from 'redux'; 
import cryptocurrency from './cryptocurrency'; 
import chats from './chats'; 
import user from './user'; 
import imageCache from './image-cache'; 

const rootReducer = combineReducers({
    cryptocurrency, 
    chats, 
    user, 
    imageCache
}); 

export default rootReducer; 

