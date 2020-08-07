const { validationResult } = require("express-validator/check")
const Disciplina = require('../modelo/Disciplina')

class DisciplinaController {

    async inserir(req, res) {
        let { nome } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await Disciplina.inserir(nome)
        res.status(200).json({ message: 'Cadastrado com sucesso' })

    }

    async listaDeDisciplina(req, res) {
        let disciplina = await Disciplina.listaDeDisciplina()
        if (disciplina.status) {
            res.status(200).send(disciplina.resultado)
        } else {
            res.status(404).json({ errors: disciplina.errors })
        }
    }

    async buscarPorId(req, res) {
        let id = req.params.id
        let disciplina = await Disciplina.buscarPorId(id)
        if (disciplina.status) {
            res.status(200).send(disciplina.resultado)
        } else {
            res.status(404).json({ errors: disciplina.errors })
        }
    }

    async buscarPorNome(req, res) {
        let nome = req.query.nome
        let disciplina = await Disciplina.buscarPorDisciplina(nome)
        if (disciplina.status) {
            res.status(200).send(disciplina.resultado)
        } else {
            res.status(404).json({ errors: disciplina.errors })
        }
    }

    async deletar(req, res) {
        let id = req.params.id
        let disciplina = await Disciplina.buscarPorId(id)
        if (disciplina.status) {
            let delecao = await Disciplina.deletar(disciplina.resultado.id)
            if(delecao.status){
                res.status(200).json({ message: 'Deletado com sucesso' })
            } else {
                res.status(400).json({ errors: 'Erro ao deletar, pois está relacionado com as matérias do aluno' })
            }
        } else {
            res.status(404).json({ errors: disciplina.errors })
        }
    }

    async atualizar(req, res) {
        let id = req.params.id
        let { nome } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let disciplina = await Disciplina.atualizar(id, nome)
        if (disciplina != undefined) {
            if (disciplina.status) {
                res.status(200).json({ message: 'Atualizado com sucesso' })
            } else {
                res.status(400).json({errors:disciplina.errors})
            }
        } else {
            return res.status(400).json({ errors: disciplina.errors });
        }

    }

}

module.exports = new DisciplinaController()