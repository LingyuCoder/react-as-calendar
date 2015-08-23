function timeFormat(date, format) {
  if(!date) return '';
  var o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? o[k]
        : ("00" + o[k]).substr(("" + o[k]).length));
  return format;
}

function isDate(v) {
  return Object.prototype.toString.call(v).toLowerCase() === '[object date]';
}

function equal(a, b) {
  a = isDate(a) ? date2obj(a) : a;
  b = isDate(b) ? date2obj(b) : b;
  return (a.year === b.year) && (a.month === b.month) && (a.day === b.day);
}

function obj2date(obj) {
  if(!obj) return null;
  return new Date(`${obj.year}-${obj.month}-${obj.day}`);
}

function date2obj(date) {
  if(!date) return {};
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
}

function toDate(v) {
  if(!v) return null;
  if(typeof v === 'string')
    return new Date(v);
  else if(isDate(v))
    return v;
  else if(v.year && v.month && v.day)
    return obj2date(v);
  else
    return null;
}


export default {
  isDate,
  equal,
  obj2date,
  date2obj,
  toDate,
  timeFormat
};
