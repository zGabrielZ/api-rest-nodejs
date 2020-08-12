const express = require("express")
const app = express();
const rota = express.Router();
const { check } = require("express-validator/check")
const AlunoController = require('../controller/AlunoController')
const auth = require('../middleware/auth')

rota.post('/aluno',[
    check('nome','Nome não pode ser vazio').not().isEmpty(),
    check('cpf','Cpf não pode ser vazio').not().isEmpty(),
    check('curso_id','Curso não pode ser vazio').exists({checkNull:true,checkFalsy:true})
],auth,AlunoController.inserir)
rota.get('/alunos',AlunoController.listaDeAluno)
rota.get('/alunos/:id',AlunoController.buscarPorId)
rota.delete('/aluno/:id',auth,AlunoController.deletar)
rota.post('/aluno/buscar-aluno',AlunoController.buscarPorNome)
rota.put('/aluno/:id',[
    check('nome','Nome não pode ser vazio').not().isEmpty(),
    check('curso_id','Curso não pode ser vazio').exists({checkNull:true,checkFalsy:true})
],auth,AlunoController.atualizar)
rota.get('/pdf-alunos',AlunoController.pdfAlunos)
rota.get('/downloads',AlunoController.downloadPdf)

module.exports = rota