'use strict'

var Candidato = require('../models/candidato')
var Elector = require('../models/elector')
var Voto = require('../models/voto')
var VotoDiputado = require('../models/voto_diputados')
var VotoSenador = require('../models/voto_senadores')
var fs = require('fs')



var controller = {
    test: (req, res) => {
        return res.status(200).send({
            message: "Test controlador votacion ok"
        })
    },
    //Obtiene los candidatos para mostrar en cliente
    getCandidatos: (req, res) => {
        let cargo = req.params.cargo

        if (cargo != 'presidente' && cargo != 'senador' && cargo != 'diputado') {
            return res.status(404).send({ message: `cargo inexistente` })
        }

        Candidato.find({ cargo: cargo })
            .then(candidatos => { return res.status(200).send({ candidatos }) })
            .catch(err => { return res.status(404).send({ message: `No fue posible obtener los candidatos: ${err}` }) })
    },
    //Guarda un candidato, solo pruebas en Postman
    saveCandidato: (req, res) => {
        const params = req.body
        let candidato = new Candidato()

        if (params.uuid == null) return res.status(400).send({ message: "El uuid es requerido" })

        candidato.nombre = params.nombre
        candidato.apellidoPat = params.apellidoPat
        candidato.apellidoMat = params.apellidoMat
        candidato.cargo = params.cargo
        candidato.pacto = params.pacto
        candidato.partido = params.partido
        candidato.apoyoPolitico = params.apoyoPolitico
        candidato.numeroLista = params.numeroLista
        candidato.imagen = params.imagen
        candidato.uuid = params.uuid

        candidato.save()
            .then(candidatoStored => { return res.status(200).send({ candidato: candidatoStored }) })
            .catch(err => { return res.status(500).send({ message: `Error al guardar el documento: ${err}` }) })

    },
    //Solo pruebas en Postman
    updateCandidato: (req, res) => {
        const _id = req.params.id
        const update = req.body
        if (_id == null) return res.status(404).send({ message: 'El id es requerido' })

        Candidato
            .findOneAndUpdate(
                { _id: _id },
                { imagen: update.imagen },
                { new: true }
            )
            .then(candidatoUpdated => { return res.status(200).send({ candidatoUpdated }) })
            .catch(err => { return res.status(500).send({ message: `Error al devolver los datos: ${err}` }) })
    },
    //Solo pruebas en Postman
    deleteCandidato: function (req, res) {
        var _id = req.params.id

        Candidato
            .findOneAndDelete(
                { _id: _id },
                { isEndangered: false }
            )
            .then(() => { return res.status(200).send({ message: 'Eliminacion correcta' }) })
            .catch(err => console.log(`Ocurio un error el eliminar`))
    },
    //Guarda el voto
    saveVoto: (req, res) => {
        const cargo = req.params.cargo
        const jsonBody = req.body
        let voto = new Voto()
        let votoDiputado = new VotoDiputado()
        let votoSenador = new VotoSenador()

        if (jsonBody.voto == null) return res.status(400).send({ message: "El voto es requerido" })
        if (cargo == null) return res.status(400).send({ message: "El cargo es requerido" })

        switch (cargo) {
            case 'presidente':
                voto.voto = jsonBody.voto
                voto.save()
                    .then(votoStored => { return res.status(200).send({ voto: votoStored }) })
                    .catch(err => { return res.status(500).send({ message: `Error al guardar el documento: ${err}` }) })
                break;
            case 'diputado':
                votoDiputado.voto = jsonBody.voto
                votoDiputado.save()
                    .then(votoStored => { return res.status(200).send({ voto: votoStored }) })
                    .catch(err => { return res.status(500).send({ message: `Error al guardar el documento: ${err}` }) })
                break;
            case 'senador':
                votoSenador.voto = jsonBody.voto
                votoSenador.save()
                    .then(votoStored => { return res.status(200).send({ voto: votoStored }) })
                    .catch(err => { return res.status(500).send({ message: `Error al guardar el documento: ${err}` }) })
                break;
        }

    },
    //Guarda un elector solo para pruebas Postman
    saveElector: (req, res) => {
        // const params = req.body
        // let elector = new Elector()

        // if (params.correlativo == null) return res.status(400).send({ message: "El correlativo es requerido" })

        // elector.correlativo = params.correlativo
        // elector.nombre = params.nombre
        // elector.apellidoPat = params.apellidoPat
        // elector.apellidoMat = params.apellidoMat
        // elector.identificacionNacional = params.identificacionNacional
        // elector.huellaMinucias = params.huellaMinucias
        // elector.huellaImagen = params.huellaImagen
        // elector.estado = params.estado

        // elector.save()
        //     .then(electorStored => { return res.status(200).send({ elector: electorStored }) })
        //     .catch(err => { return res.status(500).send({ message: `Error al guardar el documento: ${err}` }) })

        //////

         let elector = new Elector()
            const fs = require('fs')
            const huellaBase64 = fs.readFileSync('autenticarElector/base64/sampleB64.txt')

                elector.correlativo = 1
                elector.nombre = 'CHRISTOPHER ANDRÉS'
                elector.apellidoPat = 'FONSECA'
                elector.apellidoMat = 'CARMONA'
                elector.identificacionNacional = '18569470-4'
                elector.huellaArchivo = 'VAfq0ChRiSToPhEr03.fpt'
                elector.huellaImagen = huellaBase64
                elector.estado = true
            
            elector.save()
                .then(elector => { return res.status(200).send({ elector }) })
                .catch(err => { return res.status(500).send({ message: `Error al guardar el documento: ${err}` }) })

        // Elector
            // .findOneAndDelete(
            //     { identificacionNacional : '18569470-4' },
            //     { isEndangered: false }
            // )
            // .then(()=> {return res.status(200).send({ message: 'Eliminacion correcta' })})
            // .catch( err => console.log(`Ocurio un error el eliminar ${err}`))

    },
    //Obtiene la lista de todos los electores, solo pruebas Postman
    getPadron: (req, res) => {
        Elector.find({})
            .then(padron => { return res.status(200).send({ padron }) })
            .catch(err => { return res.status(404).send({ message: `No fue posible obtener el padron electoral: ${err}` }) })
    },
    //Obtiene un elector solo pruebas Postman
    getElector: (req, res) => {
        const idElector = req.params.id
        if (idElector == null) return res.status(404).send({ message: 'El id es requerido' })

        Elector.findById(idElector)
            .then(elector => { return res.status(200).send({ elector }) })
            .catch(err => { return res.status(500).send({ message: `Error al devolver los datos: ${err}` }) })

    },
    //Actualiza un elector (estado)
    updateEstadoElector: (req, res) => {
        const correlativo = req.params.id
        const update = req.body
        if (correlativo == null) return res.status(404).send({ message: 'El id es requerido' })
        if (update.estado == null) return res.status(404).send({ message: 'El estado es requerido' })
        Elector
            .findOneAndUpdate(
                { correlativo: correlativo },
                { estado: update.estado },
                { new: true }
            )
            .then(electorUpdated => { return res.status(200).send({ electorUpdated }) })
            .catch(err => { return res.status(500).send({ message: `Error al devolver los datos: ${err}` }) })
    },
    //Sube la captura de huella dactilar al padron
    uploadFingerprint: function (req, res) {
        const correlativo = req.params.id
        const fileName = 'Imagen no subida'

        if (req.files) {
            const filePath = req.files.huellaImagen.path
            const fileSplit = filePath.split('\\')
            const fileName = fileSplit[1]
            const extSplit = fileName.split('\.')
            const fileExt = extSplit[1]

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

                Elector
                    .findOneAndUpdate(
                        { correlativo: correlativo },
                        { huellaImagen: fileName },
                        { new: true }
                    )
                    .then(electorUpdated => { return res.status(200).send({ electorUpdated }) })
                    .catch(err => { return res.status(500).send({ message: `Error al cargar archivo: ${err}` }) })

            }
            else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: 'Extension no valida' })
                })
            }
        }
        else {
            return res.status(400).send({ message: 'Imagen es requerida' })
        }
    },
    //Solo pruebas en Postman
    deleteVoto: function (req, res) {
        var _id = req.params.id

        Voto
            .findOneAndDelete(
                { _id: _id },
                { isEndangered: false }
            )
            .then(() => { return res.status(200).send({ message: 'Eliminacion correcta' }) })
            .catch(err => console.log(`Ocurio un error el eliminar`))
    },
    //Solo pruebas en Postman
    deleteVotos: function (req, res) {
        
        Voto.find({}).then(
            data => {
                data.forEach(voto => {
                    Voto
                        .findOneAndDelete(
                            { _id: voto._id },
                            { isEndangered: false }
                        )
                        .then(() => { return res.status(200).send({ message: 'Eliminacion correcta' }) })
                        .catch(err => console.log(`Ocurio un error el eliminar`))
                })
            }
        )
        VotoDiputado.find({}).then(
            data => {
                data.forEach(voto => {
                    VotoDiputado
                        .findOneAndDelete(
                            { _id: voto._id },
                            { isEndangered: false }
                        )
                        .then(() => { return res.status(200).send({ message: 'Eliminacion correcta' }) })
                        .catch(err => console.log(`Ocurio un error el eliminar`))
                })
            }
        )
        VotoSenador.find({}).then(
            data => {
                data.forEach(voto => {
                    VotoSenador
                        .findOneAndDelete(
                            { _id: voto._id },
                            { isEndangered: false }
                        )
                        .then(() => { return res.status(200).send({ message: 'Eliminacion correcta' }) })
                        .catch(err => console.log(`Ocurio un error el eliminar`))
                })
            }
        )

    }

}

module.exports = controller