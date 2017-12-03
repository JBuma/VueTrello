module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'VueTrello',
    user: process.env.DB_USER || 'myAccount',
    password: process.env.DB_PASS || '4lpine!r0sebud',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './vuetrello.sqlite'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'iAm-the_secret'
  }
}
