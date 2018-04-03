import React, { Component } from 'react';
//import { Row, Col, Menu} from 'antd';
import { Icon, Button, Form, Input, Modal, Tabs, message} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PubSub from 'pubsub-js';
import Storage from '../../assets/js/storage.js';

//const MenuItem = Menu.Item;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class FormRegister extends Component {
	constructor(){
		super();
		this.state = {
			confirmDirty: false,
			registertext: '注册',
			clicked: false,
		};
		this.registeSubmit = this.registeSubmit.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
		this.validateToNextPassword = this.validateToNextPassword.bind(this);
		this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
	}
	registeSubmit(e){
		e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	      	if(!this.state.clicked){
	      		console.log('注册');
		        console.log('Received values of form: ', values);
		        this.setState({
					registertext: '注册中...',
					clicked: true,
				});
		        axios.get('http://newsapi.gugujiankong.com/Handler.ashx?action='+this.props.action+'&username=userName&password=password&r_userName='+values.r_username+'&r_password='+values.r_password+'&r_confirmPassword='+values.r_confirmpassword).then(res => {
		        	message.success('注册成功!')
		        	this.props.form.resetFields();
		        	this.setState({
						registertext: '注册',
						clicked: false,
					});
		        }).catch(res => {

		        });
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
	    if (value && this.state.confirmDirty) {
	      form.validateFields(['confirm'], { force: true });
	    }
	    callback();
	}
	handleConfirm(e){
		var value = e.target.value;
		this.setState({confirmdirty: this.state.confirmdirty || !!value});
	}
	render(){
		let {getFieldDecorator} = this.props.form;
		return (
			<Form layout='vertical' id="form2" ref={(form2) => {this.form_2 = form2}} onSubmit={this.registeSubmit}>
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
						})( <Input type="password" placeholder="请再次输入您的密码" className="radiusInput" onBlur={this.handleConfirm}/>)
					}
				</FormItem>
				<Button type="primary" htmlType="submit" form="form2" disabled={this.state.clicked}>{this.state.registertext}</Button>
			</Form>
		)
	}
}
const RegisterForm = Form.create({})(FormRegister);

class FormLogin extends Component {
	constructor(){
		super();
		this.state = {
			logintext: '登录',
			clicked: false,
		}
		this.loginSubmit = this.loginSubmit.bind(this);
	}
	loginSubmit(e){
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err,values) => {
			if(!err){
				if(!this.state.clicked){
					console.log('登录');
					this.setState({
						logintext: '登录中...',
						clicked: true,
					});
					console.log('Received values of form: ', values);
					axios.get('http://newsapi.gugujiankong.com/Handler.ashx?action='+this.props.action+'&username='+values.username+'&password='+values.password+'&r_userName='+values.r_username+'&r_password='+values.r_password+'&r_confirmPassword='+values.r_confirmpassword).then(res => {
						var logindata = res.data;
						message.success('登陆成功!');
						this.props.form.resetFields();
						this.props.setModalVisible(false);
						this.props.registerHandler(true);
						this.props.setNickName(logindata.NickUserName);
						this.setState({
							logintext: '登录',
							clicked: false,
						});
						Storage.save({
							register: true,
							nickname: logindata.NickUserName,
							userId: logindata.UserId,
						});
						PubSub.publish('STORAGE',{
							register: true,
							nickname: logindata.NickUserName,
							userId: logindata.UserId,
						});
						PubSub.publish('UpdateCollect');
			        }).catch(res => {
			        	message.error('帐号或密码错误!');
			        });
				}	
			}
		})
	}
	render(){
		let {getFieldDecorator} = this.props.form;
		return (
			<Form layout='vertical' id="form1" hideRequiredMark ref={(form1)=>this.form_1 = form1} onSubmit={this.loginSubmit}>
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
				<Button type="primary" htmlType="submit" form="form1" disabled={this.state.clicked}>{this.state.logintext}</Button>
			</Form>
		)
	}
}
const LoginForm = Form.create({})(FormLogin);

export default class MobileHeader extends Component {
	constructor(){
		super();
		this.state = {
			register: Storage.fetch().register || false,
			action: 'login',
			visible: false,
			nickname: Storage.fetch().nickname || '',
		};
		this.setModalVisible = this.setModalVisible.bind(this);
		this.registerHandler = this.registerHandler.bind(this);
		this.setNickName = this.setNickName.bind(this);
		this.changeAction = this.changeAction.bind(this);
		this.logout = this.logout.bind(this);
	}
	componentDidMount(){
		console.log("是否登陆: "+this.state.register);
		console.log("用户昵称: "+this.state.nickname); 
	}
	setModalVisible(value){
		this.setState({
			visible: value
		})
	}
	registerHandler(value){
		this.setState({
			register: value
		})
	}
	setNickName(value){
		this.setState({
			nickname: value
		})
	}
	changeAction(key){
		if(key === '1'){
			console.log('tab-login');
			this.setState({
				action: 'login'
			})
		}else{
			console.log('tab-register');
			this.setState({
				action: 'register'
			})
		}
	}
	logout(){
		this.registerHandler(false);
		this.setNickName('');
		this.setState({
			action: 'login'
		})	
		Storage.save({
			register: false,
			nickname: '',
			userId: 0,
		});
		PubSub.publish('STORAGE', {
			register: false,
			nickname: '',
			userId: 0,
		})
	}
	gotousercenter(e){
		var isLogined = Storage.fetch().register;
		if(!isLogined){
			e.preventDefault();
			window.open('http://localhost:3000/');
		}
	}
	render(){
		var lastMenuItem = this.state.register
		?
		<div>
			<Link to="/usercenter" onClick={this.gotousercenter.bind(this)} style={{marginTop: '-4px',display: 'inline-block'}}>
				<Button type="primary" className="usercenter">个人中心</Button>
			</Link>
			&nbsp;&nbsp;
			<Button type="default" onClick={this.logout}>退出</Button>
		</div>
		:
		<Icon type="setting" onClick={this.setModalVisible.bind(null,true)}/>
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
					visible={this.state.visible}
					title="用户中心"
					onCancel={()=>this.setModalVisible(false)}
					onOk={()=>this.setModalVisible(false)}
					okText="关闭"
					cancelText="取消"
				>
					<Tabs type='card' defaultActiveKey='1' animated={true} onChange={this.changeAction.bind(this)}>
						<TabPane tab="登录" key="1">
							<LoginForm 
								setModalVisible={this.setModalVisible} 
								registerHandler={this.registerHandler}
								setNickName={this.setNickName}
								action={this.state.action}
							/>
						</TabPane>
						<TabPane tab="注册" key="2">
							<RegisterForm action={this.state.action}/>
						</TabPane>
					</Tabs>
				</Modal>
			</header>
		)
	}
}