module.exports = process.env.NODE_ENV === 'production' ?
  require('./env.prod.json') :
  require('./env.dev.json');