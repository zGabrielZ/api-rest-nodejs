const express = require("express")
const app = express();
const rota = express.Router();
const { check } = require("express-validator/check")
const AdminController = require('../controller/AdminController')

rota.post('/admin',[
    check('email','Email não pode ser vazio').not().isEmpty(),
    check('email','Email inválido').isEmail(),
    check('senha','Senha não pode ser vazio').not().isEmpty(),
],AdminController.inserir)
rota.post('/admin/autenticar',[
    check('email','Email não pode ser vazio').not().isEmpty(),
    check('email','Email inválido').isEmail(),
    check('senha','Senha não pode ser vazio').not().isEmpty(),
],AdminController.autenticar)

module.exports = rota