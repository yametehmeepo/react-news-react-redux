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
import { message} from 'antd';
import axios from 'axios';
import Storage from '../assets/js/storage.js';

export const showModal = () => {
	return {
		type: SHOWMODAL,
	}
}

export const hideModal = () => {
	return {
		type: HIDEMODAL,
	}
}

export const logout = () => {
	return {
		type: LOGOUT,
	}
}

export const changeAction = (value) => {
	return {
		type: CHANGEACTION,
		action: value
	}
}

export const registerHandler = (bool) => {
	return {
		type: REGISTERHANDLER,
		register: bool
	}
}

export const setNickName = (value) => {
	return {
		type: SETNICKNAME,
		nickname: value
	}
}

export const setConfirmdirty = (confirmDirty) => {
	return {
		type: CONFIRMDIRTY,
		confirmDirty
	}
}

export const loginSuccess = (nickname,userId) => {
	return {
		type: LOGINSUCCESS,
		nickname,
		userId
	}
}

export const registerSuccess = () => {
	return {
		type: REGISTERSUCCESS,
	}
}


export const clickbutton = (action,username,password,r_userName,r_password,r_confirmpassword,form) => dispatch => {
	dispatch({
		type: CLICKBUTTON,
		action
	})	
	axios.get('http://newsapi.gugujiankong.com/Handler.ashx?action='+action+'&username='+username+'&password='+password+'&r_userName='+r_userName+'&r_password='+r_password+'&r_confirmPassword='+r_confirmpassword)
	.then(res => {
		form.resetFields();
		var logindata = res.data;
			if(action === 'login'){
				message.success('登陆成功!');
				Storage.save({
					register: true,
					nickname: logindata.NickUserName,
					userId: logindata.UserId,
				});
				dispatch(loginSuccess(logindata.NickUserName,logindata.UserId));
			}else{
				message.success('注册成功!');
				dispatch(registerSuccess());
			}
			//PubSub.publish('UpdateCollect');
	})
}




