const { validationResult } = require("express-validator/check")
const Curso = require('../modelo/Curso')

class CursoController {

    async inserir(req, res) {
        let { nome } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let curso = await Curso.validarNome(nome)
        if (curso) {
            return res.status(400).json({ errors: 'Já tem este nome cadastrado' });
        } else {
            await Curso.inserir(nome)
            res.status(200).json({ message: 'Cadastrado com sucesso' })
        }

    }

    async listaDeCurso(req, res) {
        let curso = await Curso.listaDeCurso()
        if (curso.status) {
            res.status(200).send(curso.resultado)
        } else {
            res.status(404).json({ errors: curso.errors })
        }
    }

    async buscarPorId(req, res) {
        let id = req.params.id
        let curso = await Curso.buscarPorId(id)
        if (curso.status) {
            res.status(200).send(curso.resultado)
        } else {
            res.status(404).json({ errors: curso.errors })
        }
    }

    async buscarPorNome(req, res) {
        let nome = req.query.nome
        let curso = await Curso.buscarPorCurso(nome)
        if (curso.status) {
            res.status(200).send(curso.resultado)
        } else {
            res.status(404).json({ errors: curso.errors })
        }
    }

    async deletar(req, res) {
        let id = req.params.id
        let curso = await Curso.buscarPorId(id)
        if (curso.status) {
            let delecao = await Curso.deletar(curso.resultado.id)
            if(delecao.status){
                res.status(200).json({ message: 'Deletado com sucesso' })
            } else {
                res.status(400).json({ errors: 'Erro ao deletar, pois está relacionado com aluno' })
            }
        } else {
            res.status(404).json({ errors: curso.errors })
        }
    }

    async atualizar(req, res) {
        let id = req.params.id
        let { nome } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let curso = await Curso.atualizar(id, nome)
        if (curso != undefined) {
            if (curso.status) {
                res.status(200).json({ message: 'Atualizado com sucesso' })
            } else {
                res.status(400).json({errors:curso.errors})
            }
        } else {
            return res.status(400).json({ errors: curso.errors });
        }

    }

}

module.exports = new CursoController()