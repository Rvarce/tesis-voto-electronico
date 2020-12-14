'use strict'

//Cargo modulo de mongoose
var mongoose = require('mongoose')

//Uso los esquemas de mongoose
var Schema = mongoose.Schema

//Creo el objeto del esquema y sus atributos
var actaSchema = Schema( {
    uuid: String,
    formulario: String,
    comuna: String,
    region: String,
    local: String,
    mesa: String,
    circunscripcion: String,
    fecha: Date,
    presidente: String, 
    secretario: String,
    comisario: String,
    vocales: String,
    apoderados: String,
    horaApertura: String,
    horaCierre: String,
    totalElectores: Number,
    totalQrImpresos: Number,
    totalSufragiosEmitidos: Number,
    resultados: String,
    totalNoVidentes: Number,
    totalVotacionAsistida: Number,
    observaciones: String
})

module.exports = mongoose.model('acta', actaSchema)