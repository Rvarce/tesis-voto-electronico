'use strict'
//Gestiona la conexion a las bases de datos mongo
var conexiones = {
    conexionPadron: (res, req, next) => {
        var mongoose = require('mongoose')
        var db = require('../config/default.json')
    
        mongoose.Promise = global.Promise
        mongoose.connect(db.mongoURIpadron, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
                .then(()=>{
                    console.log("Conexion a base de datos padron establecida")      
                    return next()      
                })
                .catch(err => {
                    console.log(err)
                })
      
    
    },
    conexionPrincipal: (res, req, next) => {
        var mongoose = require('mongoose')
        var db = require('../config/default.json')
    
        mongoose.Promise = global.Promise
        mongoose.connect(db.mongoURI, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
                .then(()=>{
                    console.log("Conexion a base de datos principal establecida")     
                    return next()       
                })
                .catch(err => {
                    console.log(err)
                })
        
    
    }
}

module.exports = conexiones