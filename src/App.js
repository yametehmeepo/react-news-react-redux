import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import PCIndex from './components/pc/pcindex.js';
import MobileIndex from './components/mobile/mobileindex.js';
//import Storage from './assets/js/storage.js';
import './assets/css/reset.css';
import 'antd/dist/antd.css';
import './App.css';  

class App extends Component {
  /*getChildContext(){
    return {
      isLogined: Storage.fetch().register || false,
      nickname: Storage.fetch().nickname || '',
      userId: Storage.fetch().userId || 0,
    }
  }*/
  render() {
    return (
      <div className="app">
      	<MediaQuery query="(min-device-width: 1224px)">
      		<PCIndex pageSize=""/>
      	</MediaQuery>
      	<MediaQuery query="(max-device-width: 1224px)">
      		<MobileIndex pageSize="small"/>
      	</MediaQuery>
	    </div>
    );
  }
}

export default App;

/*App.childContextTypes = {
  isLogined: PropTypes.bool,
  nickname: PropTypes.string,
  userId: PropTypes.number,
}*/




