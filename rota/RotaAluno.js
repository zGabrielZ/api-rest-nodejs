const express = require("express")
const app = express();
const rota = express.Router();
const { check } = require("express-validator/check")
const AlunoController = require('../controller/AlunoController')
const auth = require('../middleware/auth')
const multer = require('multer')
const path = require('path')

// config storage 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads-imagens/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname+Date.now()+path.extname(file.originalname))
    }
})

// config fileFilter 
const fileFilter = (req,file,cb)=>{
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null,true);
    } else {
        cb('Não é possivel mandar este tipo de arquivo',false);
    }
    
}

// config multer 
const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 5
    },
    fileFilter:fileFilter
})

rota.post('/aluno',upload.single('imagem_pessoa'),auth,AlunoController.inserir)
rota.get('/alunos',AlunoController.listaDeAluno)
rota.get('/alunos/:id',AlunoController.buscarPorId)
rota.delete('/aluno/:id',auth,AlunoController.deletar)
rota.post('/aluno/buscar-aluno',AlunoController.buscarPorNome)
rota.put('/aluno/:id',upload.single('imagem_pessoa'),auth,AlunoController.atualizar)
rota.get('/pdf-alunos',AlunoController.pdfAlunos)
rota.get('/downloads',AlunoController.downloadPdf)

module.exports = rota