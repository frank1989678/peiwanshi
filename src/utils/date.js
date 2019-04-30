// 获取分钟纬度
export const getScopeMinutes = isNow => {
  let startMinutes = 0;
  let nowMinutes = new Date().getMinutes();
  if (isNow) {
    if (nowMinutes > 45) {
      startMinutes = 15
    } else if (nowMinutes < 15) {
      startMinutes = 30
    } else if (nowMinutes < 30) {
      startMinutes = 45
    }
  }
  let minutesList = [];
  for (let i = startMinutes; i < 60; i++) {
    if (i % 15 === 0) {
      minutesList.push((i < 10 ? '0' : '') + i)
    }
  }
  return minutesList

  // ======(测试逻辑代码，调试接口时删除) Test Debug Data ===_start
  // let startMinutes = isToday ? new Date().getMinutes() : 0;
  // let minutesList = [];
  // for (var i = startMinutes; i < 60; i++) {
  //   minutesList.push((i < 10 ? '0' : '') + i)
  // }
  // return minutesList
  // ====== Test Debug Data ===_end


};

// 获取小时纬度
export const getScopeHours = isNow => {
  let startHours = isNow ? new Date().getHours() : 0;
  let nowMinutes = new Date().getMinutes();
  // 当前小时离下一小时不足半小时，以下一个小时为开始时间小时刻度
  if (isNow && nowMinutes > 30) startHours += 1;
  let hoursList = [];
  for (var i = startHours; i < 24; i++) {
    hoursList.push((i < 10 ? '0' : '') + i)
  }
  return hoursList


  // ======(测试逻辑代码，调试接口时删除) Test Debug Data ===_start
  // let startHours = isToday ? new Date().getHours() : 0;
  // let hoursList = [];
  // for (var i = startHours; i < 24; i++) {
  //   hoursList.push((i < 10 ? '0' : '') + i)
  // }
  // return hoursList
  // ====== Test Debug Data ===_end
};

export const getScopeDay = function (list) {

  let getWeekDay = {1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六', 7: '周日'};

  let str = "";
  let beginIndex = -1;
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    if (i === 0 || list[i] - 1 === list[i - 1]) {
      count++;
      //连续
      if (beginIndex === -1) {
        beginIndex = i;
      }

      //最后一个
      if (i === list.length - 1) {
        //有大于3个连续的
        if (count >= 3) {
          let beginValue = getWeekDay[list[beginIndex]];
          let endValue = getWeekDay[list[beginIndex + count - 1]];
          str += beginValue + "至" + endValue + "、";
        }
        //有少于3个连续的
        else if (count > 0) {
          for (let k = beginIndex; k <= i; k++) {
            let value = getWeekDay[list[k]];
            str += value + "、";
          }
        }
      }
    } else {
      //连续中断
      //有大于3个连续的
      if (count >= 3) {
        let beginValue = getWeekDay[list[beginIndex]];
        let endValue = getWeekDay[list[beginIndex + count - 1]];
        str += beginValue + "至" + endValue + "、";
      }
      //有少于3个连续的
      else if (count > 0) {
        for (let k = beginIndex; k < i; k++) {
          let value = getWeekDay[list[k]];
          str += value + "、";
        }
      }
      beginIndex = i;
      count = 1;

      //最后一个
      if (i === list.length - 1) {
        //有大于3个连续的
        if (count >= 3) {
          let beginValue = getWeekDay[list[beginIndex]];
          let endValue = getWeekDay[list[beginIndex + count - 1]];
          str += beginValue + "至" + endValue + "、";
        }
        //有少于3个连续的
        else if (count > 0) {
          for (let k = beginIndex; k <= i; k++) {
            let value = getWeekDay[list[k]];
            str += value + "、";
          }
        }
      }
    }
  }
  if (str.length > 0)
    str = str.substring(0, str.length - 1);
  return str;
}

// 转换在线时间
export function getOnlineTime(datetime) {
  if (!datetime) {
      return '';
  }
  var t = new Date(datetime.replace(/-/g, '/')),
      s = new Date,
      a = (s - t) / 1e3;
  return 600 > a ? '在线' : 3600 > a ? Math.round(a / 60) + '分钟前' : 86400 > a ? Math.round(a / 3600) + '小时前' : Math.round(a / 86400) + '天前'
}

// 格式化接单时间
export function getFormatReceiveTimeHtml(params) {
  let {orderBeginTime, orderEndTime, weekDays} = params;
  if (weekDays) {
    let hoursTitle = orderBeginTime + '-' + orderEndTime;
    if ((orderBeginTime === '00:00' && orderEndTime === '24:00') || (!orderBeginTime || !orderEndTime)) {
      hoursTitle = '全天'
    }
    let weekTitle = weekDays.length ? getScopeDay(weekDays) : '';
    return  weekTitle + '&ensp;| &ensp;' + hoursTitle + '&ensp;可接单';
  }
  return ''
}