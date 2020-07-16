/* eslint valid-jsdoc: "off" */



/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1592651444540_5133';

  // add your middleware config here
  config.middleware = ['auth'];

  config.auth = {
    ignore: ['/user/login', '/user/signIn', '/user/notLogin']
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  };
};
