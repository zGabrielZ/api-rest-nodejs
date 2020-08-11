const { validationResult } = require("express-validator/check")
const Aluno = require('../modelo/Aluno')
const Curso = require('../modelo/Curso')
const Aula = require('../modelo/Aula')
const Disciplina = require("../modelo/Disciplina")

class AlunoController {

    async inserir(req, res) {
        let { idAluno,idDisciplina,nota1,nota2} = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let mediaFinal = (nota1 + nota2)/2

        let disciplina = await Disciplina.buscarPorId(idDisciplina)
        let aluno = await Aluno.buscarPorId(idAluno)
        if (disciplina.status && aluno.status) {
            await Aula.inserir(idAluno,idDisciplina,nota1,nota2,mediaFinal)
            res.status(200).json({ message: 'Cadastrado com sucesso'})
        } else {
            res.status(404).json({ errors: disciplina.errors,errors2:aluno.errors })
        }
    }

    async listaDeAula(req,res){
        let aula = await Aula.listaDeAula()
        if(aula.status){
            res.status(200).send(aula.resultado)
        } else {
            res.status(404).json({ errors: aula.errors })
        }
    }

    async buscarPorId(req,res){
        let id = req.params.id
        let aula = await Aula.buscarPorId(id)
        if(aula.status){
            res.status(200).send(aula.resultado)
        } else {
            res.status(404).json({ errors: aula.errors })
        }
    }

    async deletar(req, res) {
        let id = req.params.id
        let aula = await Aula.buscarPorId(id)
        if (aula.status) {
            let delecao = await Aula.deletar(aula.resultado.aula_id)
            if(delecao.status){
                res.status(200).json({ message: 'Deletado com sucesso' })
            } else {
                res.status(400).json({ errors: 'Erro ao deletar' })
            }
        } else {
            res.status(404).json({ errors: aula.errors })
        }
    }

    async buscarPorNome(req, res) {
        let nome = req.query.nome
        let aluno = await Aula.buscarPorAluno(nome)
        if (aluno.status) {
            res.status(200).send(aluno.resultado)
        } else {
            res.status(404).json({ errors: aluno.errors })
        }
    }

    async atualizar(req, res) {
        let id = req.params.id
        let { nota1,nota2 } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let aula = await Aula.atualizar(id,nota1,nota2)
        if (aula != undefined) {
            if (aula.status) {
                res.status(200).json({ message: 'Atualizado com sucesso' })
            } else {
                res.status(400).json({errors:aula.errors})
            }
        } else {
            return res.status(400).json({ errors: aula.errors });
        }

    }
}

module.exports = new AlunoController()