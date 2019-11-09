module.exports = {
    type: 'mysql',
    host: '0.0.0.0',
    port: 3306,
    username: 'www',
    password: 'www',
    database: 'blogtest',
    synchronize: true,
    logging: false,
    entities: ['src/entity/*{.ts,.js}'],
    timezone: 'Z'
}