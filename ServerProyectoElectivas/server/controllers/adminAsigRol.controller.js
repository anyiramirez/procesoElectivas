var admin = require('firebase-admin');
const adminAsigRolCtrl = {}
const nodemailer = require('nodemailer');
const tm = require('./templateMail');

adminAsigRolCtrl.enviarCorreo = (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'arcangeljuan1@unicauca.edu.co',
            pass: '@FUBKYGKVOn2973'
        }
    });
    var template = templateMail();
    let mailOptions = {
        from: 'arcangeljuan1@unicauca.edu.co',
        to: 'nauj3@outlook.com',
        subject: 'Asignación de rol en Sistema de Gestión de Electivas - UNICAUCA',
        html: template
    }

    transporter.sendMail(mailOptions, function(err, data) {
        if(err){
            console.log("paila nene");
        } else{
            console.log("Soy sexy");
        }
    })
    res.json("jeje");
}

adminAsigRolCtrl.holi = (req,res) => {
    console.log("correo: ", req.params.correo);
}


function templateMail(){
    var template = tm.obtenerPlantillaMail("nauj3@outlook.com","http://localhost:3000/asigrol/holi/ar@hotm.com","admin");
    return template;
}


module.exports = adminAsigRolCtrl;