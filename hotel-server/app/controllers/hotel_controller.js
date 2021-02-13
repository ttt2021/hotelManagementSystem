const log = require('./log_controller')
const hotel_col = require('../models/hotel')
const formatTime = require('../utils/formatTime')

const updateHotelInfos = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  let currentTime = formatTime.getNowTime()
  let result = await hotel_col.findOne({
    name: req.name
  })
  console.log(result)
  if (result === null) {
    let data = await hotel_col.create({
      username: req.username,
      updateTime: currentTime,
      profile: req.profile,
      tel: req.tel,
      catering: req.catering,
      name: req.name,
      address: req.address,
      pet: req.pet,
      receive: req.receive,
      fileList: req.fileList,
      roomSetting: req.roomSetting,
      certificate: req.certificate,
      entertainment: req.entertainment,
      payment: req.payment,
      frontDesk: req.frontDesk,
      room: req.room,
      base: req.base,
      transport: req.transport,
      business: req.business
    })
    // console.log(data)
    if (data) {
      let logs = log.addLog({
        username: req.username,
        text: `${req.username}修改了酒店信息`
      })
      if (logs) {
        ctx.body = {
          code: 1,
          msg: '修改成功'
        }
        return
      } else {
        ctx.body = {
          code: 0,
          msg: '修改失败'
        }
      }
    }
  } else {
    let data = await hotel_col.updateOne({
      username: req.username,
      updateTime: currentTime,
      profile: req.profile,
      tel: req.tel,
      catering: req.catering,
      name: req.name,
      address: req.address,
      pet: req.pet,
      receive: req.receive,
      fileList: req.fileList,
      roomSetting: req.roomSetting,
      certificate: req.certificate,
      entertainment: req.entertainment,
      payment: req.payment,
      frontDesk: req.frontDesk,
      room: req.room,
      base: req.base,
      transport: req.transport,
      business: req.business
    })
    // console.log(data)
    if (data.ok == 1) {
      let logs = log.addLog({
        username: req.username,
        text: `${req.username}修改了酒店信息`
      })
      if (logs) {
        ctx.body = {
          code: 1,
          msg: '修改成功'
        }
        return
      } else {
        ctx.body = {
          code: 0,
          msg: '修改失败'
        }
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '修改失败'
      }
    }
  }
}

const getHotelInfo = async (ctx) => {
  let result = await hotel_col.find()
  if (result) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: result
    } 
    return
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败'
    }
  }
}

module.exports = {
  updateHotelInfos,
  getHotelInfo
}