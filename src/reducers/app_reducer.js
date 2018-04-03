import {
	LOGIN,
	LOGOUT,

} from '../actiontypes/index.js';
import Storage from '../assets/js/storage.js';

const initialState = {
	register: Storage.fetch().register || false,
}

 const AppReducer = (state=initialState, action) => {
 	switch (action.type) {
 		case LOGOUT: 
 			return Object.assign({}, state, {
 				register: false, 			
 			})
 		case LOGIN: 
 			return Object.assign({}, state, {
				register: true,
 			})
 		default:
 			return state;
 	}
}


export default AppReducer;