'use strict'

var express = require('express')
var votacionController = require('../controllers/votacion')
var verificacionToken = require('../middlewares/tokenverify')
var conexiones = require('../middlewares/configcx')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart({uploadDir: './fingerprint'})
var router = express.Router()

router.use(verificacionToken.verificacion)

router
    .get('/test', votacionController.test)
    .get('/candidatos/:cargo', conexiones.conexionPrincipal, votacionController.getCandidatos)
    .put('/actualizar_candidatos/:id', conexiones.conexionPrincipal, votacionController.updateCandidato)
    .post('/guardar_candidatos', conexiones.conexionPrincipal, votacionController.saveCandidato)
    .delete('/eliminar_candidato/:id', conexiones.conexionPrincipal, votacionController.deleteCandidato)
    .get('/padron', conexiones.conexionPadron, votacionController.getPadron)
    .post('/guardar_elector', conexiones.conexionPadron, votacionController.saveElector)
    .post('/guardar_voto/:cargo', conexiones.conexionPrincipal, votacionController.saveVoto)
    .put('/padron_update_estado/:id', conexiones.conexionPadron, votacionController.updateEstadoElector)
    .put('/padron_fingerprint/:id', multipartMiddleware, conexiones.conexionPadron, votacionController.uploadFingerprint)
    .delete('/eliminarvoto/:id', conexiones.conexionPrincipal, votacionController.deleteVoto)
    .get('/delete_votos', conexiones.conexionPrincipal, votacionController.deleteVotos)

module.exports = router