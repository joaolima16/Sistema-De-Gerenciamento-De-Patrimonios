const dbConn = require('../config/dbConfig')
const Sequelize = require('sequelize');
const sequelize = require('sequelize');

const Table = dbConn.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf:{
    type:Sequelize.CHAR(14),
    allowNull:false,
    unique:true
  },
  email: {
    type: Sequelize.STRING,
    unique:true,
    allowNull:false
  },
  office: {
    type: Sequelize.ENUM("admin", "docente"),
    allowNull: false,
  }
});
module.exports = Table;
