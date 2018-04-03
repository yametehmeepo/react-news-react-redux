import { 
	SHOWMODAL,
	HIDEMODAL,
	CHANGEACTION,
	SETNICKNAME,
	CLICKBUTTON,
	LOGINSUCCESS,
	REGISTERSUCCESS,
	CONFIRMDIRTY,
	QUITE
} from '../actiontypes/index.js';
import Storage from '../assets/js/storage.js';

const initialState = {
	action: 'login',
	visible: false,
	nickname: Storage.fetch().nickname || '',
	logintext: '登录',
	loginclicked: false,
	registertext: '注册',
	registerclicked: false,
	confirmDirty: false,
}

 const HeaderReducer = (state=initialState, action) => {
 	switch (action.type) {
 		case SHOWMODAL: 
 			return Object.assign({}, state, {
 				visible: true
 			})
 		case HIDEMODAL: 
 			return Object.assign({}, state, {
 				visible: false
 			})	
 		case QUITE: 
 			return Object.assign({}, state, {
				nickname: '',
				action: 'login',
 			})	
 		case CHANGEACTION: 
 			return Object.assign({}, state, {
				action: action.action,
 			})
 		case SETNICKNAME: 
 			return Object.assign({}, state, {
				nickname: action.nickname,
 			})
 		case CONFIRMDIRTY: 
 			return Object.assign({}, state, {
				confirmDirty: action.confirmDirty,
 			})	
 		case CLICKBUTTON: 
 			if(action.action === 'login'){
	 			return Object.assign({}, state, {
					logintext: '登录中...',
					loginclicked: true,
	 			})		
 			}else{
	 			return Object.assign({}, state, {
					registertext: '注册中...',
					registerclicked: true,
	 			})			
 			}
 		case LOGINSUCCESS: 
 			return Object.assign({}, state, {
 				visible: false,
				logintext: '登录',
				loginclicked: false,
				nickname: action.nickname,
				userId: action.userId
 			})
 		case REGISTERSUCCESS: 
 			return Object.assign({}, state, {
				registertext: '注册',
				registerclicked: false,
 			})		
 		default:
 			return state;
 	}
}









export default HeaderReducer;