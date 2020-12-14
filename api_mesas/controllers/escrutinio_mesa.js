'use strict'
var Voto = require('../models/voto')
var Acta = require('../models/acta')
var Elector = require('../models/elector')
var Mesa = require('../models/mesa')
const NodeRSA = require('node-rsa')
var key = require('../config/config')
var axios = require('axios').default
const voto_diputados = require('../models/voto_diputados')
const voto_senadores = require('../models/voto_senadores')

var controller = {
    test: (req, res) => {
        return res.status(200).send({
            message: "Test de escrutinio por mesa"
        })
    },
    saveMesa: (req, res) => {
        let params = req.body
        console.log(evento)
        let mesa = new Mesa()
        //Faltan validaciones
        if (params === null) return res.status(400).send({ message: "Los datos son requeridos" })

        Mesa.find({ codigo: '101M' })
            .then(result => {
                if (result) {
                    //En prototipo solo se permitirá la cracion de una mesa
                    return res.send({ message: 'Esta mesa ya realizó la apertura' })
                }
            })
            .catch(err => { return res.send({ message: err }) })

        mesa.codigo = '101M'
        mesa.presidente = params.presidente
        mesa.secretario = params.secretario
        mesa.vocales = params.vocales
        mesa.horaApertura = params.horaApertura
        mesa.horaCierre = params.horaCierre
        mesa.estado = false

        mesa.save()
            .then(mesaStored => { return res.status(200).send({ mesa: mesaStored }) })
            .catch(err => { return res.status(500).send({ message: `Error al guardar el documento: ${err}` }) })
    },
    updateEstadoMesa: (req, res) => {
        let mesa = req.body
        Mesa.findOneAndUpdate(
            { _id: mesa._id },
            { estado: mesa.estado },
            { new: true }
        )
            .then(mesaStored => { return res.status(200).send({ estado: mesaStored.estado }) })
            .catch(err => { return res.status(500).send({ message: `Error al guardar el documento: ${err}` }) })
    },
    //Obtiene array con el total de electores por estado
    //True votaron
    //False no votaron
    getTotalVotantes: (req, res) => {
        Elector.find({})
            .then(electores => {
                const electoresEstado = []
                electores.forEach(e => electoresEstado.push(e.estado))

                const result = electoresEstado.reduce((contadorElector, estado) => {
                    contadorElector[estado] = (contadorElector[estado] || 0) + 1
                    return contadorElector
                }, {})

                return res.status(200).send({ result })
            })
            .catch(err => { return res.status(404).send({ message: `No fue posible obtener el conteo del total de electores: ${err}` }) })
    },
    //Entrega total de votos
    getTotalVotos: (req, res) => {
        Promise.all(
            [Voto.find({}),
            voto_diputados.find({}),
            voto_senadores.find({})]
        ).then((result) => {
            let total = result[0].length + result[1].length + result[2].length
            return res.status(200).send({ votos: total })
        })
            // Voto.find({})
            //     .then(votos => { return res.status(200).send({ votos: votos.length }) })
            .catch(err => { return res.status(404).send({ message: `No fue posible obtener el conteo del total de votos: ${err}` }) })
    },
    getTotalVotosDiputados: (req, res) => {
        voto_diputados.find({})
            .then(votos => { return res.status(200).send({ votos: votos }) })
            .catch(err => { return res.status(404).send({ message: `No fue posible obtener el conteo del total de votos: ${err}` }) })
    },
    getTotalVotosSenadores: (req, res) => {
        voto_senadores.find({})
            .then(votos => { return res.status(200).send({ votos: votos }) })
            .catch(err => { return res.status(404).send({ message: `No fue posible obtener el conteo del total de votos: ${err}` }) })
    },
    //Entrega listado de los votos
    getVotos: (req, res) => {
        Voto.find({})
            .then(votos => { return res.status(200).send({ votos: votos }) })
            .catch(err => { return res.status(404).send({ message: `No fue posible obtener el conteo del total de votos: ${err}` }) })
    },
    //Obtiene resultado por candidato y votos en blanco
    getResultadoPresidente: (req, res) => {
        let publicK = key.public
        let privateK = key.private
        const public_key = new NodeRSA(publicK)
        const private_key = new NodeRSA(privateK)

        Voto.find({})
            .then(votos => {
                //Desencriptar votos
                let result = votos
                    .map(candidato => { return private_key.decrypt(candidato.voto, 'utf8') })
                    .reduce((contadorVoto, voto) => {
                        contadorVoto[voto] = (contadorVoto[voto] || 0) + 1
                        return contadorVoto
                    }, {})

                //candidatos = null
                //let resultado = JSON.stringify(result)
                //encriptar resutado
                //let resultEncrypted = public_key.encrypt(resultado, 'base64')
                return res.status(200).send({ result })
                //return resultado
            })
            .catch(err => { return { message: `No fue posible obtener los votos: ${err}` } })
        //.catch(err => { return res.status(404).send({ message: `No fue posible obtener los votos: ${err}` }) })
    },
    getResultadoSenadores: (req, res) => {
        let publicK = key.public
        let privateK = key.private
        const public_key = new NodeRSA(publicK)
        const private_key = new NodeRSA(privateK)

        voto_senadores.find({})
            .then(votos => {
                //Desencriptar votos
                let result = votos
                    .map(candidato => { return private_key.decrypt(candidato.voto, 'utf8') })
                    .reduce((contadorVoto, voto) => {
                        contadorVoto[voto] = (contadorVoto[voto] || 0) + 1
                        return contadorVoto
                    }, {})

                //candidatos = null
                //let resultado = JSON.stringify(result)
                //encriptar resutado
                //let resultEncrypted = public_key.encrypt(resultado, 'base64')
                return res.status(200).send({ result })
                //return resultado
            })
            .catch(err => { return { message: `No fue posible obtener los votos: ${err}` } })
        //.catch(err => { return res.status(404).send({ message: `No fue posible obtener los votos: ${err}` }) })
    },
    getResultadoDiputados: (req, res) => {
        let publicK = key.public
        let privateK = key.private
        const public_key = new NodeRSA(publicK)
        const private_key = new NodeRSA(privateK)

        voto_diputados.find({})
            .then(votos => {
                //Desencriptar votos
                let result = votos
                    .map(candidato => { return private_key.decrypt(candidato.voto, 'utf8') })
                    .reduce((contadorVoto, voto) => {
                        contadorVoto[voto] = (contadorVoto[voto] || 0) + 1
                        return contadorVoto
                    }, {})

                //candidatos = null
                //let resultado = JSON.stringify(result)
                //encriptar resutado
                //let resultEncrypted = public_key.encrypt(resultado, 'base64')
                return res.status(200).send({ result })
                //return resultado
            })
            .catch(err => { return { message: `No fue posible obtener los votos: ${err}` } })
        //.catch(err => { return res.status(404).send({ message: `No fue posible obtener los votos: ${err}` }) })
    },
    //Obtiene el acta
    getActa: (req, res) => {
        //let publicK = key.public
        //let privateK = key.private
        //const public_key = new NodeRSA(publicK)
        // const private_key = new NodeRSA(privateK)
        // let resultadoPresidente
        // let resultadoDiputados
        // let resultadoSenadores
        // let acta = new Acta()

        // //Cuento votos presidente
        // Voto.find({})
        //     .then(votos => {
        //         //Desencriptar votos
        //         let candidatos = []
        //         votos.forEach(e => {
        //             let decrypted = private_key.decrypt(
        //                 e.voto,
        //                 'utf8'
        //             )
        //             candidatos.push(decrypted)
        //         })

        //         let result = candidatos.reduce((contadorVoto, voto) => {
        //             contadorVoto[voto] = (contadorVoto[voto] || 0) + 1
        //             return contadorVoto
        //         }, {})

        //         resultadoPresidente = JSON.stringify(result)

        //     })
        //     .catch(err => { return { message: `No fue posible obtener los votos: ${err}` } })

        // //Cuento votos dupitados
        // voto_diputados.find({})
        //     .then(votos => {
        //         //Desencriptar votos
        //         let candidatos = []
        //         votos.forEach(e => {
        //             let decrypted = private_key.decrypt(
        //                 e.voto,
        //                 'utf8'
        //             )
        //             candidatos.push(decrypted)
        //         })

        //         let result = candidatos.reduce((contadorVoto, voto) => {
        //             contadorVoto[voto] = (contadorVoto[voto] || 0) + 1
        //             return contadorVoto
        //         }, {})

        //         resultadoDiputados = JSON.stringify(result)

        //     })
        //     .catch(err => { return { message: `No fue posible obtener los votos: ${err}` } })

        // //Cuento votos senadores
        // voto_senadores.find({})
        //     .then(votos => {
        //         //Desencriptar votos
        //         let candidatos = []
        //         votos.forEach(e => {
        //             let decrypted = private_key.decrypt(
        //                 e.voto,
        //                 'utf8'
        //             )
        //             candidatos.push(decrypted)
        //         })

        //         let result = candidatos.reduce((contadorVoto, voto) => {
        //             contadorVoto[voto] = (contadorVoto[voto] || 0) + 1
        //             return contadorVoto
        //         }, {})

        //         resultadoSenadores = JSON.stringify(result)

        //     })
        //     .catch(err => { return { message: `No fue posible obtener los votos: ${err}` } })


        Acta
            .find({})
            .then(acta => { return res.status(200).send(JSON.stringify(acta)) })
            .catch(err => { return res.status(500).send({ message: `Ocurrio un error al intentar recuperar el acta: ${err}` }) })
    },
    //Guardar acta
    saveActa: (req, res) => {
        const params = req.body
        let acta = new Acta()
        console.log(params)
        //Validaciones parametros
        if (params.uuid == null) { return res.status(400).send({ message: `El uuid es requerido` }) }
        if (params.mesa == null) { return res.status(400).send({ message: `La mesa es requerido` }) }
        if (params.totalElectores == null) { return res.status(400).send({ message: `El totalElectores es requerido` }) }
        if (params.totalQrImpresos == null) { return res.status(400).send({ message: `El totalQrImpresos es requerido` }) }
        if (params.totalSufragiosEmitidos == null) { return res.status(400).send({ message: `El totalSufragiosEmitidos es requerido` }) }
        if (params.resultados == null) { return res.status(400).send({ message: `El resultados es requerido` }) }

        acta.uuid = params.uuid
        acta.formulario = params.formulario
        acta.comuna = params.comuna
        acta.region = params.region
        acta.local = params.local
        acta.mesa = params.mesa
        acta.circunscripcion = params.circunscripcion
        acta.fecha = params.fecha
        acta.presidente = params.presidente
        acta.secretario = params.secretario
        acta.comisario = params.comisario
        acta.vocales = params.vocales
        acta.apoderados = params.apoderados
        acta.horaApertura = params.horaApertura
        acta.horaCierre = params.horaCierre
        acta.totalElectores = params.totalElectores
        acta.totalQrImpresos = params.totalQrImpresos
        acta.totalSufragiosEmitidos = params.totalSufragiosEmitidos
        acta.resultados = params.resultados
        acta.totalNoVidentes = params.totalNoVidentes
        acta.totalVotacionAsistida = params.totalVotacionAsistida
        acta.observaciones = params.observaciones

        acta.save()
            .then(actaStored => { return res.status(200).send({ acta: actaStored }) })
            .catch(err => { return res.status(500).send({ message: `Error al guardar el acta: ${err}` }) })
    },
    //Enviar acta a pasareta
    sendActa: (req, res) => {
        const acta = req.body
        const postData = JSON.stringify(acta)
        //Pendiente implementacion pasarela
        const url = 'http://localhost:3000/pasarela_mesas/test'
        axios.post(url, postData)
            .then(respuesta => { return res.status(200).send(respuesta.data) })//return res.status(200).send(respuesta)
            .catch(err => { return res.status(500).send({ message: `Error al enviar acta: ${err}` }) })

    }

}

module.exports = controller