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

module.exports = {
  getTime,
  getDiffYear
}