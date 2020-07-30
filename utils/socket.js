exports.broadcast = function (event, member, data) {
  const { app } = this
  const nsp = app.io.of('/chat')
  const sockets = nsp.sockets
  const room = `temp_${Date.now()}_${Math.random()}`
  const groupHandle = (type) => {
    const promiseArr = []
    member.forEach(async userId => {
      promiseArr.push(new Promise((resolve, reject) => {
        app.redis.get(`socketId_${userId}`).then(socketId => {
          if (socketId) {
            sockets[socketId][type](room, () => {
              resolve()
            })
          } else {
            resolve()
          }
        })
      }))
    })
    return promiseArr
  }

  Promise.all(groupHandle('join')).then(res => {
    nsp.to(room).emit(event, data)
    Promise.all(groupHandle('leave'))
  })
}
