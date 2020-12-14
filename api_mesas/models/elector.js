'use strict'

//Cargo modulo de mongoose
var mongoose = require('mongoose')

//Uso los esquemas de mongoose
var Schema = mongoose.Schema

//Creo el objeto del esquema y sus atributos
//Padron electoral
var electorSchema = Schema({
    correlativo: Number,
    nombre: String,
    apellidoPat: String,
    apellidoMat: String,
    identificacionNacional: String,
    huellaArchivo: String,
    huellaImagen: String,
    estado: Boolean
})

module.exports =  mongoose.model('electors', electorSchema)