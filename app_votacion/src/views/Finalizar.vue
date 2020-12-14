<template>
    <div class="pa-16">
        <v-alert text outlined color="info">
            <h3 class="headline">Información</h3>
            <div>Se ha realizado el sufragio de manera exitosa</div>

            <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>

            <v-row align="center" no-gutters>
                <span
                    >Los comprobantes impresos son un respaldo físico del voto
                    emitido, deposítelos en las urnas correspondientes a cada
                    candidatura.
                </span>
            </v-row>
            <v-row align="center" no-gutters class="py-6">
                <v-spacer></v-spacer>
                <v-col class="shrink">
                    <v-btn color="info" outlined @click="cambiarEstado()">
                        Finalizar
                    </v-btn>
                </v-col>
            </v-row>
        </v-alert>
    </div>
</template>
<script>
import Axios from 'axios'
import Cookies from 'js-cookie'
export default {
    name: 'Finalizar',
    props: ['timeOut'],
    data() {
        return {
            id: ''
        }
    },
    watch: {
        timeOut: function(val) {
            console.log('this.timeOut', this.timeOut)
            if (val) {
                console.log('val', val)
                setTimeout(() => this.cambiarEstado(), 10000)
            }
        }
    },
    methods: {
        cambiarEstado() {
            let url = 'http://localhost:3700/cliente_votacion/actualizar_estado'
            let token = Cookies.get('token')
            let idMDB = Cookies.get('idMDB')
            let data = {
                _id: idMDB,
                estadoAcceso: false
            }
            let headers = { headers: { 'access-token': token } }
            Axios.put(url, data, headers)
                .then(response => {
                    console.log(response)
                    this.$emit('inicio', true)
                    this.$emit('continuar', 1)
                })
                .catch(err => console.log(err))
        }
    }
}
</script>
