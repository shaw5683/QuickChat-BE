const Service = require('egg').Service

class ChatService extends Service {
  async addMsg (msg) {
    await this.app.mysql.insert('message', msg)
  }
  async getMsg ({ dialogId }) {
    const messageList = await this.app.mysql.select('message', {
      where: {
        dialogId
      }
    })
    console.log(messageList);
    return messageList || []
  }
}

module.exports = ChatService
