import React from 'react';

import DatePicker from './DatePicker';

import {
	timeFormat
} from './util';

export default class Calendar extends React.Component {
	static propTypes = {
		value: React.PropTypes.object,
		format: React.PropTypes.string,
		onChange: React.PropTypes.func
	},
	static defaultProps = {
		value: null,
		format: 'yyyy-MM-dd',
		onChange: () => {}
	},
	constructor() {
		super();
		this.state = {
			focus: false,
			value: null
		};
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handlePickerSelect = this.handlePickerSelect.bind(this);
	}
	handleFocus() {
		this.setState({
			focus: true
		});
	}
	handleBlur() {
		this.setState({
			focus: false
		});
	}
	handlePickerSelect(year, month, day) {
		this.setState({
			focus: false,
			value: new Date(year, month - 1, day)
		});
	}
	render() {
		return (
			<span className="react-as-calendar">
				<input value={this.state.value} onBlur={this.handleBlur} onFocus={this.handleFocus}></input>
				{
					this.state.focus ? <DatePicker year={} onSelect={this.handlePickerSelect}/> : ''
				}
			</span>
		);
	}
}
