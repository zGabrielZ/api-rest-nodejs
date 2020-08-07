const { validationResult } = require("express-validator/check")
const Aluno = require('../modelo/Aluno')
const Curso = require('../modelo/Curso')
const validarCpf = require('validar-cpf')

class AlunoController {

    async inserir(req, res) {
        let { nome, cpf, curso_id } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!validarCpf(cpf)) {
            return res.status(400).json({ errors: 'Cpf inválido' });
        }

        let curso = await Curso.buscarPorId(curso_id)
        let cursoCpf = await Aluno.buscarCpf(cpf)
        if (cursoCpf) {
            return res.status(400).json({ errors: 'Já tem este cpf cadastrado' });
        } else {
            if (curso.status) {
                await Aluno.inserir(nome, cpf, curso.resultado.id)
                res.status(200).json({ message: 'Cadastrado com sucesso' })
            } else {
                res.status(404).json({ errors: curso.errors })
            }
        }
    }
}

module.exports = new AlunoController()