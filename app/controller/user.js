
const Controller = require('egg').Controller;
const { USER: userCode, COMMON: commonCode } = require('../../utils/errCodes')
const { md5 } = require('../../utils/index')

class UserController extends Controller {
  async signIn () {
    const { ctx, service } = this;
    const result = await service.user.addUser(ctx.helper.escapeDeep(ctx.request.body))
    if (result === false) {
      ctx.helper.fail(ctx, userCode.USER_EXISTED)
      return
    }
    ctx.helper.success(ctx, {})
  }
  async login () {
    const { ctx, service } = this
    const { userName, password } = ctx.request.body
    if (!userName || !password) {
      ctx.helper.fail(ctx, commonCode.PARAM_ERR)
      return
    }
    const userInfo = await service.user.getUserInfo('userName', userName)
    if (!userInfo || md5(password) !== userInfo.password) {
      ctx.helper.fail(ctx, userCode.WRONG_LOGIN_PARAM)
      return
    }
    ctx.session.userInfo = userInfo
    ctx.helper.success(ctx, {})
  }
  async logout () {
    const { ctx } = this
    if (ctx.session.userInfo) {
      delete ctx.session.userInfo
    }
    ctx.helper.success(ctx, {})
  }
  async updatePassword () {
    const { ctx, service } = this
    const { password = '', newPassword = '' } = ctx.request.body
    const userInfo = ctx.session.userInfo
    if (!password || !newPassword || md5(password) !== userInfo.password) {
      ctx.helper.fail(ctx, commonCode.PARAM_ERR)
      return
    }
    const res = await service.user.updateUserInfo({
      userId: userInfo.userId,
      password: md5(newPassword)
    })
    if (res) {
      ctx.session.userInfo = await service.user.getUserInfo('userId', userInfo.userId)
      ctx.helper.success(ctx, {})
    } else {
      ctx.helper.fail(ctx, userCode.UPDATE_ERR)
    }
  }
  async updateInfo () {
    const { ctx, service } = this
    const { nickName = '', avatar = '' } = ctx.request.body
    const userInfo = ctx.session.userInfo
    const result = await service.user.updateUserInfo({
      userId: userInfo.userId,
      nickName: nickName.trim() || userInfo.nickName,
      avatar: avatar.trim() || userInfo.avatar
    })
    if (result) {
      ctx.session.userInfo = await service.user.getUserInfo('userId', userInfo.userId)
      ctx.helper.success(ctx, {})
      return
    }
    ctx.helper.fail(ctx, userCode.UPDATE_ERR)
  }
}

module.exports = UserController;
