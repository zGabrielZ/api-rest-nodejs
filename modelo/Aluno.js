const knex = require('../bancoDeDados/conexao')

class Aluno {
    async inserir(nome,cpf,curso_id) {
        try {
            await knex.insert({nome,cpf,curso_id}).table('aluno')
        } catch (error) {
            return { error: error }
        }
    }

    async buscarCpf(cpf){
        try {
            let resultado = await knex.select('*').where({ cpf: cpf }).table('aluno')
            if (resultado.length > 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return { errors: error }
        }
    }

    async listaDeAlunos(){
        try {
            let resultado = await knex.select(['aluno.nome as aluno_nome','aluno.cpf as aluno_cpf','curso.nome as curso_nome']).table('aluno')
            .innerJoin('curso','aluno.curso_id','curso.id')
            if(resultado.length > 0){
                return {status:true,resultado}
            } else {
                return {errors:'Lista de alunos é vazia'}
            }
        } catch (error) {
            return { errors: error }
        }
    }
    
    async buscarPorId(id){
        try {
            let resultado = await knex.select(['aluno.id as aluno_id','aluno.nome as aluno_nome','aluno.cpf as aluno_cpf','curso.nome as curso_nome'])
                .where({'aluno.id':id}).table('aluno')
                .innerJoin('curso','aluno.curso_id','curso.id')
            if(resultado.length > 0){
                return {status:true,resultado:resultado[0]}
            } else {
                return {errors:'Aluno não encontrado'}
            }
        } catch (error) {
            return { errors: error }
        }
    }
}

module.exports = new Aluno()