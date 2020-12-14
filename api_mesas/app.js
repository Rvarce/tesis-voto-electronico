'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

//Archivos de Rutas
var votacionRutas = require('./routes/votacion')
var escrutinioMesaRutas = require('./routes/escrutinio_mesa')
var autenticacionRutas = require('./routes/autenticacion')
var clienteVotacionRutas = require('./routes/cliente_votacion')

//Middewares
app
    .use(bodyParser.urlencoded({extended:false}))
    .use(bodyParser.json())


//Cabecera y cors
app
    .use((req, res, next) => {
        res
            .header('Access-Control-Allow-Origin', '*')
            .header('Access-Control-Allow-Headers', 'Access-token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
            .header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT')
            .header('Allow', 'GET, POST, OPTIONS, PUT')
            next()
    })

//Rutas
app
    .use('/votacion', votacionRutas)
    .use('/escrutinio_mesa', escrutinioMesaRutas)
    .use('/autenticacion', autenticacionRutas)
    .use('/cliente_votacion', clienteVotacionRutas)

//Exportacion
module.exports = app