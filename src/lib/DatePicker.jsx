import React from 'react';

import {
  getFirstDay,
  getMonthLen,
  getCalendarTable
} from './util';

export default class DatePicker extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <div className="react-as-calendar-datepicker">

      </div>
    );
  }
}
