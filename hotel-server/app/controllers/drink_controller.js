const drink_col = require('../models/drink')
const checkOut_col = require('../models/checkOut')
const formatTime = require('../utils/formatTime')
const roomDetail_col = require('../models/roomDetail')
const { v1: uuidv1 } = require('uuid');

const addDrinking = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  let find = await drink_col.findOne({
    name: req.name
  })
  console.log(find)
  if (find) {
    ctx.body = {
      code: 0,
      msg: '已存在'
    }
    return
  }
  let drinkId = uuidv1()
  let time = formatTime.getNowTime()

  let result = await drink_col.create({
    drinkId: drinkId,
    name: req.name,
    price: req.price,
    addUser: req.addUser,
    addTime: time
  })
  console.log(result)

  if (result) {
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

const getDrinkList = async (ctx) => {
  let result = await drink_col.find()
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

const updateDrink = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let updated = await drink_col.updateOne({
    drinkId: req.drinkId
  }, {
    price: req.price
  })
  console.log(updated)

  if (updated.ok == 1) {
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

const delDrink = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  // 修改房间酒水
  let list = await roomDetail_col.find()
  console.log(list)

  for (let i = 0; i < list.length; i++) {
    list[i].drinkings = list[i].drinkings.filter((value) => {
      return value != req.name
    })
    let updated = await roomDetail_col.updateOne({
      roomId: list[i].roomId
    }, {
      drinkings: list[i].drinkings
    })
    console.log(updated)
  }
  console.log(list)

  let del = await drink_col.remove({
    drinkId: req.drinkId
  })
  console.log(del)

  if (del) {
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

const checkDrinkList = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let list = []
  for (let i = 0; i < req.drinks.length; i++) {
    let drinkInfo = await drink_col.findOne({
      name: req.drinks[i]
    })
    console.log(drinkInfo)
    list.push({
      name: req.drinks[i],
      price: drinkInfo.price,
      count: 0
    })
  }
  console.log(list)
  if (list.length !== 0) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: list
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '房间无酒水'
    }
  }
}

const updateDrinkList = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let orderInfo = await checkOut_col.findOne({
    orderId: req.orderId
  })
  console.log(orderInfo)
  let list = []
  for (let i = 0; i < req.drinks.length; i++) {
    let drinkInfo = await drink_col.findOne({
      name: req.drinks[i]
    })
    console.log(drinkInfo)
    for (let j = 0; j < orderInfo.drinkings.length; j++) {
      if (drinkInfo.name == orderInfo.drinkings[j].name) {
        list.push({
          name: req.drinks[i],
          price: drinkInfo.price,
          count: Number(orderInfo.drinkings[j].count)
        })
        orderInfo.drinkings.splice(j, 1)
        break
      }
    }
    // console.log(list.length, i)
    if (list.length - 1 !== i) {
      list.push({
        name: req.drinks[i],
        price: drinkInfo.price,
        count: 0
      })
    }
  }
  console.log(list)
  if (list.length !== 0) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: list
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '房间无酒水'
    }
  }
}

module.exports = {
  addDrinking,
  getDrinkList,
  updateDrink,
  delDrink,
  checkDrinkList,
  updateDrinkList
}