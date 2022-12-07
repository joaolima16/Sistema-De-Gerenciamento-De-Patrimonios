const dbConn = require('../config/dbConfig')
const Sequelize = require('sequelize');

const UserRequest = dbConn.define("requests", {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },
  cpf:{
    type: Sequelize.CHAR(11),
    allowNull:false,
    unique:true
  },
  office:{
    type: Sequelize.ENUM("admin","docente")
  }
});
module.exports = UserRequest;
