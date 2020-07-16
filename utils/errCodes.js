module.exports = {
  COMMON: {
    PARAM_ERR: {
      code: '1001',
      msg: '参数错误'
    },
    NOT_LOGIN: {
      code: '1002',
      msg: '未登录'
    }
  },
  // USER
  USER: {
    USER_EXISTED: {
      code: '2001',
      msg: '用户名已存在'
    },
    WRONG_LOGIN_PARAM: {
      code: '2002',
      msg: '用户名或密码错误'
    },
    UPDATE_ERR: {
      code: '2003',
      msg: '更新用户信息失败'
    }
  }
}
