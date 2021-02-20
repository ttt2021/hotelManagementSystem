const room_col = require('../models/room')
const roomDetail_col = require('../models/roomDetail')
const roomImg_col = require('../models/roomImg')
const order_col = require('../models/order')
const book_col = require('../models/book')
const formatTime = require('../utils/formatTime')
const { v1: uuidv1 } = require('uuid');

const addRoomKind = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  const result = await room_col.findOne({
    kind: req.kind
  })

  if (result) {
    ctx.body = {
      code: 0,
      msg: '该类型已存在'
    }
    return
  }

  // 获取 roomKindId
  let roomKindId = uuidv1()
  console.log(roomKindId)

  // 获取添加时间
  let addTime = formatTime.getNowTime()
  console.log(addTime)

  const roomInfos = await room_col.create({
    roomKindId: roomKindId,
    kind: req.kind,
    price: req.price,
    count: req.count,
    rank: req.rank,
    remark: req.remark,
    userId: req.userId,
    username: req.username,
    addTime: addTime,
    area: req.area,
    bedWidth: req.bedWidth,
    bedStyle: req.bedStyle,
    liveCount: req.liveCount,
    window: req.window,
    floor: req.floor,
    smoking: req.smoking
  })

  if (roomInfos) {
    console.log(roomInfos)
    const addImg = await roomImg_col.create({
      roomKindId: roomKindId,
      img: req.roomImg
    })
    if (addImg) {
      ctx.body = {
        code: 1,
        msg: '添加成功'
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '添加失败'
      }
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '添加失败'
    }
  }
}

const getRoomKind = async (ctx) => {
  let result = await room_col.find()
  console.log(result)
  if (result) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: result
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败'
    }
  }
}

const getKindImg = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let result = await roomImg_col.findOne({
    roomKindId: req.roomImgId
  })

  if (result) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: result
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败'
    }
  }
}

const updatedRoomKind = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let updateKind = await room_col.updateOne({
    roomKindId: req.roomKindId
  }, {
    kind: req.kind,
    price: req.price,
    remark: req.remark,
    count: req.count,
    rank: req.rank,
    area: req.area,
    bedWidth: req.bedWidth,
    bedStyle: req.bedStyle,
    liveCount: req.liveCount,
    window: req.window,
    floor: req.floor,
    smoking: req.smoking
  })
  console.log(updateKind)

  if (updateKind.ok == 1) {
    let updateImg = await roomImg_col.updateOne({
      roomKindId: req.roomKindId
    }, {
      img: req.img
    })
    console.log(updateImg)

    if (updateImg.ok == 1) {
      let result = await room_col.findOne({
        roomKindId: req.roomKindId
      })
      console.log(result)
      ctx.body = {
        code: 1,
        msg: '修改成功',
        data: result
      }
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

const addRoom = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  let result = await roomDetail_col.findOne({
    num: req.num
  })
  if (result) {
    ctx.body = {
      code: 0,
      msg: '该房间已存在'
    }
    return
  }

  // 判断该类房间数量是否超出
  let roomCount = await roomDetail_col.find({
    kind: req.kind
  })
  console.log(roomCount.length)

  let infos = await room_col.findOne({
    kind: req.kind
  })

  if (infos.price > req.price) {
    ctx.body = {
      code: 0,
      msg: '价格低于最低价格，请重新设置'
    }
    return
  }

  if (infos.count < roomCount.length + 1) {
    ctx.body = {
      code: 0,
      msg: '该类房间已满，不可再添加了'
    }
    return
  }

  let addTime = formatTime.getTime()
  let roomId = uuidv1()
  let addInfo = await roomDetail_col.create({
    roomId: roomId,
    num: req.num,
    name: req.name,
    price: req.price,
    region: req.region,
    drinkings: req.drinkings,
    kind: req.kind,
    addUser: req.username,
    addTime: addTime,
    remark: req.remark
  })

  if (addInfo) {
    ctx.body = {
      code: 1,
      msg: '添加成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '添加失败'
    }
  }
}

const getRoomList = async (ctx) => {
  let result = await roomDetail_col.find({}).sort({ 'addTime': -1, 'num': -1 })
  console.log(result)

  if (result.length == 0) {
    ctx.body = {
      code: 0,
      msg: '暂无数据，请添加'
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: result
    }
  }
}

const delRoom = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let removed = await roomDetail_col.remove({
    roomId: req.roomId
  })
  console.log(removed)

  if (removed.ok == 1) {
    ctx.body = {
      code: 1,
      msg: '删除成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '删除失败'
    }
  }
}

