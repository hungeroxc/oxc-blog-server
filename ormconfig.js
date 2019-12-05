const env = process.env
const isDev = env.APP_ENV === 'qa'

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: env.TESTDBACCOUNT,
    password: env.TESTDBPASSWORD,
    database: env.TESTDBNAME,
    logging: false,
    synchronize: true,
    entities: isDev ? ['src/entity/*{.ts,.js}'] : [__dirname + `/${env.APP_ENV}/src/entity/*{.ts,.js}`],
    timezone: 'Z',
    dateStrings: 'TIMESTAMP'
}
