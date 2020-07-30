
/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  session: true,
  io: {
    enable: true,
    package: 'egg-socket.io'
  }
};
