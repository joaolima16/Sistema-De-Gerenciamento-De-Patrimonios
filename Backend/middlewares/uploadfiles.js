const multer = require("multer");

module.exports = (
    multer.diskStorage({
        destination:(req,file,cb)=>{
            if(file.fieldname == 'excel') cb(null,'./Controllers/ExcelController');
            else if(file.fieldname == 'image') cb(null, './Public');
        },
        filename:(req,file,cb)=>cb(null,file.originalname)
    })
);