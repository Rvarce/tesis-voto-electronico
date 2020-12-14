'use strict'
var express = require('express');
var autenticacionController = require('../controller/indexController')
var startController = require('../controller/startController')
var router = express.Router();

/* GET users listing. */
router.get('/', autenticacionController.index);
router.post('/aceptar', startController.start);

module.exports = router;