'use strict'

//Cargo modulo de mongoose
var mongoose = require('mongoose')

//Uso los esquemas de mongoose
var Schema = mongoose.Schema

//Creo el objeto del esquema y sus atributos
var candidatoSchema = Schema({
    nombre: String,
    apellidoPat: String,
    apellidoMat: String,
    cargo: String,
    pacto: String,
    partido: String,
    apoyoPolitico: String,
    numeroLista: Number,
    imagen: String,
    uuid: String
})

module.exports =  mongoose.model('candidato', candidatoSchema)