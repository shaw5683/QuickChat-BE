const { cloneDeepWith } = require('lodash')

module.exports = {
  escapeDeep (data) {
    return cloneDeepWith(data, value => {
      if (typeof value === 'string') {
        return this.escape(value)
      }
    })
  },
  success (ctx, {
    msg = 'success',
    data = {}
  }) {
    ctx.body = {
      code: 0,
      msg,
      data
    }
    ctx.status = 200
  },
  fail (ctx, res) {
    ctx.body = {
      code: res.code,
      msg: res.msg,
      data: res.data
    }
    ctx.status = 200
  }
}
