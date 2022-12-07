const db = require('../config/dbConfig');
const Sequelize = require('sequelize');

const ImagesPatrimonyTable = db.define('ImagesPatrimony',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        type:Sequelize.INTEGER
    },
    pathImage:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
module.exports = ImagesPatrimonyTable;