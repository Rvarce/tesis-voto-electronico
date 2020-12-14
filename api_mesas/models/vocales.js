'use strict'

//Cargo modulo de mongoose
var mongoose = require('mongoose')

//Uso los esquemas de mongoose
var Schema = mongoose.Schema

//Creo el objeto del esquema y sus atributos
var vocalesSchema = Schema({
    nombre: String,
    apellido: String,
    identificadorNacional: String,
    cargo: String,
    mesa: String,
    uuid: String,
    huellaMinucias: String,
    huellaImagen: String,
})

module.exports = mongoose.model('vocal', vocalesSchema)