module.exports = {
  SECRET_KEY: process.env.SECRET_KEY || 'Legal',
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '1h',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 3306,
  DB_NAME: process.env.DB_NAME || 'Alumni',
  DB_USER: process.env.DB_USER || 'root',
};