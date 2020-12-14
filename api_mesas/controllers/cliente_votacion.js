'use strict'

const clienteVotacion = require('../models/cliente_votacion')

var controller = {
    test: (req, res) => {
        return res.status(200).send({
            message: "Test controlador cliente votacion ok"
        })
    },
    getCodAutorizacion: (req, res) => {
        let idCliente = req.params.cliente
        let codAutorizacion = (Math.random() * 10000 / 2).toFixed()

        clienteVotacion
                        .findOneAndUpdate(
                            { _id: idCliente },
                            { codAutorizacion: codAutorizacion },
                            { new: true }
                        )
                        .then(codStored => { 
                            if(!codStored) { return res.status(400).send({ message: `Cliente no existe` })}
                            return res.status(200).send({ cod: codStored }) 
                        })
                        .catch(err => { return res.status(500).send({ message: `Error al guardar el documento: ${err}` }) })
    },
    saveCliente: (req, res) => {
        let params = req.body
        console.log(params)
        let cliente = new clienteVotacion()

        if (params === null) return res.status(400).send({ message: "Los datos son requeridos" })
        
        cliente.nombre = params.nombre
        cliente.estadoAcceso = params.estadoAcceso
        cliente.estadoBloqueo = params.estadoBloqueo
        
        cliente.save()
            .then(clienteStored => { return res.status(200).send({ cliente: clienteStored }) })
            .catch(err => { return res.status(500).send({ message: `Error al guardar el documento: ${err}` }) })
    },
    getClientes: (req, res) => {
        clienteVotacion.find({})
                        .then(clientes => { return res.status(200).send({ clientes }) })
                        .catch(err => { return res.status(404).send({ message: `No fue posible obtener los clientes de votacion: ${err}` }) })
    },
    getCliente: (req, res) => {
        let idCliente = req.decoded.sub

        clienteVotacion.find({_id: idCliente})
                        .then(cliente => { return res.status(200).send({ estado: cliente[0].estadoAcceso }) })
                        .catch(err => { return res.status(404).send({ message: `No fue posible obtener los clientes de votacion` }) })
    },
    updtateEstadoCliente: (req, res) => {
        let cliente = req.body
      
        clienteVotacion
                        .findOneAndUpdate(
                            { _id: cliente._id },
                            { estadoAcceso: cliente.estadoAcceso },
                            { new: true }
                        )
                        .then(clienteStored => { return res.status(200).send({ estado: clienteStored.estadoAcceso }) })
                        .catch(err => { return res.status(500).send({ message: `Error al guardar el documento: ${err}` }) })
    },
    //Solo para pruebas
    deleteCliente: (req, res) => {
        let _id = req.params.id

        clienteVotacion
            .findOneAndDelete(
                { _id: _id },
                { isEndangered: false }
            )
            .then(()=> {return res.status(200).send({ message: 'Eliminacion correcta' })})
            .catch( err => console.log(`Ocurio un error el eliminar ${err}`))
    }
}

module.exports = controller