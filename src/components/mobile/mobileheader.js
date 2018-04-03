import React, { Component } from 'react';
import { Icon, Button, Form, Input, Modal, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
	showModal,
	hideModal,
	changeAction,
	setNickName,
	setConfirmdirty,

} from '../../actions/index.js';
import Storage from '../../assets/js/storage.js';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class FormRegister extends Component {
	constructor(){
		super();
		this.validateToNextPassword = this.validateToNextPassword.bind(this);
		this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
	}
	registeSubmit(e){
		const { action, registerclicked, Onclickbutton } = this.props;
		e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	      	if(!registerclicked){
	      		console.log('注册');
		        console.log('Received values of form: ', values);
		        Onclickbutton(action,values.username,values.password,values.r_username,values.r_password,values.r_confirmpassword,this.props.form);
		    }
	      }
	    });
	}
	compareToFirstPassword(rule, value, callback){
		const form = this.props.form;
	    if (value && value !== form.getFieldValue('r_password')) {
	      callback('两次密码不一致!');
	    } else {
	      callback();
	    }
	}
	validateToNextPassword(rule, value, callback){
		const form = this.props.form;
		const { confirmDirty } =this.props;
	    if (value && confirmDirty) {
	      form.validateFields(['confirm'], { force: true });
	    }
	    callback();
	}
	handleConfirm(e){
		var value = e.target.value;
		const { confirmdirty, OnsetConfirmdirty } = this.props;
		OnsetConfirmdirty(confirmdirty || !!value)
	}
	render(){
		let {getFieldDecorator} = this.props.form;
		const { registertext, registerclicked } = this.props;
		return (
			<Form layout='vertical' id="form2" onSubmit={this.registeSubmit.bind(this)}>
				<FormItem label="账号">
					{
						getFieldDecorator('r_username', {
							rules: [{ 
								required: true, message: '请输入账号!'
							}],
						})( <Input placeholder="请输入您的帐号" className="radiusInput"/> )
					}
				</FormItem>
				<FormItem label="密码">
					{
						getFieldDecorator('r_password', {
							rules: [{
								required: true, message: '请输入密码!'
							},{
								validator: this.validateToNextPassword
							}],
						})( <Input type="password" placeholder="请输入您的密码" className="radiusInput"/>)
					}
				</FormItem>
				<FormItem label="确认密码">
					{
						getFieldDecorator('r_confirmpassword', {
							rules: [{ 
								required: true, message: '请再次输入密码!'
							},{
								validator: this.compareToFirstPassword
							}]
						})( <Input type="password" placeholder="请再次输入您的密码" className="radiusInput" onBlur={this.handleConfirm.bind(this)}/>)
					}
				</FormItem>
				<Button type="primary" htmlType="submit" form="form2" disabled={registerclicked}>{registertext}</Button>
			</Form>
		)
	}
}
const RegisterForm = Form.create({})(FormRegister);

class FormLogin extends Component {
	loginSubmit(e){
		const { action, loginclicked, Onclickbutton } = this.props;
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err,values) => {
			if(!err){
				if(!loginclicked){
					console.log('登录');
					console.log('Received values of form: ', values);
					Onclickbutton(action,values.username,values.password,values.r_username,values.r_password,values.r_confirmpassword,this.props.form);
				}	
			}
		})
	}
	render(){
		let {getFieldDecorator} = this.props.form;
		const { logintext, loginclicked } = this.props;
		return (
			<Form layout='vertical' id="form1" hideRequiredMark onSubmit={this.loginSubmit.bind(this)}>
				<FormItem label="账号">
					{
						getFieldDecorator('username', {
							rules: [{ required: true, message:'请输入账号!'}]
						})( <Input placeholder="请输入您的帐号" className="radiusInput"/> )
					}
				</FormItem>
				<FormItem label="密码">
					{
						getFieldDecorator('password', {
							rules: [{ required: true, message: "请输入密码!"}]
						})( <Input type="password" placeholder="请输入您的密码" className="radiusInput"/>)
					}
				</FormItem>
				<Button type="primary" htmlType="submit" form="form1" disabled={loginclicked}>{logintext}</Button>
			</Form>
		)
	}
}
const LoginForm = Form.create({})(FormLogin);

