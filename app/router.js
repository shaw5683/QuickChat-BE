
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  // user
  router.post('/user/signIn', controller.user.signIn)
  router.post('/user/login', controller.user.login)
  router.post('/user/logout', controller.user.logout)
  router.post('/user/updateInfo', controller.user.updateInfo)
  router.post('/user/updatePassword', controller.user.updatePassword)
  router.post('/user/getUserInfo', controller.user.getUserInfo)

  // dialog
  router.post('/dialog/addDialog', controller.dialog.addDialog)
  router.post('/dialog/getDialog', controller.dialog.getDialog)
  router.post('/dialog/removeDialog', controller.dialog.removeDialog)

  // chat
  io.of('/chat').route('sendMsg', io.controller.chat.sendMsg)
  io.of('/chat').route('joinRoom', io.controller.chat.joinRoom)
};
