const express = require("express")
const app = express();
const rota = express.Router();
const { check } = require("express-validator/check")
const DisciplinaController = require('../controller/DisciplinaController')

rota.post('/disciplina',[
    check('nome','Nome não pode ser vazio').not().isEmpty(),
],DisciplinaController.inserir)
rota.get('/disciplina',DisciplinaController.listaDeDisciplina)
rota.get('/disciplina/:id',DisciplinaController.buscarPorId)
rota.post('/disciplina/buscar-disciplina',DisciplinaController.buscarPorNome)
rota.delete('/disciplina/:id',DisciplinaController.deletar)
rota.put('/disciplina/:id',[
    check('nome','Nome não pode ser vazio').not().isEmpty(),
],DisciplinaController.atualizar)

module.exports = rota