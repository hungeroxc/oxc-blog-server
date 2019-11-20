const env = process.env
const isDev = env.APP_ENV === 'development'

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: env.DBACCOUNT,
    password: env.DBPASSWORD,
    database: env.DBNAME,
    synchronize: true,
    logging: false,
    entities: isDev ? ['src/entity/*{.ts,.js}'] : [__dirname + '/dist/entity/*{.ts,.js}'],
    timezone: 'Z'
}
