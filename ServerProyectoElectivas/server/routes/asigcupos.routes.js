const express = require('express'); 
const router = express.Router();
const employee = require('../controllers/employee.controller');
//const cors = require('cors');


// get methods 

router.get('/', employee.ASIGELECT);
router.post('/AsigCuposXLSX/:id', employee.ASIGELECTP);


router.get('/solEst', employee.PIAI);
router.get('/piai', employee.PIAI);
router.get('/piet', employee.PIET);
router.get('/electivasCE', employee.obtenerElectivasCuposEst);
router.get('/listarElectivas', employee.listarElectivas);
router.get('/electivaPorNombre/:id', employee.obtenerElectivaPorNombre);
router.get('/obtenerOfertas', employee.getOfertas);
router.get('/electivasPrograma/:programa', employee.electivasPrograma);
router.get('/listarUsuarios', employee.listarUsuarios);
router.get('/periodosIDs', employee.periodosIDs);
router.get('/rechazadosIDs', employee.rechazadosIDs);
router.get('/obtenerInscritos/:id', employee.obtenerInscritos);
router.get("/obtenerRechazados/:id", employee.obtenerRechazados);

// post methods 
router.post('/registrarElectivas', employee.registrarElectivas);
router.post('/registrarUsuarios', employee.registrarUsuarios);
router.post('/registrarOfertas/', employee.registrarOfertas);
router.post('/editarOferta/', employee.editarOferta);
router.post('/editarElectiva/:id', employee.editarElectiva);
router.post('/editarRol/:id', employee.editarRol);
router.post('/solEst', employee.guardarSolEst);
router.post('/habilitarElectiva/:id', employee.habilitarElectiva);
router.post('/registrarInscripcion', employee.registrarInscripcion);
//router.post('/ofertarElectiva/ :nombre/:anio/:periodo:/estado', employee.ofertarElectiva);






/*router.get('/', function(req, res){
   console.log("holi");
});*/

module.exports = router;

