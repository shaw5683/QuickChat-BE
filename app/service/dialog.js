const Service = require('egg').Service
const { v4: uuidv4 } = require('uuid')

class DialogService extends Service {
  async addDialog ({ dialogName, member = [], avatar, userId }) {
    const msg = {
      uuid: uuidv4(),
      type: 'system',
      message: `对话 ${dialogName} 已创建`,
      time: new Date(),
      userId: 0,
      nickName: 'system',
      unRead: JSON.stringify(member)
    }
    const dialogRes = await this.app.mysql.insert('dialog', {
      dialogName,
      member: JSON.stringify(member.map(m => ({
        userId: m,
        role: m === userId ? 9 : 0
      }))),
      lastMsg: JSON.stringify(msg),
      avatar,
      createTime: new Date(),
      updateTime: new Date()
    })
    await this.app.mysql.query(`update user set dialog = JSON_ARRAY_APPEND(dialog, '$', ?) where userId in (${member.map(m => '?').join(',')})`, [String(dialogRes.insertId), ...member])
    await this.app.mysql.insert('message', {
      ...msg,
      dialogId: dialogRes.insertId
    })
    return {
      id: dialogRes.insertId
    }
  }
  async removeDialog ({ id, member }) {
    await this.app.mysql.query(`update user set dialog = JSON_REMOVE(dialog, JSON_UNQUOTE(JSON_SEARCH(dialog, 'one', ?))) where userId in (?)`, [String(id), member.map(m => m.userId).join(',')])
    await this.app.mysql.delete('dialog', {
      id
    })
  }
  async getDialog ({ idArr }) {
    const result = await this.app.mysql.select('dialog', {
      where: {
        id: idArr
      }
    })
    return result.map(dialog => ({
      ...dialog,
      member: JSON.parse(dialog.member),
      lastMsg: JSON.parse(dialog.lastMsg)
    }))
  }
}

module.exports = DialogService
