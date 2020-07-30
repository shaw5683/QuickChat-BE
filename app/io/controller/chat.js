const Controller = require('egg').Controller;

class ChatController extends Controller {
  async sendMsg () {
    const { ctx, app, service } = this;
    const { dialogId, uuid, type, message } = ctx.args[0];
    const { userInfo } = ctx.session
    const dialog = await service.dialog.getDialog({ idArr: [dialogId] })
    if (!dialog[0].member.find(m => m.userId === userInfo.userId)) {
      return
    }
    const msg = {
      uuid: uuid,
      type: type,
      message: message,
      time: new Date(),
      userId: userInfo.userId,
      nickName: userInfo.nickName,
      unRead: JSON.stringify(dialog[0].member.map(m => m.userId)),
      dialogId
    }
    await service.chat.addMsg(msg)
    app.io.of('/chat').to(`dialog_${dialogId}`).emit('onMessage', msg)
  }
  async joinRoom () {
    const { ctx, app, service } = this
    const dialogId = ctx.args[0]
    const room = `dialog_${dialogId}`
    const { userId } = ctx.session
    const currentRoom = await app.redis.get(`currentRoom_${userId}`)
    const socketId = app.redis.get(`socketId_${userId}`)
    if (currentRoom && socketId) {
      ctx.socket.leave(currentRoom)
    }
    ctx.socket.join(room, async () => {
      app.redis.set(`currentRoom_${userId}`, room)
      const messageList = await service.chat.getMsg({ dialogId })
      app.io.of('/chat').to(room).emit('initMessage', messageList)
    })
  }
}

module.exports = ChatController;
