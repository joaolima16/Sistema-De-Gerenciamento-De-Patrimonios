const { spawn } = require('child_process');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');

class QRCodeController{
    async create(name, text){
        const pathFile =`public/${name}`; 
        qrcode.toFile(pathFile, String(text));
        QRCodeController.#qrCodeDescription(pathFile,String(text));
    }
    
    static #qrCodeDescription(pathFile, code){
        const process = spawn('java',['App.java',path.resolve(pathFile),code],{
            cwd:path.resolve(__dirname,'PutCodeInQrCode/src')
        });
        process.stdout.on('data',(response)=>{
            console.log(response.toString());
        });
    }
    
    async allCodes(){
        const process = spawn('python', ['index.py'],{
            cwd:path.resolve(__dirname,'../ExcelController')
        });
        process.stdout.on('data',(response)=>QRCodeController.setArrCodes(response.toString()));
    }

    static arrCodes = [];

    getArrCodes(){
        return QRCodeController.arrCodes;
    };

    static setArrCodes(data){
        QRCodeController.arrCodes = JSON.parse(data);
    }
    
    async verifierQrCode(files, res){
        try{
            const jsons = [];
            files.forEach((item)=>{
                const process = spawn('python', [`QrCodeReader.py`, item.filename], {
                    cwd:path.resolve(__dirname, '../ExcelController')
                });
                process.stdout.on('data',(response)=>jsons.push(JSON.parse(response.toString())));
            })
            setTimeout(()=>{
                res.status(200).json({msg:'Qrcodes readed !', jsons});
            },250*files.length)
        }catch(error){
            if(error) console.log(error);
            res.status(500).json({msg:"[ERROR] Can't read the qrcodes"});
        }
    }

    async deleteQrcode(name){
        try{
            fs.unlinkSync(path.resolve(__dirname,`../../public/${name}-Qrcode.png`))
        }
        catch(ex){
            console.log("Ocorreu o erro" + ex.message)
        }
    }

    createJsonConfig(excelName, colCodes, colNames, initial_line){ 
        const jsonPath = 'controllers\\ExcelController\\excel_config.json';
        const jsonConfig = JSON.stringify({
            file_name:excelName,
            column_codes:colCodes,
            column_names:colNames,
            initial_line
        },null,4);

            console.log(colCodes)
        fs.writeFileSync(jsonPath, jsonConfig);
    }
}

module.exports = QRCodeController;