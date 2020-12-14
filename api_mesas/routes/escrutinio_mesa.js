'use strict'

var express = require('express')
var escrutinioMesaController = require('../controllers/escrutinio_mesa')
var verificacionToken = require('../middlewares/tokenverify')
var conexiones = require('../middlewares/configcx')
var router = express.Router()

router.use(verificacionToken.verificacion)

router
    .get('/test', escrutinioMesaController.test)
    .get('/total_votantes', conexiones.conexionPadron, escrutinioMesaController.getTotalVotantes)
    .get('/total_votos', conexiones.conexionPrincipal, escrutinioMesaController.getTotalVotos)
    .get('/total_votos_diputados', conexiones.conexionPrincipal, escrutinioMesaController.getTotalVotosDiputados)
    .get('/total_votos_senadores', conexiones.conexionPrincipal, escrutinioMesaController.getTotalVotosSenadores)
    .get('/total_votos_presidente', conexiones.conexionPrincipal, escrutinioMesaController.getVotos)
    .get('/consultar_acta', conexiones.conexionPrincipal, escrutinioMesaController.getActa)
    .post('/enviar_acta', conexiones.conexionPrincipal, escrutinioMesaController.sendActa)
    .post('/guardar_acta', conexiones.conexionPrincipal, escrutinioMesaController.saveActa)
    .get('/obtener_resultado_presidente', conexiones.conexionPrincipal, escrutinioMesaController.getResultadoPresidente)
    .get('/obtener_resultado_senadores', conexiones.conexionPrincipal, escrutinioMesaController.getResultadoSenadores)
    .get('/obtener_resultado_diputados', conexiones.conexionPrincipal, escrutinioMesaController.getResultadoDiputados)
    .post('/crear_mesa', conexiones.conexionPrincipal, escrutinioMesaController.saveMesa)
    .put('/actualizar_estado_mesa', conexiones.conexionPrincipal, escrutinioMesaController.updateEstadoMesa)
    
module.exports = router