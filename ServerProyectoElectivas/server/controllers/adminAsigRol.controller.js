var admin = require('firebase-admin');
const adminAsigRolCtrl = {}
const nodemailer = require('nodemailer');
const tm = require('./templateMail');

adminAsigRolCtrl.enviarCorreo = (req, res) => {
    if(validarString(req.body.Nombres) && validarString(req.body.Apellidos) && validarString(req.body.Correo) && validarString(req.body.rol)) {
        var correo = req.body.Correo;
        var rol = req.body.rol;
        var nombreCompleto = req.body.Nombres +" "+ req.body.Apellidos;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:'no.reply.sgeunicauca@gmail.com',
                pass: '@uno234567890'
            }
        });
        var template = templateMail(nombreCompleto,rol);
        let mailOptions = {
            from: 'no.reply.sgeunicauca@gmail.com',
            to: correo,
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



    
}

adminAsigRolCtrl.holi = (req,res) => {
    console.log("correo: ", req.params.correo);
}


function templateMail(correo,rol){
    var template = tm.obtenerPlantillaMail(correo,"http://localhost:3000/asigrol/holi/ar@hotm.com",rol);
    return template;
}

function validarString(cadena) {
    var correcto = true;
    if (!isNaN(cadena) || cadena === undefined  || cadena === null || cadena == '') {
       correcto = false; 
    }
    return correcto;
}

module.exports = adminAsigRolCtrl;