const updatedRoom = async (ctx) => {
  console.log("body:", ctx.request.body)
  let req = ctx.request.body
  let num = req.num
  let price = Number(req.price)
  let result = await roomDetail_col.updateOne({
    num: num
  }, {
    name: req.name,
    kind: req.kind,
    price: price,
    region: req.region,
    drinkings: req.drinkings,
    remark: req.remark
  })
  console.log(result)

  if (result.ok == 1) {
    ctx.body = {
      code: 1,
      msg: '修改成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '修改失败'
    }
  }
}

const searchRoom = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  if (req.roomKindId !== '') {
    let kindInfo = await room_col.findOne({
      roomKindId: req.roomKindId
    })
    console.log(kindInfo.kind)
    req.kind = kindInfo.kind
    console.log(req.kind)
  }

  // 模糊查询
  let searchList = await roomDetail_col.find({
    num: {
      $regex: '.*' + req.num,
      $options: 'i'
    },
    name: {
      $regex: '.*' + req.name,
      $options: 'i'
    },
    kind: {
      $regex: '.*' + req.kind,
      $options: 'i'
    },
    region: {
      $regex: '.*' + req.region,
      $options: 'i'
    }
  })
  console.log(searchList)
  if (searchList.length !== 0) {
    ctx.body = {
      code: 1,
      msg: '查询成功',
      data: searchList
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '查无此房间',
      data: searchList
    }
  }
}

const getKindRoom = async (ctx) => {
  let req = ctx.request.body
  console.log(ctx.request.body)
  let kindInfo = await room_col.findOne({
    roomKindId: req.roomKindId
  })
  console.log(kindInfo.kind)
  let result = await roomDetail_col.find({
    kind: kindInfo.kind
  }).sort({ 'addTime': -1, 'num': -1 })
  console.log(result)

  if (result.length == 0) {
    ctx.body = {
      code: 0,
      msg: '暂无数据，请添加'
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: result
    }
  }
}

const getOrderRoom = async (ctx) => {
  let result = await roomDetail_col.find({
    region: '清洁'
  }).sort({ 'addTime': -1, 'num': -1 })
  console.log(result)

  if (result.length == 0) {
    ctx.body = {
      code: 0,
      msg: '客房已满'
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: result
    }
  }
}

const searchOrderRoom = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  // 模糊查询
  let searchList = await roomDetail_col.find({
    num: {
      $regex: '.*' + req.num,
      $options: 'i'
    },
    name: {
      $regex: '.*' + req.name,
      $options: 'i'
    },
    kind: {
      $regex: '.*' + req.kind,
      $options: 'i'
    },
    region: '清洁'
  })
  console.log(searchList)
  if (searchList.length !== 0) {
    ctx.body = {
      code: 1,
      msg: '查询成功',
      data: searchList
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '此类房间已满',
      data: searchList
    }
  }
}

const getRoomInfo = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let result = await roomDetail_col.findOne({
    roomId: req.roomId
  })

  if (result) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: result
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败'
    }
  }
}

const bookRoomInfo = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let orderId = uuidv1()
  console.log(orderId)
  let currentTime = formatTime.getNowTime()
  console.log(currentTime)
  let expectedCheckout = formatTime.getBookTime(req.expectedCheckout)
  console.log(expectedCheckout)

  let days = formatTime.getDays(currentTime, expectedCheckout)
  console.log(days)

  let totalCost = req.price * days + 100 // 单价 * 天数 + 押金
  console.log(totalCost)

  let result = await book_col.create({
    orderId: orderId,
    roomId: req.roomId,
    order1Name: req.order1Name,
    order1Sex: req.order1Sex,
    order1IdCard: req.order1IdCard,
    order2Name: req.order2Name,
    order2Sex: req.order2Sex,
    order2IdCard: req.order2IdCard,
    order3Name: req.order3Name,
    order3Sex: req.order3Sex,
    order3IdCard: req.order3IdCard,
    order4Name: req.order4Name,
    order4Sex: req.order4Sex,
    order4IdCard: req.order4IdCard,
    orderTime: currentTime,
    expectedCheckout: expectedCheckout,
    totalCost: totalCost,
    addUser: req.addUser,
    remark: req.remark
  })

  if (result) {
    let updated = await roomDetail_col.updateOne({
      roomId: req.roomId
    }, {
      region: '有客'
    })
    console.log(updated)
    if (updated.ok == 1) {
      ctx.body = {
        code: 1,
        msg: '订单生成成功'
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '订单生成失败'
      }
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '生成失败'
    }
  }
}

const getBookList = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let result = await book_col.find({
    addUser: req.addUser
  }).lean()
  console.log(result)
  if (result) {
    for (let i = 0; i < result.length; i++) {
      let roomInfo = await roomDetail_col.findOne({
        roomId: result[i].roomId
      })
      result[i].roomInfo = roomInfo
    }
    console.log(result)
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: result
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '暂无订单'
    }
  }
}

