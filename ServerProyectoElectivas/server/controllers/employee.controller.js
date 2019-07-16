var admin = require('firebase-admin');
var moment = require('moment');

const employeeCtrl = {}

//------------------------------
//    GET METHODS
//------------------------------

employeeCtrl.getEmployees = (req,res) => {
    res.json({
        status: 'Employees here'
    });
}

employeeCtrl.ASIGELECT = (req,res) => {
    var db = admin.database();
    var list;
    var ref = db.ref('PreinscripcionesPrueba');
    var refGA = db.ref();

    ref.once("value", function(snapshot) {
        list = snapshot.val();
        
        var listFiltrada = filtrarLista(list);

        listaFiltrada = ordenarListaPA(listFiltrada);
        var electConEst = asigCupos(listFiltrada);

        var arrayGEst = [];

        var contador = 0;
        for(var key in electConEst){
            arrayGEst[contador] = [];
            arrayGEst[contador].push({nombreElectiva: String(key), estudiantes: electConEst[key]});
            contador++;
        }

        refGA.update({
            GruposAsignados: arrayGEst
        });

        res.json(arrayGEst);
        
    }, function (errorObject) {
        console.log("The read failed preinscription: " + errorObject.code);
    });

}

employeeCtrl.ASIGELECTP = (req,res) => {
    var db = admin.database();
    var refGA = db.ref();
    var list = req.body;
    
    
    var listFiltrada = filtrarLista(list);
    listaFiltrada = ordenarListaPA(listFiltrada);
    var electConEst = asigCupos(listFiltrada);

    var arrayGEst = [];

    var contador = 0;
    for(var key in electConEst){
        arrayGEst[contador] = [];
        arrayGEst[contador].push({nombreElectiva: String(key), estudiantes: electConEst[key]});
        contador++;
    }

    refGA.update({
        GruposAsignados: arrayGEst
    });

    res.json(arrayGEst);

}


employeeCtrl.PIS = (req,res) => {
    
    res.json(req.body);
}

function obtenerLlaveSolEst(usuario, listaSolEst){
    for (var key in listaSolEst) {
        var solicitud = listaSolEst[key];
        if(usuario === solicitud.Usuario){
            return key;
        }
    }
}

function obtenerElectCuposEst(lista){
    var electCE = [];
    for(var key in lista){
        var elect = lista[key];
        var linea = {
            nombreElectiva: elect[0].nombreElectiva,
            cupos: elect[0].estudiantes.length,
            estudiantes: elect[0].estudiantes
        };
        electCE.push(linea);
    }
    return electCE;
}

