const knex = require('../bancoDeDados/conexao')

class Curso {

    async inserir(nome) {
        try {
            await knex.insert({ nome }).table('disciplina')
        } catch (error) {
            return { error: error }
        }
    }

    async listaDeDisciplina(){
        try {
            let resultado = await knex.select('*').table('disciplina')
            if(resultado.length > 0){
                return {status:true,resultado}
            } else {
                return {errors:'Lista de disciplina é vazia'}
            }
        } catch (error) {
            return { errors: error }
        }
    }
    
    async buscarPorId(id){
        try {
            let resultado = await knex.select('*').where({id:id}).table('disciplina')
            if(resultado.length > 0){
                return {status:true,resultado:resultado[0]}
            } else {
                return {errors:'Disciplina não encontrado'}
            }
        } catch (error) {
            return { errors: error }
        }
    }

    async buscarPorDisciplina(nome){
        try {
            let resultado = await knex.select(['*']).where('nome','like',`%${nome}%`).table('disciplina')
            if(resultado.length > 0){
                return {status:true,resultado}
            } else {
                return {errors:'Disciplina não encontrado'}
            }
        } catch (error) {
            return { errors: error }
        }
    }

    async deletar(id) {
        try {
            await knex.delete().where({id:id}).table('disciplina')
            return {status:true}
        } catch (error) {
            return { error: error }
        }
    }

    async atualizar(id,nome){      
        let disciplina = await this.buscarPorId(id)
        let editarDisciplina = {} 
        if(disciplina.resultado != undefined){ 
            if(nome != undefined){
                editarDisciplina.nome = nome
            }
        } else {
            return {status:false,errors:disciplina.errors}
        }

        try {
            await knex.where({id:id})
           .update(editarDisciplina)
            .table('disciplina')
            return {status:true}
        } catch (error) {
            return {status:false,errors:error}
        }
    }
}

module.exports = new Curso()