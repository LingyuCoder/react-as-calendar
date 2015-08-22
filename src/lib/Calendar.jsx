import React from 'react';
import ReactMixin from 'react-mixin';
import EventMixin from 'react-as-event-mixin';

import DatePicker from './DatePicker';

import {
  getCalendar,
  isDate,
  equal,
  obj2date,
  date2obj,
  toDate,
  inRange,
  timeFormat
} from './util';

class Calendar extends React.Component {
	static propTypes = {
		year: React.PropTypes.number,
		month: React.PropTypes.number,
		value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
		showPanel: React.PropTypes.bool,
		format: React.PropTypes.string,
		blacklist: React.PropTypes.arrayOf(React.PropTypes.object),
		onChange: React.PropTypes.func,
		onPickerShow: React.PropTypes.func,
		onPickerHide: React.PropTypes.func,
		onYearChange: React.PropTypes.func,
		onMonthChange: React.PropTypes.func
	}
	static defaultProps = (function() {
		var today = date2obj(new Date());
		var noop = () => {};
		return {
			value: null,
			format: 'yyyy-MM-dd',
			onChange: noop,
			onPickerShow: noop,
			onPickerHide: noop,
			onYearChange: noop,
			onMonthChange: noop,
			year: null,
			month: null,
			showPanel: false
		};
	} ())
	constructor(props) {
		super();
		var today = date2obj(new Date());
		var value = toDate(props.value);
		var objValue = date2obj(value);
		this.state = {
			showPanel: props.showPanel,
			value: value,
			year: props.year || objValue.year || today.year,
			month: props.month || objValue.month || today.month
		};
		this._handleFocus = this._handleFocus.bind(this);
		this._handleSelect = this._handleSelect.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		var newState = {};
		nextProps.value && (newState.value = toDate(nextProps.value));
		nextProps.year && (newState.year = toDate(nextProps.year));
		nextProps.month && (newState.month = toDate(nextProps.month));
		nextProps.showPanel && (newState.showPanel = toDate(nextProps.showPanel));
		this.setState(newState);
	}
	componentDidMount() {
		var container = React.findDOMNode(this);
		document.body.addEventListener('click', (e) => {
			if(!container.contains(e.target)) {
				this.setState({
					showPanel: false
				});
				this.fireAll('panelHide', this);
			}
		}, false);
	}
	_handleFocus() {
		this.setState({
			showPanel: true
		});
		this.fireAll('panelShow', this);
	}
	_handleSelect(date) {
		this.setState({
			value: date
		});
		this.fireAll('change', date);
	}
	render() {
		return (
			<span className="react-as-calendar">
				<input value={timeFormat(this.state.value, this.props.format)} onFocus={this._handleFocus}></input>
				{
					this.state.showPanel && (
						<div className="panel">

							<DatePicker
								year={this.state.year}
								month={this.state.month}
								blacklist={this.props.blacklist}
								value={this.state.value}
								onChange={this._handleSelect}/>
						</div>
					)
				}
			</span>
		);
	}
}

ReactMixin(Calendar.prototype, EventMixin);

export default Calendar;
