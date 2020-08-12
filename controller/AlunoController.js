const { validationResult } = require("express-validator/check")
const Aluno = require('../modelo/Aluno')
const Curso = require('../modelo/Curso')
const validarCpf = require('validar-cpf')
const ejs = require('ejs')
const pdf = require('html-pdf')

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

    async listaDeAluno(req,res){
        let aluno = await Aluno.listaDeAlunos()
        if(aluno.status){
            res.status(200).send(aluno.resultado)
        } else {
            res.status(404).json({ errors: aluno.errors })
        }
    }


    async pdfAlunos(req,res){


        const options = {
            format:'A4',
            border:{
                right:'8'
            }
        }

        await Aluno.listaDeAlunos()
            .then(alunos=>{
                ejs.renderFile('./views/gerar-pdf/alunos.ejs',{alunos:alunos.resultado},(err,html)=>{
                    if(err){
                        res.status(500).json({errors:'Erro no servidor'})
                    } else {
                        pdf.create(html,options).toFile('./uploads/alunos.pdf',(err,response)=>{
                            if(err){
                                res.status(400).json({errors:'Erro ao gerar PDF'})
                            } else {
                                res.status(200).json({message:'PDF gerado'})
                            }
                        })
                    }
                })
            })
    }

    async downloadPdf(req,res){
        res.type('pdf')
        res.download('./uploads/alunos.pdf')
    }

    async buscarPorId(req,res){
        let id = req.params.id
        let aluno = await Aluno.buscarPorId(id)
        if(aluno.status){
            res.status(200).send(aluno.resultado)
        } else {
            res.status(404).json({ errors: aluno.errors })
        }
    }

    async deletar(req, res) {
        let id = req.params.id
        let aluno = await Aluno.buscarPorId(id)
        if (aluno.status) {
            let delecao = await Aluno.deletar(aluno.resultado.aluno_id)
            if(delecao.status){
                res.status(200).json({ message: 'Deletado com sucesso' })
            } else {
                res.status(400).json({ errors: 'Erro ao deletar, pois está relacionado com suas matérias' })
            }
        } else {
            res.status(404).json({ errors: aluno.errors })
        }
    }

    async buscarPorNome(req, res) {
        let nome = req.query.nome
        let aluno = await Aluno.buscarPorAluno(nome)
        if (aluno.status) {
            res.status(200).send(aluno.resultado)
        } else {
            res.status(404).json({ errors: aluno.errors })
        }
    }

    async atualizar(req, res) {
        let id = req.params.id
        let { nome,curso_id } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let curso = await Curso.buscarPorId(curso_id)
        let aluno = await Aluno.atualizar(id, nome,curso.resultado.id)
        if (curso.status) {
            if(aluno != undefined){
                if (aluno.status) {
                    res.status(200).json({ message: 'Atualizado com sucesso' })
                } else {
                    res.status(400).json({errors:aluno.errors})
                }
            } else {
                res.status(400).json({ errors: aluno.errors });
            }
        } else {
            res.status(404).json({ errors: curso.errors })
        }

    }
}

module.exports = new AlunoController()