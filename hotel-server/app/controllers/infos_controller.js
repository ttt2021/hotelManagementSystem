const log_col = require('../models/log')
const user_col = require('../models/user')
const order_col = require('../models/order')
const room_col = require('../models/room')
const hotel_col = require('../models/hotel')
const article_col = require('../models/article')
const historyOrder_col = require('../models/historyOrder')
const roomDetail_col = require('../models/roomDetail')
const formatTime = require('../utils/formatTime')

const getDataInfo = async (ctx) => {
  let req = ctx.request.body
  console.log(req)
  let current = formatTime.getTime()
  console.log(current)

  // 员工数量
  let userList = await user_col.find()
  let totalUser = userList.length - 1 // 总数
  console.log(totalUser)
  let addUserList = await user_col.find({
    addTime: {
      $regex: '.*' + current,
      $options: 'i'
    },
  })
  let addUser = addUserList.length // 新增
  console.log(addUser)

  // 客房数量
  let roomList = await roomDetail_col.find()
  let totalRoom = roomList.length // 总数
  console.log(totalRoom)
  let addRoomList = await roomDetail_col.find({
    addTime: {
      $regex: '.*' + current,
      $options: 'i'
    }
  })
  let addRoom = addRoomList.length // 新增
  console.log(addRoom) 

  // 订单
  let orderList = await order_col.find()
  let historyOrderList = await historyOrder_col.find()
  let totalOrder = orderList.length + historyOrderList.length // 总数
  console.log(totalOrder)
  let addOrderList = await order_col.find({
    orderTime: {
      $regex: '.*' + current,
      $options: 'i'
    }
  })
  let addHistoryOrderList = await historyOrder_col.find({
    orderTime: {
      $regex: '.*' + current,
      $options: 'i'
    }
  })
  let addOrder = addOrderList.length + addHistoryOrderList.length // 今日新增
  console.log(addOrder)

  // 收入
  let totalPrice = 0 // 总收益
  let totalPeople = 0
  for (let i = 0; i < orderList.length; i++) {
    totalPrice = totalPrice + orderList[i].totalCost - 100
    if (orderList[i].order1Name !== '') {
      totalPeople = totalPeople + 1
    }
    if (orderList[i].order2Name !== '') {
      totalPeople = totalPeople + 1
    }
    if (orderList[i].order3Name !== '') {
      totalPeople = totalPeople + 1
    }
    if (orderList[i].order4Name !== '') {
      totalPeople = totalPeople + 1
    }
  }
  for (let i = 0; i < historyOrderList.length; i++) {
    totalPrice = totalPrice + historyOrderList[i].totalCost
  }
  console.log(totalPrice, totalPeople) 
  let addPrice = 0 // 今日盈利
  let todayPrice = 0 // 今日收入
  for (let i = 0; i < addOrderList.length; i++) {
    addPrice = addPrice + addOrderList[i].totalCost - 100
    todayPrice = todayPrice + addOrderList[i].totalCost
  }
  for (let i = 0; i < addHistoryOrderList.length; i++) {
    addPrice = addPrice + addHistoryOrderList[i].totalCost
    todayPrice = todayPrice + addHistoryOrderList[i].totalCost
  }
  console.log(addPrice, todayPrice)

  // 剩余房间
  let restRoomList = await roomDetail_col.find({
    region: '清洁'
  })
  let restRoom = restRoomList.length
  console.log(restRoom)

  // 最近登录
  let lastLoginList = await log_col.find({
    username: req.username
  })
  let lastLogin = lastLoginList[lastLoginList.length - 1].logTime
  console.log(lastLogin)
  let loginCount = lastLoginList.length
  console.log(loginCount)

  // 获取资讯篇数
  let articleList = await article_col.find({
    status: '已发表'
  })
  let totalArticle = articleList.length
  console.log(totalArticle)
  let totalViews = 0
  for (let i = 0; i < articleList.length; i++) {
    totalViews = totalViews + Number(articleList[i].viewCount)
  }
  console.log(totalViews)

  ctx.body = {
    data: {
      totalUser: totalUser,
      addUser: addUser,
      totalRoom: totalRoom,
      addRoom: addRoom,
      totalOrder: totalOrder,
      addOrder: addOrder,
      totalPrice: totalPrice,
      todayPrice: todayPrice,
      addPrice: addPrice,
      restRoom: restRoom,
      lastLogin: lastLogin,
      totalPeople: totalPeople,
      loginCount: loginCount,
      totalArticle: totalArticle,
      totalViews: totalViews
    }
  }
}

const getRestRoom = async (ctx) => {
  let roomList = await room_col.find()
  console.log(roomList)
  // 获取房间类型
  let roomInfo = []
  for (let i = 0; i < roomList.length; i++) {
    roomInfo[i] = {
      name: roomList[i].kind,
      totalCount: 0,
      restCount: 0
    }
  }
  let roomsList = await roomDetail_col.find()
  for (let i = 0; i < roomsList.length; i++) {
    for (let j = 0; j < roomInfo.length; j++) {
      if (roomsList[i].kind === roomInfo[j].name) {
        roomInfo[j].totalCount = roomInfo[j].totalCount + 1
        if (roomsList[i].region === '清洁') {
          roomInfo[j].restCount = roomInfo[j].restCount + 1
        }
      }
    }
  }
  console.log(roomInfo)
  ctx.body = {
    data: roomInfo
  }
}

const latestOrderList = async (ctx) => {
  let orderList = await order_col.find().sort({
    _id: -1
  }).limit(12).lean()
  console.log(orderList)
  for (let i = 0; i < orderList.length; i++) {
    let roomInfo = await roomDetail_col.findOne({
      roomId: orderList[i].roomId
    })
    orderList[i].num = roomInfo.num
  }
  console.log(orderList)
  ctx.body = {
    data: orderList
  }
}

const latestOrdeUserList = async (ctx) => {
  let userList = await user_col.find().sort({
    _id: -1
  }).limit(10)
  console.log(userList)
  ctx.body = {
    data: userList
  }
}

const getImgList = async (ctx) => {
  let imgList = await hotel_col.findOne()
  console.log(imgList)
  ctx.body = {
    data: imgList.fileList
  }
}

module.exports = {
  getDataInfo,
  getRestRoom,
  latestOrderList,
  latestOrdeUserList,
  getImgList
}