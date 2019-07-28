const express = require('express'); 
const router = express.Router();
const asigRol = require('../controllers/adminAsigRol.controller');

router.get('/confirmarcorreo', asigRol.enviarCorreo);
router.get('/holi/:correo', asigRol.holi);



module.exports = router;