import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'

import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');


let page=(
  <div>
      <App/>
  </div>
)

ReactDOM.render(page,document.getElementById('root'));
