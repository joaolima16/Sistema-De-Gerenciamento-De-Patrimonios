const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
const db = require("../config/dbConfig")

const TrashTable = db.define("trashs",{
    id:{
        type: sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nPatrimony:{
        type:sequelize.INTEGER(),
        allowNull:false,
        unique:false
    },
    type:{
        type:sequelize.ENUM("cadeira","computador","mesa","projetor","televisao"),
        allowNull:false
    },
    status:{
        type:sequelize.ENUM("ativo","manutencao","danificado","movido"),
        allowNull:false
    },
    value:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    idRoom:{
        type:sequelize.INTEGER,
        allowNull:false
    }


})

module.exports = TrashTable;