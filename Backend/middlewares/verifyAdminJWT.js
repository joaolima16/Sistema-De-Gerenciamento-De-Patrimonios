const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

function verificationToken(req, res, next){
    var autorization =  false;
    const token = req.headers['x-access-token'];
    if(!token) return res.status(401).json({authorized:false, msg:'Permission denied'});
    jwt.verify(token, process.env.SECRET,(err, decode)=>{
        if(err) {
            console.log(err)
            return res.status(401).json({authorized:false, msg:'Permission denided!'});
        }
        req.authorized = decode;
        console.log("docente")
        next();
        autorization = true;
    });
    
};

module.exports = verificationToken;