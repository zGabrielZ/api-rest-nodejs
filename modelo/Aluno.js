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
}

module.exports = new Aluno()