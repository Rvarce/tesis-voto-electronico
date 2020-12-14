'use strict'
var axios = require('axios')
//var sampleImg = require('../base64/sampleB64')

exports.start = function(req, res, next) {
    let url = 'http://localhost:3700/Autenticacion/autenticar_elector'
    var elector = ''
    //res.render('index')
    let intermediate = {data: req.body.intermediate}
    axios.post(url, intermediate).then( (response) => {
        //console.log(response.data.elector[0].nombre)
        if(response.data.elector[0]){
            elector = response.data.elector[0]
        }
        res.render('index', {elector})
    } )
}