const UserTable = require('../../models/UserTable');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken');
const userRequest = require("../../models/UserRequest");
const RoomTable = require('../../models/RoomTable');
const Controller = require('../Controller');
const path = require("path");
require('dotenv-safe').config({path:path.resolve(__dirname,"../../.env")});

class UserController {
    static async index(req, res) {
        /* 
            #swagger.tags = ['Users controll']
            #swagger.description = "Autenticação de usuário"
            #swagger.parameters['email']={
                description:'Email cadastrado pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'fulaninho.sobrenome@senaisp.xxx.com',
            }
            #swagger.parameters['password']={
                description:'Senha cadastrada pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'123456#senha',    
            }
        */
        const { email, password } = req.body;
        if (!email || !password) return res.status(422).json({ msg: 'Email e senha são obrigatórios' });
        const resFind = await UserTable.findOne({ where: { email } });
        if (!resFind) return res.status(422).json({ msg: "Usuário não encontrado" });
        if (await bcrypt.compare(password, resFind.password)) {
            try {
                const { id, office, name } = resFind;
                var token =  jwt.sign( { id, office }, process.env.SECRET, { expiresIn: (60 * 60) })  
                return res.status(200).json({ office, token, name })
            } catch (error) {
                if (error) console.log(error);
                return res.status(401).json({ msg: "Usuário não possui permissão!" });
            }
        } else {
            return res.status(422).json({ msg: "Email ou Senha incorretos!" });
        }
    }

    static async create(req, res) {
        /*
            #swagger.tags = ['Users controll']
            #swagger.description = "Criação de usuário"  
            #swagger.parameters['name']={
                description:'Nome do usuário',
                type:'string',
                required:true,
                in:'body',
                example:'Fulaninho (nome) da Silva (Sobrenome)',
            }        
            #swagger.parameters['image']={
                description:'Imagem do usuário, enviado por um input type file',
                type:'object',
                required:false,
                in:'body',
            }
            
            #swagger.parameters['office']={
                description:'Cargo do usuário, admin ou docente',
                type:'string',
                required:true,
                in:'body',
                example:'docente',
            }
            
            #swagger.parameters['email']={
                description:'Email cadastrado pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'fulaninho.sobrenome@senaisp.xxx.com',
            }
            
            #swagger.parameters['password']={
                description:'Senha cadastrada pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'123456#senha',    
            }
        */
        const { name, email, password, office, confirmPass, cpf } = req.body;
        // if (!email || !password || !office || !confirmPass || !cpf) return res.status(422).json({ msg: "[ERROR] Data is missing" });
        // if (password !== confirmPass) return res.status(422).json({ msg: "The passwords are different" });
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const resFind = await UserTable.findOne({ where: { email } });
         
            if (resFind) return res.send("Falha ao criar usuário");
            else{
                await UserTable.create({
                    name,
                    email,
                    office,
                    cpf,
                    password: passwordHash,
                });
                await userRequest.destroy({where:{email}});
                res.status(201).send('Usuário criado com sucesso');
            }
        } catch (err) {
            if (err) console.log(err);
            return res.status(501).send("Não foi possível criar o usuário");
        }
    }

    static async update(req, res) {
        /*
            #swagger.tags = ['Users controll']
            #swagger.description = "Atualização de usuário"
            #swagger.parameters['token']={
                description:'Token do usuário',
                type:'string',
                required:true,
                in:'header',
                example:'X-Access-Token: <token>',
            }
            #swagger.parameters['name']={
                description:'Nome do usuário (principal dado)',
                type:'string',
                required:true,
                in:'body',
                example:'Fulaninho (nome) da Silva (Sobrenome)',
            }        
            #swagger.parameters['image']={
                description:'Imagem do usuário, enviado por um input type file',
                type:'object',
                required:true,
                in:'body',
            }
            
            #swagger.parameters['office']={
                description:'Cargo do usuário, admin ou docente',
                type:'string',
                required:true,
                in:'body',
                example:'docente',
            }
            
            #swagger.parameters['email']={
                description:'Email cadastrado pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'fulaninho.sobrenome@senaisp.xxx.com',
            }
            
            #swagger.parameters['password']={
                description:'Senha cadastrada pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'123456#senha',    
            }
            
        */
        const { email, name , currentEmail, office } = req.body
        try {
            await UserTable.update({ name, email, office },{ where: { email:currentEmail }});
            res.status(200).json({ msg: "Dados atualizados" })
        } catch (err) {
            res.status(400).json({ msg: "[ERROR]: não foi possível atualizar os dados" })
        }
    }
    
    static async delete(req, res) {
        /*
            #swagger.tags = ['Users controll']
            #swagger.description = "Remoção de usuário"
        */
        /*
            #swagger.parameters['token']={
                description:'Token do usuário',
                type:'string',
                required:true,
                in:'header',
                example:'X-Access-Token: <token>',
            }
            #swagger.parameters['name']={
                description:'Nome do usuário',
                type:'string',
                required:true,
                in:'query',
                example:'Fulaninho (nome) da Silva (Sobrenome)',
            }
        */
        const { email } = req.params
        const resFind = await UserTable.findOne({ where: { email } });
        try {
            await resFind.destroy({limit:1});
            res.status(200).json({ msg: "Usuário deletado" })
        } catch (err) {
            res.status(404).json({ msg: "Usuário não deletado" })
        }
    }

    // static async RoomsUser(req,res){
    //     Controller.UserRooms();
    //     try{
    //         const users = await RoomTable.findAll({include:UserTable})
    //         return res.status(200).send(users)
    //     }
    //     catch(ex){
    //         console.log(ex.message)
    //     }
        
    // }
    static async read(req, res) {
        try {
            const resFind = await UserTable.findAll({
                attributes: { exclude: ['password'] }
            })
            res.status(200).json(resFind)
        } catch (err) {
            res.status(404).json({ msg: "[ERROR] Usuários não encontrados ou não existe" })
        }
    }

    static async RefreshPassword(req,res){
        const {email, newPassword} = req.body;
        const salt = await bcrypt.genSalt(12);
        const password = await bcrypt.hash(newPassword,salt)
        const User = await UserTable.findOne({where:{ email }});
        if(User){
            UserTable.update({password:password},{where:{password:User.password}})
            return res.status(201).send("senha atualizada")
        }
        else{
            return res.status(402).send("a senha está incorreta!")
        }
    }
    
    static async email(req,res){
        const { email } = req.params;
        const User = await UserTable.findOne({where:{ email }})
        if(User){
            const { cpf } = User;
            await User.update({ password:cpf });

            const transport = nodemailer.createTransport({
                service:"outlook",
                host:"smtp-mail.outlook.com",
                port:587,
                secure:false,
                auth:{
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                },
                tls:{
                    rejectUnauthorized:false,
                    ciphers:'SSLv3'
                }
            });
            var mailOptions = {
                from: `${process.env.EMAIL}`,
                to: `${User.email}`,
                subject: 'Recuperação De Senha',
                text:`Foi solicitado uma recuperação de senha! sua nova senha é o seu cpf que é: ${cpf} `,
                html:""
              };
              
            const email = transport.sendMail(mailOptions,(err,response)=>{
                if(err) throw err;
                console.log("email enviado", response)
            })
        }
        else{
            res.json({emailExists:false})
        }
    }
}

module.exports = UserController