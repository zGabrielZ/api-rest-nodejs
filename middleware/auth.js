const jwt = require('jsonwebtoken')
const jwtSecret = 'aleatorio'

function auth(req,res,next){
    const authToken = req.headers['authorization']

    if (authToken != undefined) {
        const bearer = authToken.split(' ')
        let token = bearer[1]
        jwt.verify(token, jwtSecret, (erro, data) => {
            if (erro) {
                res.status(401).send({ messagem: 'Token inválido' })
            } else {
                req.token = token
                req.adminLogado = { id: data.id,email: data.email }
                next()
            }
        })
    } else {
        res.status(401).send({ messagem: 'Token inválido' })
    }
}

module.exports = auth