const express = require('express')
const router = express.Router();
const Controller = require('../Controllers/Controller');
const UserController = require('../Controllers/UserController');
const PatrimonyController = require('../Controllers/PatrimonyController');
const RoomDepartmentController = require('../Controllers/RoomDepartmentController');
const upload = require('../middlewares/upload');
const jwtAdminVerifier = require("../middlewares/verifyAdminJWT")
const RequestController = require("../Controllers/RequestController");

// Migração:
router.get('/migration', Controller.CreateTable);

// User Requests
router.get("/requests", RequestController.read);
router.post("/request/create", RequestController.create);
router.delete("/request/:email", RequestController.delete);
router.get("/request/user/:id", RequestController.findUser);

// Usuário:
router.post('/user/login',UserController.index);
router.post('/user/register', UserController.create);
router.get('/users', UserController.read);
router.put("/user/refresh",jwtAdminVerifier,UserController.RefreshPassword);
router.put('/user/update', UserController.update);
router.delete('/user/del/:email', UserController.delete);
router.post('/user/email/:email', UserController.email);

// Patrimônio:
router.get("/:department/patrimonys/:room",PatrimonyController.Patrimony)
router.get("/count/patrimonys",PatrimonyController.Count);
router.get('/:department/patrimony/:room', PatrimonyController.index);
router.get('/patrimony/trash',PatrimonyController.indexTrash);
router.post('/insertPatrimony', PatrimonyController.create);
router.get("/patrimony/images/:nPatrimony",PatrimonyController.indexImage)
router.post('/byexcel', upload.fields([
    {name:'excel', maxCount:1},
    {name:'image', maxCount:1}
]), PatrimonyController.createByExcel);
router.post('/verify', upload.array('qrcodes'), PatrimonyController.verifyQrCodes);
router.post("/VerifyPatrimonys/:room",PatrimonyController.VerifyPatrimonys)
router.put('/updatePatrimony/:patrimony',PatrimonyController.update);
router.delete('/deletePatrimony/:numpatrimony', PatrimonyController.delete);
router.post('/:room/filterPatrimony/:department/:type',PatrimonyController.Filter);

// Salas e Departamentos:
router.get('/room', RoomDepartmentController.indexRoom);
router.get('/department',RoomDepartmentController.indexDepartment);
router.post('/room/insert',RoomDepartmentController.createRoom);
router.post('/department', RoomDepartmentController.createDepartment);
router.put('/room', RoomDepartmentController.updateRoom);
router.put('/department', RoomDepartmentController.updateDepartment);
router.delete('/room/:id', RoomDepartmentController.deleteRoom);
router.delete('/department/:id', RoomDepartmentController.deleteDepartment);

module.exports = router;