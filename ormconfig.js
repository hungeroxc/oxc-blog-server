const env = process.env
const isDev = env.APP_ENV === 'qa'

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: env.DBACCOUNT,
    password: env.DBPASSWORD,
    database: env.DBNAME,
    logging: false,
    synchronize: true,
    entities: isDev ? ['src/entity/*{.ts,.js}'] : [__dirname + '/dist/src/entity/*{.ts,.js}'],
    timezone: 'Z',
    dateStrings: 'TIMESTAMP'
}
