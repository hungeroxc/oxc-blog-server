const env = process.env

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: env.DBACCOUNT,
    password: env.DBPASSWORD,
    database: env.DBNAME,
    synchronize: true,
    logging: false,
    entities: ['src/entity/*{.ts,.js}'],
    timezone: 'Z'
}
