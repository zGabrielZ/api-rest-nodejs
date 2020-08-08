const knex = require('../bancoDeDados/conexao')

class Aula {

    async inserir(idAluno, idDisciplina, nota1, nota2) {
        try {
            await knex.insert({ idAluno, idDisciplina, nota1, nota2 }).table('aluno_disciplina')
        } catch (error) {
            return { error: error }
        }
    }

    async listaDeAula() {
        try {
            let resultado = await knex.select(['aluno.nome as aluno_nome', 'disciplina.nome as disciplina_nome', 'aluno_disciplina.nota1 as nota1', 'aluno_disciplina.nota2 as nota2']).table('aluno_disciplina')
                .innerJoin('disciplina', 'aluno_disciplina.idDisciplina', 'disciplina.id')
                .innerJoin('aluno', 'aluno_disciplina.idAluno', 'aluno.id')
            if (resultado.length > 0) {
                return { status: true, resultado }
            } else {
                return { errors: 'Lista de aula é vazia' }
            }
        } catch (error) {
            return { errors: error }
        }
    }

    async buscarPorId(id) {
        try {
            let resultado = await knex.select(['aluno_disciplina.id as aula_id', 'aluno.nome as aluno_nome', 'disciplina.nome as disciplina_nome', 'aluno_disciplina.nota1 as nota1', 'aluno_disciplina.nota2 as nota2'])
                .where({ 'aluno_disciplina.id': id }).table('aluno_disciplina')
                .innerJoin('disciplina', 'aluno_disciplina.idDisciplina', 'disciplina.id')
                .innerJoin('aluno', 'aluno_disciplina.idAluno', 'aluno.id')
            if (resultado.length > 0) {
                return { status: true, resultado: resultado[0] }
            } else {
                return { errors: 'Aula não encontrada' }
            }
        } catch (error) {
            return { errors: error }
        }
    }

    async deletar(id) {
        try {
            await knex.delete().where({id:id}).table('aluno_disciplina')
            return {status:true}
        } catch (error) {
            return { error: error }
        }
    }

    async buscarPorAluno(nome) {
        try {
            let resultado = await knex.select(['aluno_disciplina.id as aula_id', 'aluno.nome as aluno_nome', 'disciplina.nome as disciplina_nome', 'aluno_disciplina.nota1 as nota1', 'aluno_disciplina.nota2 as nota2'])
            .where('aluno.nome', 'like', `%${nome}%`).table('aluno_disciplina')
            .innerJoin('disciplina', 'aluno_disciplina.idDisciplina', 'disciplina.id')
            .innerJoin('aluno', 'aluno_disciplina.idAluno', 'aluno.id')
            if (resultado.length > 0) {
                return { status: true, resultado }
            } else {
                return { errors: 'Aluno não encontrado' }
            }
        } catch (error) {
            return { errors: error }
        }
    }

    async atualizar(id,nota1,nota2){      
        let aula = await this.buscarPorId(id)
        let editarAula = {} 
        if(aula.resultado != undefined){ 
            if(nota1 != undefined){
                editarAula.nota1 = nota1
            }
            if(nota2 != undefined){
                editarAula.nota2 = nota2
            }
        } else {
            return {status:false,errors:aula.errors}
        }

        try {
            await knex.where({id:id})
           .update(editarAula)
            .table('aluno_disciplina')
            return {status:true}
        } catch (error) {
            return {status:false,errors:error}
        }
    }
}

module.exports = new Aula()