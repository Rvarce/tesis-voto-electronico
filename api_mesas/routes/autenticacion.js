'use strict'

var express = require('express')
var autenticacionController = require('../controllers/autenticacion')
var conexiones = require('../middlewares/configcx')
var lectorController = require('../autenticarElector/verificar')
var router = express.Router()

router.use(conexiones.conexionPrincipal)

router
    .get('/test', autenticacionController.test)
    .post('/autenticar', autenticacionController.authApp)
    .post('/autenticar_elector', conexiones.conexionPadron, lectorController.autElector)
    
module.exports = router