const cancelBook = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let del = await book_col.remove({
    orderId: req.orderId
  })

  if (del) {
    let result = await roomDetail_col.updateOne({
      roomId: req.roomId
    }, {
      region: '清洁'
    })
    console.log(result)
    if (result.ok == 1) {
      ctx.body = {
        code: 1,
        msg: '取消成功'
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '取消失败'
      }
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '取消失败'
    }
  }
}

const getBookInfo = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let result = await book_col.findOne({
    orderId: req.orderId
  }).lean()
  console.log(result)

  if (result) {
    let roomInfo = await roomDetail_col.findOne({
      roomId: result.roomId
    })
    console.log(roomInfo)
    result.roomInfo = roomInfo
    console.log(result)
    ctx.body = {
      code: 1,
      msg: '获取信息成功',
      data: result
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取信息失败'
    }
  }
}

const updatedBookInfo = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let expectedCheckout = formatTime.getBookTime(req.expectedCheckout)
  console.log(expectedCheckout)

  let days = formatTime.getDays(req.orderTime, expectedCheckout)
  console.log(days)

  let totalCost = req.price * days + 100
  console.log(totalCost)

  let result = await book_col.updateOne({
    orderId: req.orderId
  }, {
    order1Name: req.order1Name,
    order1Sex: req.order1Sex,
    order1IdCard: req.order1IdCard,
    order2Name: req.order2Name,
    order2Sex: req.order2Sex,
    order2IdCard: req.order2IdCard,
    order3Name: req.order3Name,
    order3Sex: req.order3Sex,
    order3IdCard: req.order3IdCard,
    order4Name: req.order4Name,
    order4Sex: req.order4Sex,
    order4IdCard: req.order4IdCard,
    expectedCheckout: expectedCheckout,
    totalCost: totalCost,
    remark: req.remark
  })
  console.log(result)
  if (result.ok == 1) {
    ctx.body = {
      code: 1,
      msg: '修改成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '修改失败'
    }
  }
}

const orderRoom = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  for (let i = 0; i < req.orderList.length; i++) {
    console.log(req.orderList[i])
    // 查找订单信息
    let info = await book_col.findOne({
      orderId: req.orderList[i]
    })
    console.log(info)
    // 再将订单信息存入order表中
    if (info) {
      let add = await order_col.create({
        orderId: info.orderId,
        roomId: info.roomId,
        order1Name: info.order1Name,
        order1Sex: info.order1Sex,
        order1IdCard: info.order1IdCard,
        order2Name: info.order2Name,
        order2Sex: info.order2Sex,
        order2IdCard: info.order2IdCard,
        order3Name: info.order3Name,
        order3Sex: info.order3Sex,
        order3IdCard: info.order3IdCard,
        order4Name: info.order4Name,
        order4Sex: info.order4Sex,
        order4IdCard: info.order4IdCard,
        orderTime: info.orderTime,
        expectedCheckout: info.expectedCheckout,
        totalCost: info.totalCost,
        addUser: info.addUser,
        remark: info.remark
      })
      console.log(add)
      if (add) {
        // 移除book表中的订单信息
        let removed = await book_col.remove({
          orderId: req.orderList[i]
        })
        console.log(removed)
        if (removed.ok == 1) {
          ctx.body = {
            code: 1,
            msg: '结算成功'
          }
        } else {
          ctx.body = {
            code: 0,
            msg: '结算失败'
          }
        }
      } else {
        ctx.body = {
          code: 0,
          msg: '结算失败'
        }
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '结算失败'
      }
    }
  }

  // let result = await order_col.create({
  //   orderId: orderId,
  //   roomId: req.num,
  //   orderName: req.orderName,
  //   orderSex: req.orderSex,
  //   orderIdCard: req.orderIdCard,
  //   orderTime: time,
  //   addUser: req.addUser,
  //   remark: req.remark
  // })

  // if (result) {
  //   ctx.body = {
  //     code: 1,
  //     msg: '开房成功'
  //   }
  // } else {
  //   ctx.body = {
  //     code: 0,
  //     msg: '开房失败'
  //   }
  // }
}

module.exports = {
  addRoomKind,
  getRoomKind,
  getKindImg,
  updatedRoomKind,
  addRoom,
  getRoomList,
  delRoom,
  updatedRoom,
  searchRoom,
  getKindRoom,
  getOrderRoom,
  searchOrderRoom,
  orderRoom,
  getRoomInfo,
  bookRoomInfo,
  getBookList,
  cancelBook,
  getBookInfo,
  updatedBookInfo
}