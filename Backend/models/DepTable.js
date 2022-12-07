const dbConn = require("../config/dbConfig")
const Sequelize = require('sequelize')

const Table = dbConn.define("department",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = Table