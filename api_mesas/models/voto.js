'use strict'

//Cargo modulo de mongoose
var mongoose = require('mongoose')

//Uso los esquemas de mongoose
var Schema = mongoose.Schema

//Creo el objeto del esquema y sus atributos, Usado para presidente
var votoSchema = Schema ({
    voto: String
})
module.exports =  mongoose.model('voto', votoSchema)