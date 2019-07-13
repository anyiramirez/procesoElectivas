const express = require('express'); 
const router = express.Router();
const login = require('../controllers/login.controller');

router.get('/', login.login);
router.post('/user', login.user);

module.exports = router;