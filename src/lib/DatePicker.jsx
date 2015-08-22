import React from 'react';

import {
  getCalendar,
  isDate,
  equal,
  date2obj,
	toDate,
	inRange
} from './util';

var cache = {};

export default class DatePicker extends React.Component {
  static propTypes = {
		month: React.PropTypes.number,
    year: React.PropTypes.number,
    onChange: React.PropTypes.func,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
		blacklist: React.PropTypes.arrayOf(React.PropTypes.string)
	}
	static defaultProps = {
		month: (new Date()).getMonth() + 1,
    year: (new Date()).getFullYear(),
    onChange: () => {},
		value: new Date(),
		blacklist: []
	}
  constructor(props) {
    super();
		this._blacklist = this._parseBlacklist(props.blacklist);
    this._handleSelect = this._handleSelect.bind(this);
		this._inBlackList = this._inBlackList.bind(this);
  }
	componentWillReceiveProps(nextProps) {
		nextProps.blackList && (this._blacklist = this._parseBlacklist(nextProps.blacklist));
	}
	_parseBlacklist(blacklist) {
		return blacklist.map(item => ({
			from: toDate(item.from),
			to: toDate(item.to)
		}));
	}
  _handleSelect(e) {
    var target = e.target;
    this.props.onChange(toDate({
			year: this.props.year,
			month: this.props.month,
			day: parseInt(target.getAttribute('data-day'))
		}));
  }
	_inBlackList(day) {
		return this._blacklist.reduce((rst, range) => rst || inRange(day, range.from, range.to), false);
	}
  render() {
    var {
      year,
      month
    } = this.props;
    var data = cache[`${year}-${month}`];
		var today = new Date();
		var selected = date2obj(this.props.value);
    !data && (data = cache[`${year}-${month}`] = getCalendar(year, month));

    return (
      <div className="react-as-calendar-datepicker">
        {
					data.map(row => (
						<div className="row">
							{
								row.map(day => {
									if(!day) return <div className="day"></div>
									var obj = {
										year,
										month,
										day
									};
									var disabled = this._inBlackList(obj);
									var className = 'day'
									 	+ (equal(obj, today) ? ' today' : '')
										+ (equal(obj, selected) ? ' selected' : '')
										+ (disabled ? ' disabled' : '');
									return (
										<div data-day={day} onClick={!disabled && this._handleSelect} className={className}>{day}</div>
									);
								})
							}
						</div>
					))
				}
      </div>
    );
  }
}
