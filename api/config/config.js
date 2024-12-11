process.loadEnvFile()

const {
  NODE_ENV = 'development',
  PORT = 3000,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_PORT
} = process.env

const config = {
  env: NODE_ENV,
  port: PORT,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
  dbHost: DB_HOST,
  dbName: DB_NAME,
  dbPort: DB_PORT
}

module.exports = { config }
