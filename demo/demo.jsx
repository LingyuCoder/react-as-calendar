import React from 'react';
import Component from '../src/index';

var config = {
  showPanel: true,
  value: '2014-9-30',
  autoHidePanel: false,
  placeholder: '日期选择',
  format: 'yyyy/MM/dd',
  year: 2014,
  month: 9,
  onPanelShow: function() {
    console.log('show');
  },
  onPanelHide: function() {
    console.log('hide');
  },
  onChange: function(date) {
    console.log(date);
  },
  onDateChange: function(year, month) {
    console.log(`${year} - ${month}`);
  }
};

React.render(
  <Component {...config}/>,
  document.getElementById('demo')
);
