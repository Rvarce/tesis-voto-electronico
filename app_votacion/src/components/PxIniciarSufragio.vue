<template>
    <div class="pa-16">
        <v-alert text outlined color="info">
            <h3 class="headline">Instrucciones</h3>
            <div>
                Lea atentamente las indicaciones antes de comenzar
            </div>

            <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>

            <v-row align="center" no-gutters>
                <ul>
                    <li>1. Pulse el botón "Iniciar votación"</li>
                    <li>2. Seleccione el candidato</li>
                    <li>3. Confirme su elección</li>
                    <li>4. Reciba el comprobante impreso</li>
                    <li>
                        5. Presione "Continuar" para avanzar a la siguiente
                        candidatura y repita los pasos anteriores
                    </li>
                    <li>
                        6. Si presiona el botón "Continuar" sin seleccionar una
                        opción, podrá emitir un voto en blanco
                    </li>
                </ul>
            </v-row>
            <v-row align="center" no-gutters>
                <v-spacer></v-spacer>
                <v-col class="shrink">
                    <v-btn
                        class="py-6"
                        color="info"
                        outlined
                        @click="consultarEstado()"
                    >
                        Iniciar votación
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
    name: 'PxIniciarSufragio',

    methods: {
        consultarEstado() {
            let url = `http://localhost:3700/cliente_votacion/obtener_cliente`
            let token = Cookies.get('token')
            let headers = { headers: { 'access-token': token } }
            Axios.get(url, headers).then(response => {
                let estado = response.data.estado
                console.log('estado', response.data.estado)

                if (estado) {
                    this.$emit('inicio', false)
                } else {
                    console.log('Sin acceso')
                }
            })
        }
    }
}
</script>