employeeCtrl.obtenerElectivasCuposEst = (req,res) => {
    var db = admin.database();
    var list;
    var ref = db.ref('GruposAsignados');
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once("value", function(snapshot) {
        list = snapshot.val();
        var electCuposEst = obtenerElectCuposEst(list); 
        
        res.json(electCuposEst);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

}


employeeCtrl.PIAI = (req,res) => {
    var db = admin.database();
    var list;
    var ref = db.ref('PreinscripcionesPrueba');
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once("value", function(snapshot) {
        list = snapshot.val();
        res.json(list);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

}

employeeCtrl.PIET = (req,res) => {
    var db = admin.database();
    var list;
    var ref = db.ref();
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once("value", function(snapshot) {
        list = snapshot.val();

        res.render('list',{title:'Lista de preinscripciones',list:list});
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

}


employeeCtrl.listarElectivas = (req,res) => {
    var db = admin.database();
    var list;
    db.ref('Electivas').once('value', function(snapshot){
        list = snapshot.val();
        res.json(list);
        console.log(list);
    });
}


employeeCtrl.electivasPrograma = (req, res) => {
    
    console.log("programa llego: ",req.params.programa);
    var db = admin.database();
    var nombre = String(req.params.programa);
    var list;
    var listaPrograma = [];
    
    db.ref('Ofertas').once("value", function(snapshot) {        
        list = snapshot.val();
        //res.json(list);
        var key1;
        for (key1 in list) {
            console.log("clave: " + key1);
            for (key2 in list[key1].electivasOfertadas) {
                if(list[key1].electivasOfertadas[key2].programa.search(req.params.programa)!=-1) {
                    listaPrograma.push(list[key1].electivasOfertadas[key2].NombreElectiva);
                }
            }
        }
        console.log(listaPrograma);
        res.json(listaPrograma);
        
        //electivasOferta = list.key1.electivasOfertadas;
        //res.json(electivasOferta);
        /*var entro = false;
        for(var key in electivasOferta) {
            if(key.programa.search(req.params.programa) != -1) {
                entro = true;
                listaPrograma.add(key.NombreElectiva);
                console.log(listaPrograma);
                res.json(listaPrograma);
                break;
            }
        }
        if(!entro){
            res.json("no");
        }*/
        
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}


//-------------------------------
//    POST METHODS
//-------------------------------

employeeCtrl.registrarElectivas = (req,res) => {
    console.log("ELectiva a registrar: ", req.body);
    if(validarString(req.body.nombre) && validarString(req.body.departamento) && validarString(req.body.contenido) && validarString(req.body.tipo) && validarString(req.body.estado)) {
        var nuevaElectiva = {
            nombre : req.body.nombre,
            departamento: req.body.departamento,
            contenido: req.body.contenido,
            tipo: req.body.tipo,
            estado: req.body.estado,
        }
        
        var db = admin.database();
        
        db.ref("Electivas").push(nuevaElectiva);
        
    }
}

employeeCtrl.registrarInscripcion = (req,res) => {
    console.log("Inscripcion a registrar: ", req.body);
       //if(validarString(req.body.nombre) && validarString(req.body.programa) && validarString(req.body.contenido) && validarString(req.body.tipo) && validarString(req.body.estado)) {
        var nuevaInscripcion = {
            usuario : req.body.usuario,
            codigo: req.body.codigo,
            apellidos: req.body.apellidos,
            nombres: req.body.nombres,
            programa: req.body.programa,
            opcion1: req.body.opcion1,
            opcion2: req.body.opcion2,
            opcion3: req.body.opcion3,
            opcion4: req.body.opcion4,
            opcion5: req.body.opcion5,
            fechaRegistro: moment().format('YYYY/MM/DD HH:mm:ss Z')
        }
        
        var db = admin.database();
        
        db.ref("Inscripcion").push(nuevaInscripcion);
        res.json("Inscripción Exitosa");
    //}
}

employeeCtrl.registrarOfertas = (req,res) => {
    console.log("ELectiva a registrar: ", req.body[0].anio);
    var trueE = [];
    for(var i = 0;i < req.body[1].length; i++){
        if(req.body[1][i].oferta === true){
            trueE.push(req.body[1][i]);
        }
    }
        var nuevaOferta = {
            anio : req.body[0].anio,
            periodo: req.body[0].periodo,
            fechaFin: req.body[0].dateFin,
            fechaInicio: req.body[0].dateInicio,
            electivasOfertadas: trueE
        }
        
        var db = admin.database();
        
        db.ref("Ofertas").push(nuevaOferta);
    
        res.json("Guardado Exitoso");
    
}
employeeCtrl.getOfertas = (req, res) => {
    var db = admin.database();
    var list;
    db.ref('Ofertas').once('value', function(snapshot){
        list = snapshot.val();
        res.json(list);
        
    });
}
employeeCtrl.obtenerElectivaPorNombre = (req, res) => {
    
    console.log("id llego: ",req.params.id);
    var db = admin.database();
    var nombre = String(req.params.id);
    var list;
    
    db.ref('Electivas').once("value", function(snapshot) {        
        list = snapshot.val();
        var entro=false;
        for(var key in list) {
            console.log(req.params.id,list[key].nombre);
            if(req.params.id === list[key].nombre) {
                entro = true;
                console.log(list[key]);
                res.json(list[key]);
                break;
            }
        }
        if(!entro){
            res.json("no");
        }
        
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    

}

employeeCtrl.editarElectiva = (req,res) => {
    console.log(req.body);
    var actualizarElectiva = {
        nombre : req.body.NombreElectiva,
        departamento: req.body.Departamento,
        contenido: req.body.Contenido,
        tipo: req.body.TipoElectiva,
    }

    var db = admin.database();
    var list;
    
    db.ref('Electivas').once("value", function(snapshot) {        
        list = snapshot.val();
        var entro=false;
        var keyE;
        for(var key in list) {
            console.log(req.params.id,list[key].nombre);
            if(req.params.id === list[key].nombre) {
                entro = true;
                keyE = key;
                break;
            }
        }
        if(!entro){
            res.json("no");    
        }else{
            var refUpdate = db.ref('Electivas/' + keyE);
            refUpdate.update(actualizarElectiva);
            res.json("Actualizacion exitoso");
        }
        
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

}


employeeCtrl.habilitarElectiva = (req,res) => {
    console.log("Llego: ",req.params.id);
    var db = admin.database();
    var list;
    
    db.ref('Electivas').once("value", function(snapshot) {        
        list = snapshot.val();
        var vest = "";
        for(var key in list) {
            if(req.params.id === list[key].nombre) {
                if(list[key].estado === 'Deshabilitar') {
                    vest = "Habilitar";
                    
                } else {
                    vest = "Deshabilitar";
                    
                }
    
                var refUpdate = db.ref('Electivas/' + key);
                refUpdate.update({estado: vest});
                res.json("funciono");
                break;
            }
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

}






employeeCtrl.guardarSolEst = (req,res) => {
    var db = admin.database();
    var ref = db.ref('PreinscripcionesPrueba');
    var vreq = req.body;
    var list;
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once("value", function(snapshot) {
        
        list = snapshot.val();
        
        for(var i = 0;i < vreq.length; i++){
            
            var keyUsu = obtenerLlaveSolEst(vreq[i].Usuario,list);
            var refUpdate = db.ref('PreinscripcionesPrueba/' + String(keyUsu));
            var porA = vreq[i].PorcentajeCarrera;
            
            var aArr = porA.split(".");
            
            var aSS = aArr[0] + "," + aArr[1];

            refUpdate.update({
                Usuario: vreq[i].Usuario,
                creditosAprobados: parseInt(vreq[i].CreditosAprobados),
                creditosPensum:vreq[i].CreditosPensum,
                porcentajeAvance: aSS,
                electivasAprobadas:parseInt(vreq[i].ElectivasAprobadas),
                electivasCursando:parseInt(vreq[i].ElectivasCursadas),
                promedioCarrera:vreq[i].PromedioCarrera
            });
        }

        res.json("funciono?");

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

}

module.exports = employeeCtrl;


//Funciones

function filtrarLista(lista) {
    var listaFil = [];
    for(var i = 0; i < lista.length; i++) {
        var electA = lista[i].electivasAprobadas;
        var electC = lista[i].electivasCursando;
        var electP = lista[i].electivasPrograma;

        var dif = electP - (electA + electC);

        if(dif > 0) {
            lista[i]['CantElectPuedeVer'] = dif;
            listaFil.push(lista[i]);
        }
    }
    return listaFil;
}

/*
    ordenarListaPA, ordena la lista por prioridaddes
    1 - porcentaje de avance
    2 - promedio
    3 - hora de solicitud
*/
function ordenarListaPA(listaFiltrada) {
    listaFiltrada.sort(function(a, b) {
        var aS = String(a.porcentajeAvance);
        var bS = String(b.porcentajeAvance);
        var aSS
        var bSS
        var aF
        var bF
        
        var bArr = bS.split(",");
        var aArr = aS.split(",");

        if(aArr.length == 2) {
            aSS = aArr[0] + "." + aArr[1];
            aF = parseFloat(aSS).toFixed(6);
        } else {
            aF = parseFloat(aArr[0]);
        }

        if(bArr.length == 2) {
            bSS = bArr[0] + "." + bArr[1];
            bF = parseFloat(bSS).toFixed(6);
        } else {
            bF = parseFloat(bArr[0]);
        }

        if(bF == aF) {
            aS = String(a.promedioCarrera);
            bS = String(b.promedioCarrera);
            aArr = aS.split(",");
            bArr = bS.split(",");

            if( aArr.length == 2) {
                aSS = aArr[0] + "." + aArr[1];
                aF = parseFloat(aSS).toFixed(6);
            } else {
                aF = parseFloat(aArr[0]);
            }

            if( bArr.length == 2) {
                bSS = bArr[0] + "." + bArr[1];
                bF = parseFloat(bSS).toFixed(6);
            } else {
                bF = parseFloat(bArr[0]);
            }
            

            if( bF == aF) {
                var bDate = moment(b.HoraSolicitud, "YYYY/MM/DD HH:mm:ss Z").toDate();
                var aDate = moment(a.HoraSolicitud, "YYYY/MM/DD HH:mm:ss Z").toDate();
                if (aDate < bDate) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                return bF - aF;
            }
        } else {
            return bF - aF;
        }
        
    });
    return listaFiltrada;
}

function obtenerSigProg(programa){
    var sigP = "";
    switch (programa) {
        case 'Sistemas':
            sigP = 'PIS';
            break;
        case 'Electrónica':
            sigP = 'PIET';
            break;
        case 'Automática':
            sigP = 'PIAI';
            break;
        default:
            console.log('Lo lamentamos, por el momento no funciono.');
    }
    return sigP;
}

function obtenerOpcElectEst(solicitudPreinscripcion){
    var opcElectEst = [];
    //Proximo codigo, revisando las solicitud, ese es el tamanio
    if(solicitudPreinscripcion.opcion1 != ""){
        opcElectEst.push(solicitudPreinscripcion.opcion1);
    }
    if(solicitudPreinscripcion.opcion2 != ""){
        opcElectEst.push(solicitudPreinscripcion.opcion2);
    }
    if(solicitudPreinscripcion.opcion3 != ""){
        opcElectEst.push(solicitudPreinscripcion.opcion3);
    }
    if(solicitudPreinscripcion.opcion4 != ""){
        opcElectEst.push(solicitudPreinscripcion.opcion4);
    }
    return opcElectEst;
}

function obtenerElectPuedeVer(solicitudPreinscripcion, sigP){
    var opcElectEst = obtenerOpcElectEst(solicitudPreinscripcion);
    
    var electPuedeVer = [];

    for(var i = 0 ;i < opcElectEst.length; i++){
        
        if(opcElectEst[i].search(sigP) != -1){
            electPuedeVer.push(opcElectEst[i]);
            
        }
    }

    return electPuedeVer.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);

}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function asigCupos(listaOrdenadaPA){
    var ELECTIVAS = [];
    ELECTIVAS = new Array();
    
    for(var i = 0;i < listaOrdenadaPA.length; i++){
        //Programa de estudiante en siglas
        
        var programaEst = listaOrdenadaPA[i].Programa;
        var solEst = listaOrdenadaPA[i];
        var sigP = obtenerSigProg(programaEst);
        
        //Electivas puede ver
        
        var elecPuedeVer = obtenerElectPuedeVer(solEst, sigP);
        
        //Asignar por prioridad
        var electPuedeAsig = solEst.CantElectPuedeVer;
        var aux = 0;

        if(solEst.CantElectPuedeVer === 5){
            electPuedeAsig--;
        }
        
        for (var j = 0; j < elecPuedeVer.length && aux<electPuedeAsig; j++) {
            if(!ELECTIVAS.hasOwnProperty(elecPuedeVer[j])) {
                ELECTIVAS[elecPuedeVer[j]]=[];
            }
            if (ELECTIVAS[elecPuedeVer[j]].length < 18) {
                ELECTIVAS[elecPuedeVer[j]].push({
                    Codigo:solEst.Codigo,
                    NombreCompleto:solEst.Nombres+" "+solEst.Apellidos,
                    Usuario:solEst.Usuario,
                });
                aux++;
            }
        }
    }

    return ELECTIVAS;
}


function validarString(cadena) {
    var correcto = true;
    if (!isNaN(cadena) || cadena === undefined  || cadena === null || cadena == '') {
       correcto = false; 
    }
    return correcto;
}

