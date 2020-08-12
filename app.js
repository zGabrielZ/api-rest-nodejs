const express = require('express')
const porta = 8080
const bodyParser = require('body-parser')
const app = express()
const rotaCurso = require('./rota/RotaCurso')
const rotaAluno = require('./rota/RotaAluno')
const rotaDisciplina = require('./rota/RotaDisciplina')
const rotaAula = require('./rota/RotaAula')
const rotaAdmin = require('./rota/RotaAdmin')


// config de body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// config de rota do curso
app.use('/',rotaCurso)

// config de rota do aluno
app.use('/',rotaAluno)

// config de rota da disciplina
app.use('/',rotaDisciplina)

// config de rota da aula
app.use('/',rotaAula)

// config de rota do admin
app.use('/',rotaAdmin)

// config de ejs 
app.set('view engine','ejs')
// configurando arquivo estaticos 
app.use(express.static('public'))


// config de porta do node
app.listen(porta,(req,res)=>console.log('Conectado na porta '+porta))