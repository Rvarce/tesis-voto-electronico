'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
//ar cookieParser = require('cookie-parser')
var app = express()

//Archivos de Rutas
var autenticacion = require('./routes/autenticacion')
// var escrutinioMesaRutas = require('./routes/escrutinio_mesa')
// var autenticacionRutas = require('./routes/autenticacion')
// var clienteVotacionRutas = require('./routes/cliente_votacion')

//Middewares
app
    .use(bodyParser.urlencoded({extended:false}))
    .use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

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
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    //app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')))
//Rutas
app
    .use('/', autenticacion)
//     .use('/escrutinio_mesa', escrutinioMesaRutas)
//     .use('/autenticacion', autenticacionRutas)
//     .use('/cliente_votacion', clienteVotacionRutas)

//Exportacion
module.exports = app