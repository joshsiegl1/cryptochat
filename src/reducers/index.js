import {combineReducers} from 'redux'; 
import router from './router'; 
import cryptocurrency from './cryptocurrency'; 

const rootReducer = combineReducers({
    router, 
    cryptocurrency
}); 

export default rootReducer; 