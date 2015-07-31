export default {
  timeFormat: function(date, format) {
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
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  },
  getFirstDay: function(year, month) {
    var firstDay = new Date(year, month - 1, 1);
    return firstDay.getDay();
  },
  getMonthLen: function(year, month) {
    var nextMonth = new Date(year, month, 1);
    nextMonth.setHours(nextMonth.getHours() - 3);
    return nextMonth.getDate();
  },
  getCalendarTable: function(year, month) {
    var self = this;
    var monthLen = self.getMonthLen(year, month);
    var firstDay = self.getFirstDay(year, month);
    var list = [[]];
    var i, cur, row, col;
    for (i = firstDay; i--;) {
      list[0].push('');
    }
    for (i = 1; i <= monthLen; i++) {
      cur = i + firstDay - 1;
      row = Math.floor(cur / 7);
      col = cur % 7;
      list[row] = list[row] || [];
      list[row].push(i);
    }
    var lastRow = list[row];
    for(i = 7 - lastRow.length;i--;) {
      lastRow.push('');
    }
    return list;
  }
};
