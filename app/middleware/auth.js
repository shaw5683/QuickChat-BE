const { COMMON: commonCode } = require('../../utils/errCodes')
module.exports = options => {
  return async function auth (ctx, next) {
    const userInfo = ctx.session.userInfo
    if (!userInfo) {
      ctx.helper.fail(ctx, commonCode.NOT_LOGIN)
      return
    }
    await next()
  }
}
