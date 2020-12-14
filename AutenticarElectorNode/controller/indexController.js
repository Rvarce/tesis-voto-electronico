'use strict'

exports.index = function(req, res, next) {
    var elector = ''
    res.render('index', {elector})
}

exports.aceptar = function(req, res, next) {
    console.log('Hola desde aceptar')
  
}