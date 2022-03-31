const db = require('../config/connection')

const db1 = process.env.DB_NAME
const db2 = 'plantazzle_2'

const drop = schema => db.query(`DROP SCHEMA IF EXISTS \`${schema}\``, { logging: false })
const create = schema => db.query(`CREATE SCHEMA IF NOT EXISTS \`${schema}\``, { logging: false })
const use = schema => db.query(`USE \`${schema}\``, { logging: false })

module.exports = async () => {
  await create(db2)
  await use(db2)
  await drop(db1)
  await create(db1)
  await use(db1)
  await drop(db2)
}