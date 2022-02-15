module.exports = {
    type: process.env.DB_TYPE || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [process.env.TYPEORM_ENTITIES],
    synchronize: process.env.TYPEORM_SYNCHRONIZE
}