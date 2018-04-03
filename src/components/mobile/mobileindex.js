import React, { Component } from 'react';
import { BackTop } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import MobileHeader from './mobileheader';
import MobileBody from './mobilebody';
import MobileFooter from './mobilefooter';
import PropTypes from 'prop-types';
import '../../assets/css/mobile.css';

export default class MobileIndex extends Component {
	getChildContext(){
		return {
			pageSize: this.props.pageSize,
		}
	}
	render(){
		const { register, Onlogout, Onclickbutton } = this.props;
		return (
			<Router>
				<div>
					<MobileHeader register={register} Onlogout={Onlogout} Onclickbutton={Onclickbutton}/>
					<MobileBody />
					<MobileFooter />
					<BackTop />
				</div>
			</Router>
		)
	}
}


MobileIndex.childContextTypes = {
	pageSize: PropTypes.string,
}








