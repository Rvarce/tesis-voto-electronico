<template>
    <v-flex>
        <px-header />
        <v-main>
            <v-container class="px-16">
                <v-row justify="center" align="center">
                    <v-col class="" align="center">
                        <v-data-table
                            :headers="headers"
                            :items="desserts"
                            item-key="name"
                            sort-by="name"
                            group-by="categoria"
                            class="elevation-4"
                            show-group-by
                        ></v-data-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-flex>
</template>

<script>
import api from '@/api'
import PxHeader from '@/components/PxHeader'
export default {
    name: 'Resultados',
    components: { PxHeader },
    data() {
        return {
            headers: [
                {
                    text: 'Resultado Elecciones',
                    align: 'start',
                    value: 'nombre',
                    groupable: false
                },
                { text: 'Categoria', value: 'categoria', align: 'right' },
                { text: 'Votos', value: 'voto', align: 'right' }
            ],
            desserts: [],
            candidato: [],
            array: [],
            presidentes: [
                {
                    _id: '5ef17f96fd8cf93804e82799',
                    nombre: 'Joaquin',
                    apellidoPat: 'Lavin',
                    apellidoMat: 'Infante',
                    pacto: 'Democracia y Progeso',
                    partido: 'UDI',
                    apoyoPolitico: '',
                    numeroLista: 1,
                    imagen: 'Joaquin_Lavin.jpg',
                    uuid: '1234-1234-1234',
                    __v: 0,
                    cargo: 'presidente'
                },
                {
                    _id: '5ef18117fd8cf93804e8279b',
                    nombre: 'Felipe',
                    apellidoPat: 'Kast',
                    apellidoMat: 'Sommerhoff',
                    pacto: '',
                    partido: 'Evolución Política',
                    apoyoPolitico: '',
                    numeroLista: 3,
                    imagen: 'Felipe_José_Kast_Sommerhoff.jpg',
                    uuid: '1234-1234-1236',
                    __v: 0,
                    cargo: 'presidente'
                },
                {
                    _id: '5ef2bd6ffd960c4ef89385a5',
                    nombre: 'Izkia Jasvin',
                    apellidoPat: 'Siches',
                    apellidoMat: 'Pastén',
                    pacto: 'Nueva mayoria',
                    partido: 'Independiente',
                    apoyoPolitico: '',
                    numeroLista: 4,
                    imagen: 'Izkia_Siches.jpg',
                    uuid: '1234-1234-1237',
                    __v: 0,
                    cargo: 'presidente'
                },
                {
                    _id: '5ef2becbfd960c4ef89385a6',
                    nombre: 'Carola',
                    apellidoPat: 'Canelo',
                    apellidoMat: 'Figueroa',
                    pacto: '',
                    partido: 'Independiente',
                    apoyoPolitico: '',
                    numeroLista: 5,
                    imagen: 'Carola_Canelo.jpg',
                    uuid: '1234-1234-1238',
                    __v: 0,
                    cargo: 'presidente'
                },
                {
                    _id: '5ef2c062fd960c4ef89385a7',
                    nombre: 'Jorge',
                    apellidoPat: 'Sharp',
                    apellidoMat: 'Fajardo',
                    pacto: 'Frente Amplio',
                    partido: 'Convergencia Social',
                    apoyoPolitico: 'Independiente',
                    numeroLista: 6,
                    imagen: 'Jorge_Sharp.jpg',
                    uuid: '1234-1234-1238',
                    __v: 0,
                    cargo: 'presidente'
                },
                {
                    _id: '5ef2c0e3fd960c4ef89385a8',
                    nombre: 'Tomás',
                    apellidoPat: 'Hirsch',
                    apellidoMat: 'Goldschmidt',
                    pacto: '',
                    partido: 'Partido Humanista',
                    apoyoPolitico: 'Independiente',
                    numeroLista: 7,
                    imagen: 'Tomás_Hirsch.jpg',
                    uuid: '1234-1234-1239',
                    __v: 0,
                    cargo: 'presidente'
                }
            ],
            senadores: [
                {
                    _id: '5efd42de57ed2e45c078fd6f',
                    nombre: 'Guido',
                    apellidoPat: 'Girardi',
                    apellidoMat: 'Lavín',
                    cargo: 'senador',
                    pacto: '',
                    partido: 'PPD',
                    apoyoPolitico: '',
                    numeroLista: 1,
                    imagen: 'Guido_Girardi_Lavín.jpg',
                    uuid: '123-134',
                    __v: 0
                },
                {
                    _id: '5efd435e57ed2e45c078fd70',
                    nombre: 'Andres',
                    apellidoPat: 'Allamand',
                    apellidoMat: 'Zavala',
                    cargo: 'senador',
                    pacto: '',
                    partido: 'Renovación Nacional',
                    apoyoPolitico: '',
                    numeroLista: 2,
                    imagen: 'Andres_Allamand.jpg',
                    uuid: '123-1345',
                    __v: 0
                },
                {
                    _id: '5efd43a757ed2e45c078fd71',
                    nombre: 'Wilfredo',
                    apellidoPat: 'Alfsen',
                    apellidoMat: 'Ovando',
                    cargo: 'senador',
                    pacto: '',
                    partido: 'Partido Humanista',
                    apoyoPolitico: '',
                    numeroLista: 3,
                    imagen: '',
                    uuid: '123-1346',
                    __v: 0
                }
            ],
            diputados: [
                {
                    _id: '5efd3846954d8147247becc8',
                    nombre: 'Joaquin',
                    apellidoPat: 'Lavín',
                    apellidoMat: 'León',
                    cargo: 'diputado',
                    pacto: '',
                    partido: 'UDI',
                    apoyoPolitico: '',
                    numeroLista: 2,
                    imagen: 'Joaquín_José_Lavín_León.jpg',
                    uuid: '123-134',
                    __v: 0
                },
                {
                    _id: '5efd39ca954d8147247becc9',
                    nombre: 'José',
                    apellidoPat: 'Auth',
                    apellidoMat: 'Stewart',
                    cargo: 'diputado',
                    pacto: '',
                    partido: 'Independiente',
                    apoyoPolitico: '',
                    numeroLista: 1,
                    imagen: 'Pepe_Auth_Stewart.jpg',
                    uuid: '123-135',
                    __v: 0
                },
                {
                    _id: '5efd39f4954d8147247becca',
                    nombre: 'Julio',
                    apellidoPat: 'Muñoz',
                    apellidoMat: 'San Martin',
                    cargo: 'diputado',
                    pacto: '',
                    partido: 'Partido Humanista',
                    apoyoPolitico: '',
                    numeroLista: 2,
                    imagen: '',
                    uuid: '123-133',
                    __v: 0
                }
            ]
        }
    },
    created() {
        this.getResultados()
    },
    methods: {
        getResultados() {
            Promise.all([
                api.getResultadoPresidente(),
                api.getResultadoSenadores(),
                api.getResultadoDiputados()
            ])
                .then(resultado => {
                    console.log(resultado[0])
                    this.resultadoPresidente(resultado[0])
                    this.resultadoSenador(resultado[1])
                    this.resultadoDiputado(resultado[2])
                })
                .then(() => {
                    this.desserts = this.array
                })
                .catch(e => console.log(e))
        },
        resultadoPresidente(resultado) {
            let str = JSON.stringify(resultado)
            let replace = str
                .replace('{', '')
                .replace('}', '')
                .replace(':', '')
                .replace(',', '')

            let replace2 = replace.replace(':', '').replace(',', '')

            let replace3 = replace2.replace(':', '').replace(',', '')

            let split = replace3.split('"')

            for (let i = 1; i < split.length; i += 2) {
                let objeto = {
                    nombre: String,
                    voto: Number,
                    categoria: String
                }
                objeto.nombre = split[i]
                objeto.voto = split[i + 1]
                objeto.categoria = 'Presidente'

                this.array.push(objeto)
            }
            for (var i = 0; i < this.presidentes.length; i++) {
                let objeto = {
                    nombre: String,
                    voto: Number,
                    categoria: String
                }
                let arrayAux = this.array
                var encontrado = false
                for (var f = 0; f < arrayAux.length; f++) {
                    if (
                        arrayAux[f].nombre ==
                        this.presidentes[i].nombre +
                            ' ' +
                            this.presidentes[i].apellidoPat +
                            ' ' +
                            this.presidentes[i].apellidoMat
                    ) {
                        encontrado = true
                    }
                }
                if (!encontrado) {
                    objeto.nombre =
                        this.presidentes[i].nombre +
                        ' ' +
                        this.presidentes[i].apellidoPat +
                        ' ' +
                        this.presidentes[i].apellidoMat
                    objeto.voto = 0
                    objeto.categoria = 'Presidente'
                    this.array.push(objeto)
                }
            }
        },
        resultadoSenador(resultado) {
            let str = JSON.stringify(resultado)
            console.log('resultado', resultado)
            let replace = str
                .replace('{', '')
                .replace('}', '')
                .replace(':', '')
                .replace(',', '')

            let replace2 = replace.replace(':', '').replace(',', '')

            let replace3 = replace2.replace(':', '').replace(',', '')

            let split = replace3.split('"')

            for (let i = 1; i < split.length; i += 2) {
                let objeto = {
                    nombre: String,
                    voto: Number,
                    categoria: String
                }
                objeto.nombre = split[i]
                objeto.voto = split[i + 1]
                objeto.categoria = 'Senador'

                this.array.push(objeto)
            }
            for (var i = 0; i < this.senadores.length; i++) {
                let objeto = {
                    nombre: String,
                    voto: Number,
                    categoria: String
                }
                let arrayAux = this.array
                var encontrado = false
                for (var f = 0; f < arrayAux.length; f++) {
                    if (
                        arrayAux[f].nombre ==
                        this.senadores[i].nombre +
                            ' ' +
                            this.senadores[i].apellidoPat +
                            ' ' +
                            this.senadores[i].apellidoMat
                    ) {
                        encontrado = true
                    }
                }
                if (!encontrado) {
                    objeto.nombre =
                        this.senadores[i].nombre +
                        ' ' +
                        this.senadores[i].apellidoPat +
                        ' ' +
                        this.senadores[i].apellidoMat
                    objeto.voto = 0
                    objeto.categoria = 'Senador'
                    this.array.push(objeto)
                }
            }
        },
        resultadoDiputado(resultado) {
            let str = JSON.stringify(resultado)
            let replace = str
                .replace('{', '')
                .replace('}', '')
                .replace(':', '')
                .replace(',', '')

            let replace2 = replace.replace(':', '').replace(',', '')

            let replace3 = replace2.replace(':', '').replace(',', '')

            let split = replace3.split('"')

            for (let i = 1; i < split.length; i += 2) {
                let objeto = {
                    nombre: String,
                    voto: Number,
                    categoria: String
                }
                objeto.nombre = split[i]
                objeto.voto = split[i + 1]
                objeto.categoria = 'Diputado'

                this.array.push(objeto)
            }
            for (var i = 0; i < this.diputados.length; i++) {
                let objeto = {
                    nombre: String,
                    voto: Number,
                    categoria: String
                }
                let arrayAux = this.array
                var encontrado = false
                for (var f = 0; f < arrayAux.length; f++) {
                    if (
                        arrayAux[f].nombre ==
                        this.diputados[i].nombre +
                            ' ' +
                            this.diputados[i].apellidoPat +
                            ' ' +
                            this.diputados[i].apellidoMat
                    ) {
                        encontrado = true
                    }
                }
                if (!encontrado) {
                    objeto.nombre =
                        this.diputados[i].nombre +
                        ' ' +
                        this.diputados[i].apellidoPat +
                        ' ' +
                        this.diputados[i].apellidoMat
                    objeto.voto = 0
                    objeto.categoria = 'Diputado'
                    this.array.push(objeto)
                }
            }
        }
    }
}
</script>
