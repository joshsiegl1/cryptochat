import {combineReducers} from 'redux'; 
import cryptocurrency from './cryptocurrency'; 
import chats from './chats'; 
import user from './user'; 
import message from './message'; 

const rootReducer = combineReducers({
    cryptocurrency, 
    chats, 
    message,
    user
}); 

export default rootReducer; 

