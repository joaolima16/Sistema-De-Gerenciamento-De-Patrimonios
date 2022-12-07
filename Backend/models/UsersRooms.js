const db = require('../config/dbConfig');
const Sequelize = require('sequelize');

const UserRoomsTable = db.define('UserRooms',{
    id:{
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        type: Sequelize.INTEGER
    }
})
module.exports = UserRoomsTable;