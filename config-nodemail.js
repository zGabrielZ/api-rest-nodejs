const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:'587',
    secure:false,
    auth:{
        user:'testprod846@gmail.com',
        pass:'palmeirasganhatudo2020'
    },
    tls:{
        rejectUnauthorized:false
    }
})


module.exports = transporter