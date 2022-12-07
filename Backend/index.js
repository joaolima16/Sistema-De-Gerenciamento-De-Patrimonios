const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger.json');
const cors = require('cors')();
const path = require('path');
const router = require("./Routes/Routes");
const app = express();
const port = 3000;

app.use('/', express.static(path.resolve(__dirname,"public"))); // acesso a pasta public
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)); // rota para swagger;
app.use(express.json())
app.use((req,res,next)=>{
    res.header("Access-Controll-Allow-Origin","*");
    res.header("Access-Controll-Allow-Headers","Origin, X-requested-With, Content-Type, Accept");
    res.setHeader("Access-Controll-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
app.use(cors);
app.use(bodyParser.urlencoded({extended:false}));
app.use(router);

app.listen(port,()=>{
    console.log(`Servidor em operação na porta ${port}`)
})

module.exports = router;