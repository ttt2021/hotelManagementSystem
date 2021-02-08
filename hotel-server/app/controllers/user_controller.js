const { v1: uuidv1 } = require('uuid');
const user_col = require('../models/user')
const password_col = require('../models/password')
const passport = require('../utils/passport')
const config = require('../../config')

// 登录
const login = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  // 连接数据库，去数据库中查找是否存在该条数据
  // 查找语句
  // 获取用户的userId
  const user = await user_col.findOne({
    workNum: req.workNum
  }, {
    _v: 0,
    _id: 0
  })
  console.log(user)
  if (!user) {
    // 账号不存在
    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '账号不存在'
    }
    return
  }

  // 能找到该账号
  const userId = user.userId

  // 查询密码
  const passwd = await password_col.findOne({
    userId
  }, {
    hash: 1
  })
  console.log(passwd)

  // 如果在密码表中找到了账号相同的id
  // 判断该id对应的密码和前端传过来的密码是否匹配
  // 密码表中的密码需解密

  // 解密 返回比较结果的boolean值
  const match = await passport.validate(req.password, passwd.hash)
  // console.log(match)
  if (match) { // 匹配成功
    ctx.body = {
      code: 1,
      msg: '登录成功',
      data: user
    }
    return
  } else { // 匹配失败
    ctx.body = {
      code: 0,
      msg: '密码错误'
    }
  }
}

// 修改密码
const modifyPwd = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  // 连接数据库，去数据库中查找是否存在该条数据
  // 查找语句
  // 获取用户的userId
  const user = await user_col.findOne({
    workNum: req.workNum
  }, {
    _v: 0,
    _id: 0
  })
  console.log(user)
  if (!user) {
    // 账号不存在
    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '账号不存在'
    }
    return
  }

  // 能找到该账号
  const userId = user.userId
  // 密码加密
  const hash = await passport.encrypt(req.password, config.saltTimes)
  // 修改密码
  const result = await password_col.updateOne({ userId }, { hash })
  console.log(result)
  if (result) {
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

// 退出系统
const logout = async (ctx) => {
  // 日志后再做
  console.log(ctx.request)
}

// 解锁
const unlock = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  // 获取到用户userId
  let userId = req.userId

  // 查询密码
  const passwd = await password_col.findOne({
    userId
  }, {
    hash: 1
  })
  console.log(passwd)
  // 匹配密码是否一致
  const match = await passport.validate(req.password, passwd.hash)
  console.log(match)
  if (match) { // 匹配成功
    ctx.body = {
      code: 1,
      msg: '欢迎登录'
    }
    return
  } else { // 匹配失败
    ctx.body = {
      code: 0,
      msg: '密码错误'
    }
  }
}

// 修改密码
const updatePassword = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  let userId = req.userId

  // 查询旧密码
  const passwd = await password_col.findOne({
    userId
  }, {
    hash: 1
  })
  console.log(passwd)
  // 匹配旧密码是否一致
  const match = await passport.validate(req.oldPassword, passwd.hash)
  console.log(match)
  if (match) { // 匹配成功
    // 密码加密
    const hash = await passport.encrypt(req.newPassword, config.saltTimes)
    // 修改密码
    const result = await password_col.updateOne({ userId }, { hash })
    console.log(result)
    if (result) {
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
  } else { // 匹配失败
    ctx.body = {
      code: 0,
      msg: '原密码输入错误'
    }
  }
}

const uploadAvatar = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  const user = await user_col.findOne({
    userId: req.userId
  }, {
    _v: 0,
    _id: 0
  })
  console.log(user)

  const result = await user_col.updateOne({ userId: req.userId }, { avatar: req.avatar })
  if (result) {
    ctx.body = {
      code: 1,
      msg: '设置成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '设置失败'
    }
  }
}

module.exports = {
  login,
  modifyPwd,
  logout,
  unlock,
  updatePassword,
  uploadAvatar
}