var admin = require('firebase-admin');

const employeeCtrl = {}

employeeCtrl.getEmployees = (req,res) => {
    res.json({
        status: 'Employees here'
    });

}

employeeCtrl.ASIGELECT = (req,res) => {
    var db = admin.database();
    var list;
    var ref = db.ref('PreinscripcionesPrueba');
    var refP = db.ref('Programas');
    var refGA = db.ref();
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once("value", function(snapshot) {
        list = snapshot.val();
        
        var listFiltrada = filtrarLista(list);
        ordenarListaPA(listFiltrada);
        var electConEst = asigCupos(listFiltrada);
        
        



        refP.once("value", function(snapshot) {
            var listaLlaves = snapshot.val();
            var arrayAllElec = [];
            var arrayAllEst = [];
            var arrayGEst = [];
/*
            for(var i = 0;i < listaLlaves['PIS'].length; i++){
                arrayAllElec.push(listaLlaves['PIS'][i]);
            }
            for(var i = 0;i < listaLlaves['PIAI'].length; i++){
                arrayAllElec.push(listaLlaves['PIAI'][i]);
            }
            for(var i = 0;i < listaLlaves['PIET'].length; i++){
                arrayAllElec.push(listaLlaves['PIET'][i]);
            }
            for(var i = 0;i < arrayAllElec.length; i++){
                arrayAllEst[arrayAllElec[i]]=[];
                arrayAllEst[arrayAllElec[i]].push(electConEst[arrayAllElec[i]]);
                
            }

            res.render('list',{title:'Lista de preinscripciones',soloEst:arrayAllEst,llaves:listaLlaves,soloEle:arrayAllElec});*/
            var contador = 0;
            console.log(electConEst);
            for(var key in electConEst){
                arrayGEst[contador] = [];
                arrayGEst[contador].push({nombreElectiva: String(key), estudiantes: electConEst[key]});
                contador++;
            }

            refGA.update({
                GruposAsignados: arrayGEst
            });

            res.json("OK");
        }, function (errorObject) {
            console.log("The read failed program: " + errorObject.code);
        });
        
    }, function (errorObject) {
        console.log("The read failed preinscription: " + errorObject.code);
    });

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

employeeCtrl.guardarSolEst = (req,res) => {
    var db = admin.database();
    var ref = db.ref('PreinscripcionesPrueba');
    var vreq = req.body;
    var list;
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once("value", function(snapshot) {
        list = snapshot.val();
        console.log("Llaves");
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
                promedioCarrera:vreq[i].PromedioCarrera,
                Codigo: parseInt(vreq[i].Codigo)
            });
        }

        res.json("funciono?");

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

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

module.exports = employeeCtrl;


//Funciones

function filtrarLista(lista){
    var listaFil = [];
    for(var i = 0;i < lista.length; i++){
        var electA = lista[i].electivasAprobadas;
        var electC = lista[i].electivasCursando;
        var electP = lista[i].electivasPrograma;

        var dif = (electA+electC)-electP;
        if(dif>=0){
            continue;
        }else{
            var cantPuedeVer = (-1)*dif;
            lista[i]['CantElectPuedeVer'] = cantPuedeVer;
            listaFil.push(lista[i]);
        }
    }
    return listaFil;
}

function ordenarListaPA(listaFiltrada){
    listaFiltrada.sort(function(a, b){
        var bS = String(b.porcentajeAvance);
        
        var bArr = bS.split(",");
        var bSS = bArr[0] + "." + bArr[1];
        var bF = parseFloat(bSS).toFixed(6);
        
        var aS = String(a.porcentajeAvance);
        
        var aArr = aS.split(",");
        var aSS = aArr[0] + "." + aArr[1];
        var aF = parseFloat(aSS).toFixed(6);

        return bF - aF;
        
    });
    
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
            console.log('Lo lamentamos, por el momento no funciono ' + expr + '.');
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

    
    return electPuedeVer;

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
    
    for(var i = 0;i < listaOrdenadaPA.length; i++){
        //Programa de estudiante en siglas
        
        
        var programaEst = listaOrdenadaPA[i].Programa;
        var solEst = listaOrdenadaPA[i];
        var sigP = obtenerSigProg(programaEst);
        
        //Electivas puede ver
        
        var elecPuedeVer = obtenerElectPuedeVer(solEst, sigP);
        
        
        //Asignar por prioridad
        var electPuedeAsig = 0;
        electPuedeAsig = solEst.CantElectPuedeVer;

        if(solEst.CantElectPuedeVer === 5){
            electPuedeAsig--;
        }

        if(isEmpty(ELECTIVAS)){
            ELECTIVAS = new Array();
            for(var j = 0;j < electPuedeAsig; j++){
                if(j > 0){
                    if(!ELECTIVAS.hasOwnProperty(elecPuedeVer[j])){
                        ELECTIVAS[elecPuedeVer[j]]=[];
                        ELECTIVAS[elecPuedeVer[j]].push({
                            NombreCompleto:solEst.Nombres+" "+solEst.Apellidos,
                            Usuario:solEst.Usuario,
                            PorcentajeAvance:solEst.porcentajeAvance,
                            PromedioCarrera:solEst.promedioCarrera,
                            HoraSolicitud:solEst.HoraSolicitud,
                            Codigo:solEst.Codigo

                        });
                    }else{
                        var electiva = ELECTIVAS[elecPuedeVer[j]]; 
                        var estIngreUlt = electiva[electiva.length-1];
                        if(estIngreUlt.Usuario != solEst.Usuario){
                            ELECTIVAS[elecPuedeVer[j]].push({
                                NombreCompleto:solEst.Nombres+" "+solEst.Apellidos,
                                Usuario:solEst.Usuario,
                                PorcentajeAvance:solEst.porcentajeAvance,
                                PromedioCarrera:solEst.promedioCarrera,
                                HoraSolicitud:solEst.HoraSolicitud,
                                Codigo:solEst.Codigo
                            });
                        }
                    }
                }else{
                    ELECTIVAS[elecPuedeVer[j]]=[];
                    ELECTIVAS[elecPuedeVer[j]].push({
                        NombreCompleto:solEst.Nombres+" "+solEst.Apellidos,
                        Usuario:solEst.Usuario,
                        PorcentajeAvance:solEst.porcentajeAvance,
                        PromedioCarrera:solEst.promedioCarrera,
                        HoraSolicitud:solEst.HoraSolicitud,
                        Codigo:solEst.Codigo
                    });
                }
                
            }
            
        }else{
            var cont = 0;
            for(var j = 0;j < elecPuedeVer.length; j++){
                if(cont != electPuedeAsig){
                    if(!ELECTIVAS.hasOwnProperty(elecPuedeVer[j])){
                        ELECTIVAS[elecPuedeVer[j]]=[];
                        ELECTIVAS[elecPuedeVer[j]].push({
                            NombreCompleto:solEst.Nombres+" "+solEst.Apellidos,
                            Usuario:solEst.Usuario,
                            PorcentajeAvance:solEst.porcentajeAvance,
                            PromedioCarrera:solEst.promedioCarrera,
                            HoraSolicitud:solEst.HoraSolicitud,
                            Codigo:solEst.Codigo
                        });
                        cont++;
                    }else{
                        if(ELECTIVAS[elecPuedeVer[j]].length <= 18){
                            var electiva = ELECTIVAS[elecPuedeVer[j]]; 
                            var estIngreUlt = electiva[electiva.length-1];
                            if(estIngreUlt.Usuario != solEst.Usuario){
                                if(electiva.length === 18){//metodo set get cant cupos por electvia
                                    var bS = String(estIngreUlt.PorcentajeAvance);
        
                                    var bArr = bS.split(",");
                                    var bSS = bArr[0] + "." + bArr[1];
                                    var bF = parseFloat(bSS).toFixed(6);

                                    var aS = String(solEst.porcentajeAvance);
        
                                    var aArr = aS.split(",");
                                    var aSS = aArr[0] + "." + aArr[1];
                                    var aF = parseFloat(aSS).toFixed(6);

                                    if(bF === aF){
                                        var bP = String(estIngreUlt.PromedioCarrera);
        
                                        var bArrP = bP.split(",");
                                        var bSSP = bArrP[0] + "." + bArrP[1];
                                        var bFP = parseFloat(bSSP).toFixed(4);

                                        var aP = String(solEst.promedioCarrera);
            
                                        var aArrP = aP.split(",");
                                        var aSSP = aArrP[0] + "." + aArrP[1];
                                        var aFP = parseFloat(aSSP).toFixed(6);

                                        if(bFP === aFP){
                                            var fechaEstU = new Date(estIngreUlt.HoraSolicitud);
                                            var fechaEstS = new Date(solEst.HoraSolicitud);
                                            
                                            if(fechaEstS < fechaEstU) {
                                                ELECTIVAS[elecPuedeVer[j]].splice((electiva.length-1),1);
                                                ELECTIVAS[elecPuedeVer[j]].push({
                                                    NombreCompleto:solEst.Nombres+" "+solEst.Apellidos,
                                                    Usuario:solEst.Usuario,
                                                    PorcentajeAvance:solEst.porcentajeAvance,
                                                    PromedioCarrera:solEst.promedioCarrera,
                                                    HoraSolicitud:solEst.HoraSolicitud,
                                                    Codigo:solEst.Codigo
                                                });

                                                cont++;

                                            }
                                        }else{
                                            if(estIngreUlt.PromedioCarrera < solEst.promedioCarrera){
                                                ELECTIVAS[elecPuedeVer[j]].splice((electiva.length-1),1);
                                                ELECTIVAS[elecPuedeVer[j]].push({
                                                    NombreCompleto:solEst.Nombres+" "+solEst.Apellidos,
                                                    Usuario:solEst.Usuario,
                                                    PorcentajeAvance:solEst.porcentajeAvance,
                                                    PromedioCarrera:solEst.promedioCarrera,
                                                    HoraSolicitud:solEst.HoraSolicitud,
                                                    Codigo:solEst.Codigo
                                                });
                                                cont++;
                                            }
                                        }
                                    }
                                }
                                else{
                                    ELECTIVAS[elecPuedeVer[j]].push({
                                        NombreCompleto:solEst.Nombres+" "+solEst.Apellidos,
                                        Usuario:solEst.Usuario,
                                        PorcentajeAvance:solEst.porcentajeAvance,
                                        PromedioCarrera:solEst.promedioCarrera,
                                        HoraSolicitud:solEst.HoraSolicitud,
                                        Codigo:solEst.Codigo
                                    });
                                    cont++;
                                }
                            }           
                        }                        
                    }
                }else{
                    break;
                }

            }
            
        }

    }


    return ELECTIVAS;

}



/*function obtener_ElectPuedeVer(estudiante, electivas){

    for(j=0;j<estudiante[1].length;j++){
        for(i=0;i<electivas.length;i++){
            if(electivas[i] === estudiante[1][j]){

            }
        }
    }   
    
    return linea[1];
}*/