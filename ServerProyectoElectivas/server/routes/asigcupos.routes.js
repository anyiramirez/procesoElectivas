const express = require('express'); 
const router = express.Router();
const employee = require('../controllers/employee.controller');
//const cors = require('cors');


// get methods 

router.get('/', employee.ASIGELECT);


router.get('/solEst', employee.PIAI);
router.get('/piai', employee.PIAI);
router.get('/piet', employee.PIET);
router.get('/electivasCE', employee.obtenerElectivasCuposEst);
router.get('/listarElectivas', employee.listarElectivas);
router.get('/electivaPorNombre/:id', employee.obtenerElectivaPorNombre);

// post methods 

router.post('/registrarElectivas', employee.registrarElectivas);
router.post('/editarElectiva', employee.editarElectiva);
router.post('/solEst', employee.guardarSolEst);
router.post('/habilitarElectiva', employee.habilitarElectiva);





/*router.get('/', function(req, res){
   console.log("holi");
});*/

module.exports = router;

