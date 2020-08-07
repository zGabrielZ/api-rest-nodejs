const knex = require('../bancoDeDados/conexao')

class Curso {

    async inserir(nome) {
        try {
            await knex.insert({ nome }).table('curso')
        } catch (error) {
            return { error: error }
        }
    }

    async validarNome(nome) {
        try {
            let resultado = await knex.select('*').where({ nome: nome }).table('curso')
            if (resultado.length > 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return { errors: error }
        }
    }

    async listaDeCurso(){
        try {
            let resultado = await knex.select('*').table('curso')
            if(resultado.length > 0){
                return {status:true,resultado}
            } else {
                return {errors:'Lista de cursos é vazia'}
            }
        } catch (error) {
            return { errors: error }
        }
    }
    
    async buscarPorId(id){
        try {
            let resultado = await knex.select(['*']).where({id:id}).table('curso')
            if(resultado.length > 0){
                return {status:true,resultado:resultado[0]}
            } else {
                return {errors:'Curso não encontrado'}
            }
        } catch (error) {
            return { errors: error }
        }
    }

    async buscarPorCurso(nome){
        try {
            let resultado = await knex.select(['*']).where('nome','like',`%${nome}%`).table('curso')
            if(resultado.length > 0){
                return {status:true,resultado}
            } else {
                return {errors:'Curso não encontrado'}
            }
        } catch (error) {
            return { errors: error }
        }
    }

    async deletar(id) {
        try {
            await knex.delete().where({id:id}).table('curso')
        } catch (error) {
            return { error: error }
        }
    }

    async atualizar(id,nome){      
        let curso = await this.buscarPorId(id)
        let editarCurso = {} 
        if(curso.resultado != undefined){ 
            if(nome != undefined){
                if(nome != curso.resultado.nome){
                    let acharNome = await this.validarNome(nome)
                    if(acharNome == false){
                        editarCurso.nome = nome
                    } else {
                        return {status:false,errors:'Já existe este nome cadastrado'}
                    }
                }
            }
        } else {
            return {status:false,errors:curso.errors}
        }

        try {
            await knex.where({id:id})
           .update(editarCurso)
            .table('curso')
            return {status:true}
        } catch (error) {
            return {status:false,errors:error}
        }
    }
}

module.exports = new Curso()