const knex = require('../bancoDeDados/conexao')
const bcrypt = require('bcryptjs')

class Admin{

    async inserir(email,senha) {
        try {

            senha = await bcrypt.hash(senha,10)            

            await knex.insert({email,senha}).table('usuario')
        } catch (error) {
            return { error: error }
        }
    }

    async buscarEmail(email){
        try {
            let resultado = await knex.select('*').where({ email: email }).table('usuario')
            if (resultado.length > 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return { errors: error }
        }
    }

    async autenticarPorEmail(email){
        try {
            let resultado = await knex.select(['*']).where({email:email}).table('usuario')
            if(resultado.length > 0){
                return {status:true,resultado:resultado[0]}
            } else {
                return {errors:'Email não encontrado'}
            }
        } catch (error) {
            return { errors: error }
        }
    }
}

module.exports = new Admin()