class MobileHeaderConnect extends Component {
	componentDidMount(){
		const { nickname } = this.props;
		console.log("用户昵称: "+ nickname);
	}
	changeActionHandler(key){
		const { OnchangeAction } = this.props;
		if(key === '1'){
			console.log('tab-login');
			OnchangeAction('login');
		}else{
			console.log('tab-register');
			OnchangeAction('register');
		}
	}
	logouthandler(){
		this.props.Onlogout();
		Storage.save({
			register: false,
			nickname: '',
			userId: 0,
		});
	}
	gotousercenter(e){
		if(!Storage.fetch().register){
			e.preventDefault();
			window.open('http://localhost:3000/');
		}
	}
	render(){
		const { register, action, visible, logintext, loginclicked, registertext, registerclicked, OnShowModal, OnHideModal, OnsetNickName, Onclickbutton, OnsetConfirmdirty } = this.props;
		var lastMenuItem = register
		?
		<div>
			<Link to="/usercenter" onClick={this.gotousercenter.bind(this)} style={{marginTop: '-4px',display: 'inline-block'}}>
				<Button type="primary" className="usercenter">个人中心</Button>
			</Link>
			&nbsp;&nbsp;
			<Button type="default" onClick={this.logouthandler.bind(this)}>退出</Button>
		</div>
		:
		<Icon type="setting" onClick={OnShowModal}/>
		;
		return (
			<header className="mobileheader">
				<Link to="/" className="mblogo">
					<img src={require('../../assets/img/logo2.png')} alt="logo"/>
					<span>ReactNews</span>
				</Link>
				<div className="loginpanel">
					{lastMenuItem}
				</div>
				<Modal
					visible={visible}
					title="用户中心"
					onCancel={OnHideModal}
					onOk={OnHideModal}
					okText="关闭"
					cancelText="取消"
				>
					<Tabs type='card' defaultActiveKey='1' animated={true} onChange={this.changeActionHandler.bind(this)}>
						<TabPane tab="登录" key="1">
							<LoginForm 
								OnShowModal={OnShowModal} 
								OnHideModal={OnHideModal} 
								OnsetNickName={OnsetNickName}
								Onclickbutton={Onclickbutton}
								action={action}
								logintext={logintext}
								loginclicked={loginclicked}
							/>
						</TabPane>
						<TabPane tab="注册" key="2">
							<RegisterForm 
								Onclickbutton={Onclickbutton}
								OnsetConfirmdirty={OnsetConfirmdirty}
								action={action}
								registertext={registertext}
								registerclicked={registerclicked}
							/>
						</TabPane>
					</Tabs>
				</Modal>
			</header>
		)
	}
}

function mapStateToProps (state) {
	return {
		action: state.HeaderReducer.action,
		visible: state.HeaderReducer.visible,
		nickname: state.HeaderReducer.nickname,
		logintext: state.HeaderReducer.logintext,
		loginclicked: state.HeaderReducer.loginclicked,
		registertext: state.HeaderReducer.registertext,
		registerclicked: state.HeaderReducer.registerclicked,
		confirmDirty: state.HeaderReducer.confirmDirty
	}
}

function mapDispatchToProps (dispatch) {
	return {
		OnShowModal: () => dispatch(showModal()),
		OnHideModal: () => dispatch(hideModal()),
		OnchangeAction: (value) => dispatch(changeAction(value)),
		OnsetNickName: (value) => dispatch(setNickName(value)),
		OnsetConfirmdirty: (confirmDirty) => dispatch(setConfirmdirty(confirmDirty)),

	}
}

const MobileHeader = connect(
	mapStateToProps,
	mapDispatchToProps
)(MobileHeaderConnect)

export default MobileHeader;