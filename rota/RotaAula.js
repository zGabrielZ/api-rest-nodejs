const express = require("express")
const app = express();
const rota = express.Router();
const { check } = require("express-validator/check")
const AulaController = require('../controller/AulaController')

rota.post('/aula',[
    check('idAluno','Tem que selecionar aluno').exists({checkNull:true,checkFalsy:true}),
    check('idDisciplina','Tem que selecionar disciplina').exists({checkNull:true,checkFalsy:true}),
    check('nota1','Nota 1 não pode ser vazio').exists({checkNull:true,checkFalsy:true}),
    check('nota2','Nota 2 não pode ser vazio').exists({checkNull:true,checkFalsy:true})
],AulaController.inserir)
rota.get('/aula',AulaController.listaDeAula)
rota.get('/aula/:id',AulaController.buscarPorId)
rota.delete('/aula/:id',AulaController.deletar)
rota.post('/aula/buscar-aluno',AulaController.buscarPorNome)
rota.put('/aula/:id',[
    check('nota1','Nota 1 não pode ser vazio').exists({checkNull:true,checkFalsy:true}),
    check('nota2','Nota 2 não pode ser vazio').exists({checkNull:true,checkFalsy:true})
],AulaController.atualizar)

module.exports = rota