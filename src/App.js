import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import PCIndex from './components/pc/pcindex.js';
import MobileIndex from './components/mobile/mobileindex.js';
import {
  logout,
  clickbutton,
} from './actions/index.js';
//import Storage from './assets/js/storage.js';
import './assets/css/reset.css';
import 'antd/dist/antd.css';
import './App.css';  

class Wrap extends Component {
  getChildContext() {
    return {
      register: this.props.register
    }
  }
  render() {
    const { register, Onlogout, Onclickbutton } = this.props;
    console.log("是否登陆(App.js): "+ register);
    return (
      <div className="app">
      	<MediaQuery query="(min-device-width: 1224px)">
      		<PCIndex pageSize="" register={register} Onlogout={Onlogout} Onclickbutton={Onclickbutton}/>
      	</MediaQuery>
      	<MediaQuery query="(max-device-width: 1224px)">
      		<MobileIndex pageSize="small" register={register} Onlogout={Onlogout} Onclickbutton={Onclickbutton}/>
      	</MediaQuery>
	    </div>
    );
  }
}

Wrap.childContextTypes ={
  register: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    register: state.AppReducer.register
  }
}

function mapDispatchToProps (dispatch) {
  return {
    Onlogout: () => dispatch(logout()),
    Onclickbutton: (action,username,password,r_userName,r_password,r_confirmpassword,form) => dispatch(clickbutton(action,username,password,r_userName,r_password,r_confirmpassword,form)),
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Wrap);
export default App;






