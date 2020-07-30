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
  config.middleware = ['auth', 'dialogAuth'];

  config.auth = {
    ignore: ['/user/login', '/user/signIn', '/user/notLogin']
  }

  config.dialogAuth = {
    match: ['/dialog/removeDialog', '/dialog/getDialog']
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
    security: {
      csrf: {
        enable: false
      }
    },
    mysql: {
      client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'quick_chat',
      },
      app: true,
      agent: false
    },
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: '123456',
        db: 0
      }
    },
    session: {
      maxAge: 24 * 3600 * 1000, // ms
      key: 'QuickChatSess',
      httpOnly: true,
      encrypt: true
    },
    io: {
      init: {},
      namespace: {
        '/chat': {
          connectionMiddleware: ['connection'],
          packetMiddleware: ['auth', 'connection']
        }
      },
      redis: {
        host: '127.0.0.1',
        port: 6379,
        auth_pass: '123456',
        db: 0
      }
    }
  };
};
