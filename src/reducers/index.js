import {combineReducers} from 'redux'; 
import router from './router'; 
import cryptocurrency from './cryptocurrency'; 
import chats from './chats'; 
import user from './user'; 

const rootReducer = combineReducers({
    router, 
    cryptocurrency, 
    chats, 
    user
}); 

export default rootReducer; 