const Sequelize = require('sequelize');

const dbConn  = new Sequelize({
    database:process.env.DATABASE,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:3306,
    dialect:"mysql",
    host:process.env.DB_HOST
});

module.exports = dbConn;