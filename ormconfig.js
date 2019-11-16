module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    // username: env.DBACCOUNT,
    // password: env.DBPASSWORD,
    // database: env.DBNAME,
    username: 'www',
    password: 'www',
    database: 'blogtest',
    synchronize: true,
    logging: false,
    entities: [__dirname + '/src/entity/*{.ts,.js}'],
    timezone: 'Z'
}
