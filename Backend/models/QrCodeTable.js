const Sequelize = require('sequelize');
const db = require('../config/dbConfig');

const QrCodeTable = db.define('qrcodes',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    pathImage:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = QrCodeTable;