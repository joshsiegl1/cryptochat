import {combineReducers} from 'redux'; 
import cryptocurrency from './cryptocurrency'; 
import chats from './chats'; 
import user from './user'; 

const rootReducer = combineReducers({
    cryptocurrency, 
    chats, 
    user
}); 

export default rootReducer; 

