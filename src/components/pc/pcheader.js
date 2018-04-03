import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Button, Form, Input, Modal, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
	showModal,
	hideModal,
	logout,
	changeAction,
	registerHandler,
	setNickName,
	clickbutton,
	setConfirmdirty,

} from '../../actions/index.js';
import Storage from '../../assets/js/storage.js';

const MenuItem = Menu.Item;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class FormRegister extends Component {
	constructor(){
		super();
		this.validateToNextPassword = this.validateToNextPassword.bind(this);
		this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
	}
	registeSubmit(e){
		const { action, registerclicked, Onclickbutton, registertext } = this.props;
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
		const {getFieldDecorator} = this.props.form;
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

class PCHeaderConnect extends Component {
	componentDidMount(){
		const { register, nickname } = this.props;
		console.log("是否登陆: "+ register);
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
		var isLogined = Storage.fetch().register;
		if(!isLogined){
			e.preventDefault();
			window.open('http://localhost:3000/');
		}
	}
	render(){
		const { register, action, visible, nickname, logintext, loginclicked, registertext, registerclicked, OnShowModal, OnHideModal, OnregisterHandler, OnsetNickName, Onclickbutton, OnsetConfirmdirty } = this.props;
		var lastMenuItem = !register
		?
		<Button onClick={OnShowModal}><Icon type="appstore" /><span>注册/登录</span></Button>
		:
		<div>
			<Button type="primary">{nickname}</Button>
			&nbsp;&nbsp;
			<Button type="dashed" href="/usercenter" target="_blank" className="usercenter" onClick={this.gotousercenter.bind(this)}>个人中心</Button>
			&nbsp;&nbsp;
			<Button type="ghost" onClick={this.logouthandler.bind(this)}>退出</Button>
		</div>;
		
		return (
			<header>
				<Row>
					<Col span={5}>
						<a href="/" className="logo">
							<img src={require('../../assets/img/logo2.png')} alt="logo"/>
							<span>ReactNews</span>
						</a>
					</Col>
					<Col span={19} style={{position: 'relative'}}>
						<Menu
							mode='horizontal'
							defaultSelectedKeys={['1']}
						>
							<MenuItem key='1'><Link to="/"><Icon type="appstore" /><span>头条</span></Link></MenuItem>
							<MenuItem key='2'><Link to="/shehui"><Icon type="appstore" /><span>社会</span></Link></MenuItem>
							<MenuItem key='3'><Link to="/guonei"><Icon type="appstore" /><span>国内</span></Link></MenuItem>
							<MenuItem key='4'><Link to="/guoji"><Icon type="appstore" /><span>国际</span></Link></MenuItem>
							<MenuItem key='5'><Link to="/yule"><Icon type="appstore" /><span>娱乐</span></Link></MenuItem>
							<MenuItem key='6'><Link to="/tiyu"><Icon type="appstore" /><span>体育</span></Link></MenuItem>
							<MenuItem key='7'><Link to="/keji"><Icon type="appstore" /><span>科技</span></Link></MenuItem>
							<MenuItem key='8'><Link to="/shishang"><Icon type="appstore" /><span>时尚</span></Link></MenuItem>
						</Menu>
						<div className="loginpanel">
							{lastMenuItem}
						</div>
					</Col>
				</Row>
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
								OnregisterHandler={OnregisterHandler}
								OnsetNickName={OnsetNickName}
								Onclickbutton={Onclickbutton}
								action={action}
								logintext={logintext}
								loginclicked={loginclicked}
							/>
						</TabPane>
						<TabPane tab="注册" key="2">
							<RegisterForm 
								OnregisterHandler={OnregisterHandler}
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
		register: state.register,
		action: state.action,
		visible: state.visible,
		nickname: state.nickname,
		logintext: state.logintext,
		loginclicked: state.loginclicked,
		registertext: state.registertext,
		registerclicked: state.registerclicked,
		confirmDirty: state.confirmDirty
	}
}

function mapDispatchToProps (dispatch) {
	return {
		OnShowModal: () => dispatch(showModal()),
		OnHideModal: () => dispatch(hideModal()),
		Onlogout: () => dispatch(logout()),
		OnchangeAction: (value) => dispatch(changeAction(value)),
		OnregisterHandler: (bool) => dispatch(registerHandler(bool)),
		OnsetNickName: (value) => dispatch(setNickName(value)),
		Onclickbutton: (action,username,password,r_userName,r_password,r_confirmpassword,form) => dispatch(clickbutton(action,username,password,r_userName,r_password,r_confirmpassword,form)),
		OnsetConfirmdirty: (confirmDirty) => dispatch(setConfirmdirty(confirmDirty)),

	}
}

const PCHeader = connect(
	mapStateToProps,
	mapDispatchToProps
)(PCHeaderConnect)

export default PCHeader;








