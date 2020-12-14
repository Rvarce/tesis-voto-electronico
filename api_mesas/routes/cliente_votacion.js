'use strict'

var express = require('express')
var clienteVotacionController = require('../controllers/cliente_votacion')
var verificacionToken = require('../middlewares/tokenverify')
var conexiones = require('../middlewares/configcx')
var router = express.Router()

router.use(conexiones.conexionPrincipal)
router.use(verificacionToken.verificacion)

router
    .get('/test', clienteVotacionController.test)
    .get('/codigo_aut/:cliente', clienteVotacionController.getCodAutorizacion)
    .post('/guardar_cliente', clienteVotacionController.saveCliente)
    .get('/obtener_clientes', clienteVotacionController.getClientes)
    .get('/obtener_cliente', clienteVotacionController.getCliente)
    .put('/actualizar_estado', clienteVotacionController.updtateEstadoCliente)
    .delete('/eliminar_cliente/:id', clienteVotacionController.deleteCliente)
        
module.exports = router