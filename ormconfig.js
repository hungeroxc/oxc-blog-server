const env = process.env
const appIsDev = env.APP_ENV === 'dev'

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: env.DBACCOUNT,
    password: env.DBPASSWORD,
    database: env.DBNAME,
    logging: false,
    synchronize: true,
    entities: appIsDev ? ['src/entity/*{.ts,.js}'] : [__dirname + '/dist/src/entity/*{.ts,.js}'],
    timezone: 'Z',
    dateStrings: 'TIMESTAMP'
}
