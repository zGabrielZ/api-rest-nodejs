const express = require("express")
const app = express();
const rota = express.Router();
const { check } = require("express-validator/check")
const CursoController = require('../controller/CursoController')

rota.post('/curso',[
    check('nome','Nome não pode ser vazio').not().isEmpty(),
],CursoController.inserir)
rota.get('/cursos',CursoController.listaDeCurso)
rota.get('/curso/:id',CursoController.buscarPorId)
rota.post('/curso/buscar-curso',CursoController.buscarPorNome)
rota.delete('/curso/:id',CursoController.deletar)
rota.put('/curso/:id',[
    check('nome','Nome não pode ser vazio').not().isEmpty(),
],CursoController.atualizar)

module.exports = rota