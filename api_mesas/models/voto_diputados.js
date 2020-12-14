'use strict'

//Cargo modulo de mongoose
var mongoose = require('mongoose')

//Uso los esquemas de mongoose
var Schema = mongoose.Schema

//Creo el objeto del esquema y sus atributos
var votoDiputadoSchema = Schema ({
    voto: String
})
module.exports =  mongoose.model('voto_diputado', votoDiputadoSchema)