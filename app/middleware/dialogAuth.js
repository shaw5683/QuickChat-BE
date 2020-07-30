const { COMMON: commonCode } = require('../../utils/errCodes')
module.exports = options => {
  return async function auth (ctx, next) {
    const dialogId = ctx.request.body.id
    if (dialogId) {
      const { userId } = ctx.session.userInfo
      const dialogArr = await ctx.service.dialog.getDialog({ idArr: [dialogId] })
      if (!dialogArr[0].member.find(m => m.userId === userId)) {
        ctx.helper.fail(ctx, commonCode.AUTH_FAIL)
        return
      }
    }
    await next()
  }
}
