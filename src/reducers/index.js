import { combineReducers } from 'redux';
import HeaderReducer from './header_reducer.js';
import AppReducer from './app_reducer.js';

const reducer = combineReducers({HeaderReducer,AppReducer});

export default reducer;