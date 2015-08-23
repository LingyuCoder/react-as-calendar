# react-as-calendar

一个React实现的日历输入组件

[DEMO](http://lingyucoder.github.io/react-as-calendar/demo/demo.html)

## 安装

```bash
$ npm install --save react-as-calendar
```

## 使用

```js
import React from 'react';
import Calendar from 'react-as-calendar';

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
  <Calendar {...config}/>,
  document.getElementById('demo')
);

```

## 属性

支持html本身的textarea属性，另外还支持：

```js
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
```

### year (Number)

初始日期选择面板显示年份

默认：当前年份

### month (Number)

初始日期选择面板显示月份

默认：当前月份

### value (String|Date)

日期选择组件初始值

默认：`null`

可以为`2014-5-9`这样的字符串，也可以是Date对象

### showPanel (Boolean)

是否初始时显示日期选择面板

默认：`false`

### format (String)

日期格式化规则

默认：`yyyy-MM-dd`

### blacklist (Array[Object])

黑名单规则列表，为一个数组，其中每项是一个黑名单规则对象，黑名单规则对象如下：

默认：`[]`

```javascript
{
  from: '2014-9-10',
  to: '2015-9-10'
}
```

如上配置，2014年9月10日至2015年9月10日（不含2015年9月10日）将全都不可选择

或者采用Date对象：

```javascript
{
  from: new Date('2014-9-10'),
  to: new Date('2015-9-10')
}
```

从from到to区间的日期将均不可选择（左闭右开区间）

若仅有to值，则to之前所有日期不可选

若仅有from值，则from之后所有日期不可选

### name (String)

输入框name属性

默认：`null`

### placeholder (String)

输入框placeholder属性

默认：`请选择日期`

### autoHidePanel (Boolean)

选择后自动隐藏日期选择面板

默认：`false`

### onChange (Function)

选择的日期变更时回调

### onPanelShow (Function)

日期选择面板显示时回调

### onPanelHide (Function)

日期选择面板隐藏时回调

### onDateChange (Function)

日期选择年或月改变时回调

## 事件

### change

选择的日期变更时触发

### panelShow

日期选择面板显示时触发

### panelHide

日期选择面板隐藏时触发

### dateChange

日期选择年或月改变时触发

## 方法

### string getValue()

获取输入框的值

### setValue(Date|String)

设置日历组件的值

### on(string, function)

绑定事件

### once(string, function)

绑定仅触发一次的事件

### off(string [, function])

解绑事件，如果没提供回调，则解绑该事件下所有回调

### fire(string, [data1, data2...])

触发事件，除第一个参数外，其他参数将作为数据传给事件回调函数

### fireAll(string, [data1, data2...])

触发事件，在执行事件注册的回调函数前，先执行props上的onXXX方法

如`fireAll('change')`将会先执行`this.props.onChange`方法

## 开发

开发：

```bash
$ npm start
$ open http://127.0.0.1:3000/demo/dev.html
```

发布：

```bash
$ npm run pub
```

## 协议

The MIT License (MIT)

Copyright (c) 2015 Lingyu Wang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
