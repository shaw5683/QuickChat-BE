const Controller = require('egg').Controller;
const { DIALOG: dialogCode, COMMON: commonCode } = require('../../utils/errCodes')
const { broadcast } = require('../../utils/socket')

class DialogController extends Controller {
  async addDialog () {
    const { ctx, service, app } = this
    const { dialogName, avatar = '' } = ctx.request.body
    const { userId } = ctx.session.userInfo
    let member = ctx.request.body.member || []
    !member.includes(userId) && member.push(userId)
    const { id } = await service.dialog.addDialog(ctx.helper.escapeDeep({
      dialogName,
      member,
      avatar,
      userId
    }))
    const dialogData = await service.dialog.getDialog({ idArr: [id] })
    broadcast.call(this, 'dialogAdd', member, dialogData)
    ctx.helper.success(ctx, {
      data: { id }
    })
  }
  async removeDialog () {
    const { ctx, service } = this
    const { id } = ctx.request.body
    const dialog = await service.dialog.getDialog({ id })
    const res = await service.dialog.removeDialog(dialog)
    if (res === false) {
      ctx.helper.fail(ctx, commonCode.PARAM_ERR)
      return
    }
    ctx.helper.success(ctx, {})
  }
  async getDialog () {
    const { ctx, service } = this
    const { id } = ctx.request.body
    let idArr = []
    if (id) {
      idArr = [id]
    } else {
      const { dialog } = await service.user.getUserInfo('userId', ctx.session.userInfo.userId)
      idArr = dialog.map(dialogId => Number(dialogId))
    }
    const dialogArr = await service.dialog.getDialog({ idArr })
    ctx.helper.success(ctx, {
      data: {
        dialogArr: dialogArr
      }
    })
  }
  async addMember () {
  }
  async removeMember () {
  }
}

module.exports = DialogController;
