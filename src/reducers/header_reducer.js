import { 
	SHOWMODAL,
	HIDEMODAL,
	LOGOUT,
	CHANGEACTION,
	REGISTERHANDLER,
	SETNICKNAME,
	CLICKBUTTON,
	LOGINSUCCESS,
	REGISTERSUCCESS,
	CONFIRMDIRTY,

} from '../actiontypes/index.js';
import Storage from '../assets/js/storage.js';

const initialState = {
	register: Storage.fetch().register || false,
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
 		case LOGOUT: 
 			return Object.assign({}, state, {
 				register: false,
				nickname: '',
				action: 'login',
 			})	
 		case CHANGEACTION: 
 			return Object.assign({}, state, {
				action: action.action,
 			})
 		case REGISTERHANDLER: 
 			return Object.assign({}, state, {
				register: action.register,
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
				register: true,
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