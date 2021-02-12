const { v1: uuidv1 } = require('uuid');
const user_col = require('../models/user')
const avatar_col = require('../models/avatar')
const password_col = require('../models/password')
const passport = require('../utils/passport')
const config = require('../../config')
const position_col = require('../models/position')
const log = require('./log_controller')
const formatTime = require('../utils/formatTime')

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
    // 添加日志
    let logs = log.addLog({
      username: user.username,
      text: `${user.username}登录了系统`
    })
    if (logs) {
      ctx.body = {
        code: 1,
        msg: '登录成功',
        data: user
      }
      return
    } else {
      ctx.body = {
        code: 0,
        msg: '登录失败'
      }
    }
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

// 退出系统
const logout = async (ctx) => {
  console.log(ctx.session)
  if (ctx.session) {
    ctx.body = {
      code: 1,
      msg: '退出成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '退出失败'
    }
  }
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
      let logs = log.addLog({
        username: req.username,
        text: `${req.username}修改了密码`
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
  } else { // 匹配失败
    ctx.body = {
      code: 0,
      msg: '原密码输入错误'
    }
  }
}

const uploadAvatar = async (ctx) => {
  // console.log(ctx.request.body)
  let req = ctx.request.body

  const user = await avatar_col.findOne({
    userId: req.userId
  }, {
    _v: 0,
    _id: 0
  })
  console.log(user)

  const result = await avatar_col.updateOne({ userId: req.userId }, { avatar: req.avatar })
  console.log(result)
  if (result.ok == 1) {
    let logs = log.addLog({
      username: req.username,
      text: `${req.username}修改了头像`
    })
    if (logs) {
      ctx.body = {
        code: 1,
        msg: '设置成功'
      }
      return
    } else {
      ctx.body = {
        code: 0,
        msg: '设置失败'
      }
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '设置失败'
    }
  }
}

const addUser = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  // 获取员工号
  let getLatestUser = await user_col.find({}).sort({ 'workNum': -1 }).limit(1)
  // console.log(getLatestUser)
  let workNum = String(Number(getLatestUser[0].workNum) + 1)
  console.log(workNum)

  // 获取权限
  let getPosition = await position_col.find({
    position: req.job
  })
  let getAuth = getPosition[0].auth
  console.log(getAuth)

  // 获取年份
  let getYear = req.brith.slice(0, 4)
  // 获取年龄
  let getAge = formatTime.getDiffYear(getYear)

  // 获取添加时间
  let getAddTime = formatTime.getTime()
  console.log(getAddTime)

  // 获取userId
  let userId = uuidv1()
  console.log(userId)

  // 添加数据到数据库
  let addUserinfo = await user_col.create({
    userId: userId,
    workNum: workNum,
    auth: getAuth,
    username: req.username,
    job: req.job,
    age: getAge,
    sex: req.sex,
    tel: req.tel,
    address: req.address,
    email: req.email,
    idCard: req.idCard,
    brith: req.brith,
    entryData: req.entryData,
    status: req.status,
    leaveData: '',
    remarks: req.remarks,
    addTime: getAddTime,
    addUser: req.addUser,
    leaveTime: '',
    leaveUser: ''
  })
  console.log(addUserinfo)

  if (addUserinfo) {
    // 添加密码
    // 密码加密
    const hash = await passport.encrypt('123abc', config.saltTimes)
    // console.log(hash)
    let addPassword = await password_col.create({
      userId: userId,
      hash: hash
    })
    console.log(addPassword)
    if (addPassword) {
      // 添加头像
      let addAvatar = await avatar_col.create({
        userId: userId,
        avatar: req.avatar
      })
      if (addAvatar) {
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
  } else {
    ctx.body = {
      code: 0,
      msg: '添加失败'
    }
  }
}

const getUserList = async (ctx) => {
  const userinfo = await user_col.find({
    auth: { $ne: 1 }
  })
  // console.log(userinfo)

  if (userinfo) {
    let userList = []
    for (let i = 0; i < userinfo.length; i++) {
      let brith = userinfo[i].brith.slice(0, 4)
      let age = formatTime.getDiffYear(brith)
      if (age !== userinfo[i].age) {
        await user_col.updateOne({
          workNum: userinfo[i].workNum
        }, {
          age: age
        })
      }
      userList.push({
        workNum: userinfo[i].workNum,
        username: userinfo[i].username,
        job: userinfo[i].job,
        age: age,
        sex: userinfo[i].sex,
        tel: userinfo[i].tel,
        idCard: userinfo[i].idCard,
        status: userinfo[i].status
      })
    }
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: userList
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败'
    }
  }
}

const getUserInfo = async (ctx) => {
  let req = ctx.request.body
  console.log(req)

  let userinfo = await user_col.findOne({
    workNum: req.workNum
  })

  let brith = userinfo.brith.slice(0, 4)
  let age = formatTime.getDiffYear(brith)

  if (age !== userinfo.age) {
    await user_col.updateOne({
      workNum: userinfo.workNum
    },
      {
        age: age
      })
    userinfo.age = age
  }

  console.log(userinfo)
  if (userinfo) {
    ctx.body = {
      code: 1,
      msg: '查看成功',
      data: userinfo
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '查看失败，请检查网络'
    }
  }
}

const updatedUserinfo = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  let result = await user_col.updateOne({
    userId: req.userId
  },
    {
      job: req.job,
      tel: req.tel,
      address: req.address,
      email: req.email,
      status: req.status,
      remarks: req.remarks
    })
  console.log(result)
  if (result.ok == 1) {
    let avatarResult = await avatar_col.updateOne({
      userId: req.userId
    },
      {
        avatar: req.avatar
      })
    if (avatarResult.ok == 1) {
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
  } else {
    ctx.body = {
      code: 0,
      msg: '修改失败'
    }
  }
}

const getAvatar = async (ctx) => {
  let req = ctx.request.body

  let result = await avatar_col.findOne({
    userId: req.userId
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

const searchUser = async (ctx) => {
  let req = ctx.request.body
  console.log(req)

  // 模糊查询
  let searchList = await user_col.find({
    workNum: {
      $regex: '.*' + req.workNum,
      $options: 'i'
    },
    username: {
      $regex: '.*' + req.username,
      $options: 'i'
    },
    job: {
      $regex: '.*' + req.job,
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
      msg: '查无此人',
      data: searchList
    }
  }
}

const userUpdateInfo = async (ctx) => {
  let req = ctx.request.body
  console.log(ctx.request.body)
  let updated = await user_col.updateOne({
    userId: req.userId
  },
    {
      tel: req.tel,
      email: req.email,
      address: req.address,
      status: req.status
    })
  console.log(updated)

  if (updated.ok == 1) {
    let logs = log.addLog({
      username: req.username,
      text: `${req.username}修改了个人资料`
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

module.exports = {
  login,
  modifyPwd,
  logout,
  unlock,
  updatePassword,
  uploadAvatar,
  addUser,
  getUserList,
  getUserInfo,
  updatedUserinfo,
  getAvatar,
  searchUser,
  userUpdateInfo
}