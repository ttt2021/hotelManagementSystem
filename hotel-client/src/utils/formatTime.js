const getTime = () => {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }

  if (day >= 0 && day <= 9) {
    day = `0${day}`
  }

  const currentDate = `${year}-${month}-${day}`
  return currentDate
}

const getDiffYear = (brithYear) => {
  let date = new Date()
  let year = date.getFullYear()
  let diff = year - brithYear + 1
  return diff
}

const getNowTime = () => {
  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let day = now.getDate()
  let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
  let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
  let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }
  if (day >= 0 && day <= 9) {
    day = `0${day}`
  }
  const date = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  return date
}

const getBookTime = (time) => {
  let now = new Date(time)
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let day = now.getDate()
  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }
  if (day >= 0 && day <= 9) {
    day = `0${day}`
  }

  let dateTime = new Date()
  let hour = dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()
  let minute = dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes()
  let second = dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds()
  const date = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  return date
}

const getDays = (start, end) => {
  let dt1 = Date.parse(start.replace(/-/g, '/'))
  let day1 = new Date(dt1)

  let dt2 = Date.parse(end.replace(/-/g, '/'))
  let day2 = new Date(dt2)

  let date = day2.getTime() - day1.getTime() // 时间相差毫秒数
  return Math.ceil(date / (24 * 3600 * 1000))
}

const getAfterDays = (days) => {
  let now = new Date()
  now.setDate(now.getDate() + days)
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let day = now.getDate()
  let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
  let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
  let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }
  if (day >= 0 && day <= 9) {
    day = `0${day}`
  }
  const date = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  return date
}

const getSearchTime = (time) => {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }

  if (day >= 0 && day <= 9) {
    day = `0${day}`
  }

  const currentDate = `${year}-${month}-${day}`
  return currentDate
}

const getYesDate = (num) => {
  let date = new Date()
  date.setDate(date.getDate() + num)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }

  if (day >= 0 && day <= 9) {
    day = `0${day}`
  }

  const currentDate = `${year}-${month}-${day}`
  return currentDate
}

const getCurrentMonth = () => {
  // 获取上个月最后一天
  let firstDate = new Date();
  let year = firstDate.getFullYear().toString();
  let month = (firstDate.getMonth()).toString();
  let temp = new Date(year, month, 0);
  day = (temp.getDate()).toString();
  if (month.length == 1) month = "0" + month;
  if (day.length == 1) day = "0" + day;
  firstDate = year + "-" + month + "-" + day;

  // 获取下个月第一天
  let now = new Date()
  let currentMonth = now.getMonth()
  let nextMonth = ++currentMonth
  let nextMonthFirstDay = new Date(now.getFullYear(), nextMonth, 1)
  // let oneDay = 1000 * 60 * 60 * 24
  let lastDate = new Date(nextMonthFirstDay)
  lastDate = getSearchTime(lastDate)

  let date = [firstDate, lastDate]
  return date
}

const getDayCount = (time) => {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let d = new Date(year, month, 0);
  return d.getDate();
}

const getMonthFirstDay = () => {
  // 当月第一天
  let firstDate = new Date()
  firstDate.setDate(1)
  firstDate = getSearchTime(firstDate)
  return firstDate
}

// 上上个月的最后一天 
const getLastDay = (days) => {
  let nowdays = new Date();
  let year = nowdays.getFullYear();
  let month = nowdays.getMonth();
  if(month==0)
  {
      month=12;
      year=year-1;
  }
  if (month < 10) {
      month = "0" + month;
  }
  let firstDayOfPreMonth = year + "-" + month + "-" + "01";//上个月的第一天

  let dt1 = Date.parse(firstDayOfPreMonth.replace(/-/g, '/'))
  let now = new Date(dt1)
  now.setDate(now.getDate() + days)
  year = now.getFullYear()
  month = now.getMonth() + 1
  let day = now.getDate()
  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }
  if (day >= 0 && day <= 9) {
    day = `0${day}`
  }
  const date = `${year}-${month}-${day}`
  return date
}

const getLastMonth = (days) => {
  let nowdays = new Date();
  let year = nowdays.getFullYear();
  let month = nowdays.getMonth();
  if(month==0)
  {
      month=12;
      year=year-1;
  }
  if (month < 10) {
      month = "0" + month;
  }
  let firstDayOfPreMonth = year + "-" + month
  return firstDayOfPreMonth
}

module.exports = {
  getTime,
  getDiffYear,
  getNowTime,
  getBookTime,
  getDays,
  getAfterDays,
  getSearchTime,
  getYesDate,
  getCurrentMonth,
  getDayCount,
  getMonthFirstDay,
  getLastDay,
  getLastMonth
}