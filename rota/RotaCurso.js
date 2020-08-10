const express = require("express")
const app = express();
const rota = express.Router();
const { check } = require("express-validator/check")
const CursoController = require('../controller/CursoController')
const auth = require('../middleware/auth')

rota.post('/curso',[
    check('nome','Nome não pode ser vazio').not().isEmpty(),
],auth,CursoController.inserir)
rota.get('/cursos',CursoController.listaDeCurso)
rota.get('/curso/:id',CursoController.buscarPorId)
rota.post('/curso/buscar-curso',CursoController.buscarPorNome)
rota.delete('/curso/:id',auth,CursoController.deletar)
rota.put('/curso/:id',[
    check('nome','Nome não pode ser vazio').not().isEmpty(),
],auth,CursoController.atualizar)

module.exports = rota