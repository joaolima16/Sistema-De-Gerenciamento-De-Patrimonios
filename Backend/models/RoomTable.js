const db = require('../config/dbConfig');
const Sequelize = require('sequelize');

const RoomTable = db.define('rooms',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        type: Sequelize.INTEGER
    },
    nRoom:{
        allowNull:false,
        type:Sequelize.INTEGER,
    },
});

module.exports = RoomTable;