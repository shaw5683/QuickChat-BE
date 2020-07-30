const { COMMON: commonCode } = require('../../../utils/errCodes')

module.exports = app => async (ctx, next) => {
  if (!ctx.session.userInfo) {
    const nsp = app.io.of('/chat')
    ctx.socket.emit('err', commonCode.NOT_LOGIN)
    nsp.adapter.remoteDisconnect(ctx.socket.id, true)
    return
  }
  await next();
};
