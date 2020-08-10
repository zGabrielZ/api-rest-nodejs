const { validationResult } = require("express-validator/check")
const Admin = require('../modelo/Admin')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const jwtSecret = 'aleatorio'

class AdminController{

    async inserir(req,res){
        let{email,senha} = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let admin = await Admin.buscarEmail(email)
        if(admin){
            return res.status(400).json({ errors: 'Já tem este email cadastrado' });
        } else {
            await Admin.inserir(email,senha)
            res.status(200).json({ message: 'Cadastrado com sucesso' })
        }
    }

    async autenticar(req,res){
        let{email,senha} = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let admin = await Admin.autenticarPorEmail(email)
        if(admin.status){
            // tem email
            let senhaCorreta = bcrypt.compareSync(senha,admin.resultado.senha)
            if(senhaCorreta){
                jwt.sign(
                    {id:admin.resultado.id,email:admin.resultado.email},
                    jwtSecret,{expiresIn:'48h'},(erro,token)=>{
                        if(erro){
                            res.status(400).json({erro:'Falha interna'})
                        } else {
                            res.status(200).json({token:token,id:admin.resultado.id,email:admin.resultado.email})
                        }
                    }
                )
            } else {
                res.status(400).json({ errors: 'Senha incorreta' });
            }
        } else {
            // nao tem email
            return res.status(400).json({ errors: admin.errors });
        }
    }
}

module.exports = new AdminController()