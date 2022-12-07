const UserTable = require('../models/UserTable');
const DepartmentTable = require('../models/DepTable');
const PatrimonyTable = require('../models/PatriTable').Table;
const RoomsTable = require('../models/RoomTable');
const UsersRooms = require('../models/UsersRooms');
const QrCodeTable = require('../models/QrCodeTable');
const ImagesPatrimonyTable = require('../models/ImagesPatrimonyTable');
const UserRequest = require('../models/UserRequest');
const TrashTable = require("../models/TrashPatrimonysTable");

class Controller{
    static async CreateTable(req,res){
        /*
            #swagger.description = "Migração da estrutura do banco de dados do projeto"
        */
        await Controller.DepartmentsRooms();
        await Controller.ResponsiblesTable();
        await Controller.PatrimonyRoom();
        await Controller.PatrimonyQrCode();
        await Controller.PatrimonyImages();
        await DepartmentTable.sync({force:true});
        await UserTable.sync({force:true});
        await RoomsTable.sync({force:true});
        await UsersRooms.sync({force:true});
        await PatrimonyTable.sync({force:true});
        await QrCodeTable.sync({force:true});
        await ImagesPatrimonyTable.sync({force:true});
        await UserRequest.sync({force:true});
        await TrashTable.sync({force:true});
    res.send("Banco Criado com sucesso ")
    }

    static async DepartmentsRooms(){
        DepartmentTable.hasMany(RoomsTable,{foreignKey:{allowNull:false}});
        RoomsTable.belongsTo(DepartmentTable,{foreignKey:{allowNull:false}});
    }

    static async ResponsiblesTable(){
        UserTable.belongsToMany(RoomsTable,{through:UsersRooms});
        RoomsTable.belongsToMany(UserTable,{through:UsersRooms});
    }

    static async PatrimonyRoom(){
        RoomsTable.hasMany(PatrimonyTable,{foreignKey:{allowNull:false}});
        PatrimonyTable.belongsTo(RoomsTable,{foreignKey:{allowNull:false}});
    }

    static async PatrimonyQrCode(){
        PatrimonyTable.hasOne(QrCodeTable,{foreignKey:{allowNull:false}});
        QrCodeTable.belongsTo(PatrimonyTable,{foreignKey:{allowNull:false}});
    }

    static async PatrimonyImages(){
        PatrimonyTable.hasOne(ImagesPatrimonyTable,{foreignKey:{allowNull:false, as:"roomId"}});
        ImagesPatrimonyTable.belongsTo(PatrimonyTable,{foreignKey:{allowNull:false, as:"roomId"}});
        // PatrimonyTable.sync({force:true});
    }
}

module.exports = Controller;