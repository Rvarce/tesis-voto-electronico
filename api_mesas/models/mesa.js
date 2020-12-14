'use strict'

//Cargo modulo de mongoose
var mongoose = require('mongoose')

//Uso los esquemas de mongoose
var Schema = mongoose.Schema

//Creo el objeto del esquema y sus atributos
var mesaSchema = Schema({
    codigo: String,
    presidente: String,
    secretario: String,
    vocales: Array,
    horaApertura: String,
    horaCierre: String,
    estado: Boolean
})

module.exports = mongoose.model('mesa', mesaSchema)