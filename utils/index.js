exports.md5 = (str) => {
  const crypto = require('crypto')
  const md5 = crypto.createHash('md5')
  return md5.update(str).digest('hex')
}
