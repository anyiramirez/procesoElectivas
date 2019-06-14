const express = require('express'); 
const router = express.Router();
const employee = require('../controllers/employee.controller');
//const cors = require('cors');



router.get('/', employee.ASIGELECT);

router.post('/solEst', employee.guardarSolEst);
router.get('/solEst', employee.PIAI);
router.get('/piai', employee.PIAI);
router.get('/piet', employee.PIET);

router.get('/electivasCE', employee.obtenerElectivasCuposEst);




/*router.get('/', function(req, res){
   console.log("holi");
});*/

module.exports = router;

