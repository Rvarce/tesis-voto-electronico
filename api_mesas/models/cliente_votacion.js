'use strict'

//Cargo modulo de mongoose
var mongoose = require('mongoose')

//Uso los esquemas de mongoose
var Schema = mongoose.Schema

//Creo el objeto del esquema y sus atributos
var clienteVotacion = Schema ({
    nombre: String,
    codAutorizacion: Number,
    estadoAcceso: Boolean,
    estadoBloqueo: Boolean
})
module.exports =  mongoose.model('cliente_votacion', clienteVotacion)