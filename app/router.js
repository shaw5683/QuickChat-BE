
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // user
  router.post('/user/signIn', controller.user.signIn)
  router.post('/user/login', controller.user.login)
  router.post('/user/logout', controller.user.logout)
  router.post('/user/updateInfo', controller.user.updateInfo)
  router.post('/user/updatePassword', controller.user.updatePassword)
};
