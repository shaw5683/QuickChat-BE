module.exports = {
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
}

