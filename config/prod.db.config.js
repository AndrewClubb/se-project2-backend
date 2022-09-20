module.exports = {
    HOST: 'localhost',
    port: 3306,
    USER: 't22022',
    PASSWORD: 'cs@oc2022t2',
    DB: 'p2-t2-courses',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};