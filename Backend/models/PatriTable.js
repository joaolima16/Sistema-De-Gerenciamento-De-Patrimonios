const dbConn = require("../config/dbConfig");
const Sequelize = require("sequelize");

const enumTypes = ["cadeira","projetor","computador","televisao","mesa"];
const enumStatus = ["ativo","manutencao","danificado","movido"];


const Table = dbConn.define("patrimony",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    nPatrimony:{
        type: Sequelize.INTEGER,
        allowNull: false,
        Unique:true
    },
    image:{
        type: Sequelize.STRING,
        allowNull:true
    },
    type:{
        type: Sequelize.ENUM(enumTypes),
        allowNull: false,
    },
    status:{
        type: Sequelize.ENUM(enumStatus),
        allowNull:true,
    },
    value:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
});


module.exports = {
    Table,
    enumTypes,
    enumStatus
};