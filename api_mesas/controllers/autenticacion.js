'use strict'
//const config = require('../config/config')
const jwt = require('jsonwebtoken')
const clienteVotacion = require('../models/cliente_votacion')
const lectorController = require('../autenticarElector/verificar')
const fs = require('fs')

var controller = {
    test: (req, res) => {
        return res.status(200).send({
            message: "Test controlador autenticacion ok"
        })
    },
    authApp: (req, res) => {
        let cliente = req.body
        console.log('cliente: ', cliente)
        if (cliente == [] && cliente.nombre == null && cliente.codAutorizacion == null) {
            return res.status(401).send({ message: "El nombre y codAutorizacion son obligatorios" })
        }

        clienteVotacion.find({ nombre: cliente.nombre })
            .then(clienteResponse => {
                if(!clienteResponse)  return res.status(401).send({ message: 'Nombre o Código autorización inválido' })

                if (clienteResponse[0].nombre == cliente.nombre && clienteResponse[0].codAutorizacion === cliente.codAutorizacion) {
                   
                    const payload = {
                        sub: clienteResponse[0]._id,
                        iat: Date.now(),
                        username: clienteResponse[0].nombre
                    }
                    const key = fs.readFileSync('config/jwtRS256.key')
                    console.log(key)
                    const token = jwt.sign(JSON.stringify(payload), key, { algorithm: 'RS512'}, { expiresIn: 86400 })
                 
                    return res.status(200).send({
                        message: 'Autenticacion correcta',
                        token: token,
                        idMDB: clienteResponse[0]._id
                    })
                }
                else {
                    return res.status(401).send({ message: 'Nombre o Código autorización inválido' })
                }

            })
            .catch( err =>  {return res.status(400).send({ message: err })})
    },
    authElector: (req, res) => {
        var result = lectorController.autElector;
        return res.status(401).send({ result })
    }

     //,
    // authElector: (req, res) => {
    //     lectorController.demofunction({}, function (err, result) {
    //         if (err) {
    //             throw err;
    //         }
    //         var array = result.split(' ')
    //         console.log(array);
    //     })
    // }
}

module.exports = controller