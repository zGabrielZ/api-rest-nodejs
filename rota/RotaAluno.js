const express = require("express")
const app = express();
const rota = express.Router();
const { check } = require("express-validator/check")
const AlunoController = require('../controller/AlunoController')

rota.post('/aluno',[
    check('nome','Nome não pode ser vazio').not().isEmpty(),
    check('cpf','Cpf não pode ser vazio').not().isEmpty(),
    check('curso_id','Curso não pode ser vazio').exists({checkNull:true,checkFalsy:true})
],AlunoController.inserir)
rota.get('/alunos',AlunoController.listaDeAluno)
rota.get('/alunos/:id',AlunoController.buscarPorId)

module.exports = rota