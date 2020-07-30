module.exports = app => async (ctx, next) => {
  const { socket, session } = ctx
  const userInfo = session.userInfo
  const id = socket.id;
  app.redis.set(`socketId_${userInfo.userId}`, id)
  await next();
  app.redis.del(`socketId_${userInfo.userId}`)
  const currentRoom = await app.redis.get(`currentRoom_${userInfo.userId}`)
  socket.leave(currentRoom)
  app.redis.del(`currentRoom_${currentRoom}`)
}
