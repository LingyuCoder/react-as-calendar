import React from 'react';
import ReactMixin from 'react-mixin';
import EventMixin from 'react-as-event-mixin';

import DatePicker from 'react-as-datepicker';

import {
  date2obj,
  toDate,
  timeFormat
} from './util';

var noop = () => {};

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
		name: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		autoHidePanel: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		onPanelShow: React.PropTypes.func,
		onPanelHide: React.PropTypes.func,
		onDateChange: React.PropTypes.func
	}
	static defaultProps = {
		value: null,
		format: 'yyyy-MM-dd',
		onChange: noop,
		onDateChange: noop,
		onPanelShow: noop,
		onPanelHide: noop,
		year: null,
		month: null,
		showPanel: false,
		name: null,
		placeholder: '请选择日期',
		autoHidePanel: true
	}
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
		this._handleDateChange = this._handleDateChange.bind(this);
    this._handleIptKeyDown = this._handleIptKeyDown.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		var newState = {};
		nextProps.value && (newState.value = toDate(nextProps.value));
		nextProps.year && (newState.year = toDate(nextProps.year));
		nextProps.month && (newState.month = toDate(nextProps.month));
		nextProps.showPanel && (newState.showPanel = toDate(nextProps.showPanel));
		this.setState(newState);
	}
	getValue() {
		return timeFormat(this.state.value, this.props.format);
	}
	setValue(val) {
		this.setState({
			value: toDate(val)
		});
    return this;
	}
  componentDidMount() {
    var container = React.findDOMNode(this);
    document.body.addEventListener('click', (this._gcb = (e) => {
      if(!container.contains(e.target)) {
        this.setState({
          showPanel: false
        });
        this.fireAll('panelHide', this);
      }
    }), false);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this._gcb);
  }
	_handleFocus() {
    if(this.state.showPanel) return;
		this.setState({
			showPanel: true
		});
		this.fireAll('panelShow', this);
	}
	_handleSelect(date) {
		var state = {
			value: date
		};
		this.props.autoHidePanel && (state.showPanel = false);
		this.setState(state);
		this.fireAll('change', date);
		this.props.autoHidePanel && this.fireAll('panelHide', this);
	}
	_handleDateChange(year, month) {
		this.setState({
			year: year,
			month: month
		});
		this.fireAll('dateChange', year, month);
	}
  _handleIptKeyDown(e) {
    e.which === 8 && this.setState({
      value: null
    });
  }
	render() {
		return (
			<span className="react-as-calendar">
				<input className="react-as-calendar-ipt" onKeyDown={this._handleIptKeyDown} placeholder={this.props.placeholder} name={this.props.name} value={timeFormat(this.state.value, this.props.format)} onFocus={this._handleFocus}></input>
				{
					this.state.showPanel && (
						<div className="panel">
							<DatePicker
								year={this.state.year}
								month={this.state.month}
								blacklist={this.props.blacklist}
								value={this.state.value}
								onChange={this._handleSelect}
								onDateChange={this._handleDateChange}/>
						</div>
					)
				}
			</span>
		);
	}
}

ReactMixin(Calendar.prototype, EventMixin);

export default Calendar;
