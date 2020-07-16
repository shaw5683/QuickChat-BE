const Service = require('egg').Service

class UserService extends Service {
  async addUser (userInfo) {
    const existUser = await this.app.mysql.get('user', {
      userName: userInfo.userName
    })
    const { md5 } = require('../../utils/index')
    if (!existUser) {
      const result = await this.app.mysql.insert('user', {
        ...userInfo,
        createTime: new Date(),
        updateTime: new Date(),
        password: md5(userInfo.password)
      })
      return {
        id: result.insertId
      }
    } else {
      return false
    }
  }
  async getUserInfo (key, value) {
    const result = await this.app.mysql.get('user', {
      [key]: value
    })
    if (!result) {
      return false
    }
    return result
  }
  async updateUserInfo (userInfo) {
    const result = await this.app.mysql.update('user', userInfo, {
      where: {
        userId: userInfo.userId
      }
    })
    if (result.affectedRows === 1) {
      return true
    }
  }
}

module.exports = UserService
