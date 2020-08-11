const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:'587',
    secure:false,
    auth:{
        user:'',
        pass:''
    },
    tls:{
        rejectUnauthorized:false
    }
})


module.exports = transporter