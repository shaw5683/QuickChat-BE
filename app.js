module.exports = app => {
  app.sessionStore = {
    async get (key) {
      const res = await app.redis.get(key);
      if (!res) return null;
      return JSON.parse(res);
    },

    async set (key, value, maxAge) {
      // maxAge not present means session cookies
      // we can't exactly know the maxAge and just set an appropriate value like one day
      // eslint-disable-next-line no-param-reassign
      if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
      // eslint-disable-next-line no-param-reassign
      value = JSON.stringify(value);
      await app.redis.set(key, value, 'PX', maxAge);
    },

    async destroy (key) {
      await app.redis.del(key);
    },
  };
}
