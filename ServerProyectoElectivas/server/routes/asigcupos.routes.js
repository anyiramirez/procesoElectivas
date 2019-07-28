const express = require('express'); 
const router = express.Router();
const employee = require('../controllers/employee.controller');
//const cors = require('cors');


// get methods 

router.get('/', employee.ASIGELECT);
router.post('/AsigCuposXLSX', employee.ASIGELECTP);


router.get('/solEst', employee.PIAI);
router.get('/piai', employee.PIAI);
router.get('/piet', employee.PIET);
router.get('/electivasCE', employee.obtenerElectivasCuposEst);
router.get('/listarElectivas', employee.listarElectivas);
router.get('/electivaPorNombre/:id', employee.obtenerElectivaPorNombre);
router.get('/obtenerOfertas', employee.getOfertas);
router.get('/electivasPrograma/:programa', employee.electivasPrograma);
router.get('/listarUsuarios', employee.listarUsuarios);
// post methods 

router.post('/registrarElectivas', employee.registrarElectivas);
router.post('/registrarUsuarios', employee.registrarUsuarios);
router.post('/registrarOfertas/', employee.registrarOfertas);
router.post('/editarElectiva/:id', employee.editarElectiva);
router.post('/solEst', employee.guardarSolEst);
router.post('/habilitarElectiva/:id', employee.habilitarElectiva);
router.post('/registrarInscripcion', employee.registrarInscripcion);
//router.post('/ofertarElectiva/ :nombre/:anio/:periodo:/estado', employee.ofertarElectiva);






/*router.get('/', function(req, res){
   console.log("holi");
});*/

module.exports = router;

