var admin = require('firebase-admin');
const adminAsigRolCtrl = {}
const nodemailer = require('nodemailer');
const tm = require('./templateMail');

adminAsigRolCtrl.enviarCorreo = (req, res) => {
    if(validarString(req.body.Nombres) && validarString(req.body.Apellidos) && validarString(req.body.Correo) && validarString(req.body.rol)) {
        
        var db = admin.database();
        var correo = req.body.Correo;
        var rol = req.body.rol;
        var usuarioec = {
            correo: correo,
            rol: rol,
            datosCompletos: false
        }
        db.ref("esperandoConfirmacion").push(usuarioec);
        
        var nombreCompleto = req.body.Nombres +" "+ req.body.Apellidos;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:'no.reply.sgeunicauca@gmail.com',
                pass: '@uno234567890'
            }
        });
        var template = templateMail(nombreCompleto,rol,correo);
        let mailOptions = {
            from: 'no.reply.sgeunicauca@gmail.com',
            to: correo,
            subject: 'Asignación de rol en Sistema de Gestión de Electivas - UNICAUCA',
            html: template
        }

        transporter.sendMail(mailOptions, function(err, data) {
            if(err){
                console.log("No se pudo enviar el correo");
                res.json({success: false, message: err});
            } else{
                console.log("Correo enviado con exito");
                res.json({success: true, message: "Correo enviado con exito"});
            }
        })
        
    }



    
}

adminAsigRolCtrl.ValidarCorreo = (req,res) => {
    var db = admin.database();
    var dbr = admin.database();
    var dba = admin.database();
    var ref = db.ref("esperandoConfirmacion");

    ref.orderByChild("correo").equalTo(req.params.correo).once("value").then(function (snapshot){
        var aux = snapshot.val();
        if (aux) {
            var keyUser = Object.keys(aux);
            var usuarioSinConfirmar = aux[keyUser[0]];
            var userConfirmado = {
                correo: usuarioSinConfirmar.correo,
                rol: usuarioSinConfirmar.rol,
                datosCompletos: false,
                estado: true
            }

            //var refr = dbr.ref("users").push(userConfirmado);
            var refr = dbr.ref("users");

            refr.orderByChild("correo").equalTo(userConfirmado.correo).once("value").then(function (valor){
                var auxr = valor.val();    
                if(auxr){
                    var keyUserr = Object.keys(auxr);
                    var refUpdate = dba.ref('users/' + keyUserr[0]);
                    refUpdate.update({
                        datosCompletos: true,
                        estado: true,
                        rol: userConfirmado.rol
                    });
                }else{
                    refr.push(userConfirmado);
                    ref.child(keyUser[0]).remove();
                }
            });
            
            
            res.send(tm.obtenerPlantillaConfirmacion());

        }else {
            res.send(tm.obtenerPlantillaError());
        }
    });
    
}


function templateMail(nombrecompleto,rol,correo){
    var template = tm.obtenerPlantillaMail(nombrecompleto,"http://localhost:3000/asigrol/validarcorreo/"+correo,rol);
    return template;
}

function validarString(cadena) {
    var correcto = true;
    if (!isNaN(cadena) || cadena === undefined  || cadena === null || cadena === '') {
       correcto = false; 
    }
    return correcto;
}

module.exports = adminAsigRolCtrl;