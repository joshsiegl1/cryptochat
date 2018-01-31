import {combineReducers} from 'redux'; 
import router from './router'; 
import cryptocurrency from './cryptocurrency'; 
import chats from './chats'; 

const rootReducer = combineReducers({
    router, 
    cryptocurrency, 
    chats
}); 

export default rootReducer; 