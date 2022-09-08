module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'database2022',
    DB: 'se_project2_course',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};