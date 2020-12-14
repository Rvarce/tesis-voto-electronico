<template>
    <v-row class="py-20" justify="center">
        <v-col cols="10" sm="8" md="6" lg="4">
            <v-card ref="form" class="elevation-16">
                <v-card-text>
                    <v-card-title class="bg-gray-200 mb-6">
                        <span class="py-6">Acceso Cámara Secreta</span>
                    </v-card-title>
                    <v-text-field
                        ref="name"
                        v-model="name"
                        :rules="[() => !!name || 'Este campo es requerido']"
                        :error-messages="errorMessages"
                        label="Nombre Cámara"
                        placeholder="Nombre"
                        required
                    ></v-text-field>
                    <v-text-field
                        ref="codAutorizacion"
                        v-model="codAutorizacion"
                        :rules="[
                            () => !!codAutorizacion || 'El código es requerido',
                            () =>
                                (!!codAutorizacion &&
                                    codAutorizacion.length <= 4) ||
                                'El código debe de ser de 4 caracteres',
                            codeCheck
                        ]"
                        label="Código autorización"
                        placeholder="Código"
                        counter="4"
                        required
                    ></v-text-field>
                </v-card-text>
                <label
                    class="mb-0 ml-4 text-red-600 text-xs"
                    :mensaje="mensaje"
                >
                    {{ mensaje }}</label
                >
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-slide-x-reverse-transition>
                        <v-tooltip v-if="formHasErrors" left>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    icon
                                    class="my-0"
                                    v-bind="attrs"
                                    @click="resetForm"
                                    v-on="on"
                                >
                                    <v-icon>mdi-refresh</v-icon>
                                </v-btn>
                            </template>
                            <span>Reset</span>
                        </v-tooltip>
                    </v-slide-x-reverse-transition>
                    <v-btn color="primary" text @click="submit">Enviar</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import Axios from 'axios'
import Cookies from 'js-cookie'
export default {
    name: 'Inicio',
    data() {
        return {
            name: null,
            codAutorizacion: null,
            errorMessages: '',
            formHasErrors: false,
            mensaje: ''
        }
    },
    computed: {
        form() {
            return {
                name: this.name,
                codAutorizacion: this.codAutorizacion
            }
        }
    },
    watch: {
        name() {
            this.errorMessages = ''
        }
    },
    methods: {
        verificarAutorizacion() {
            if (!this.formHasErrors) {
                let cod = parseInt(this.codAutorizacion)
                let cliente = {
                    nombre: this.name,
                    codAutorizacion: cod
                }
                console.log(cliente)
                Axios.post(
                    'http://localhost:3700/Autenticacion/autenticar/',
                    cliente
                )
                    .then(response => {
                        console.log('response: ', response.data.idMDB)
                        if (response.status === 200) {
                            Cookies.set('token', response.data.token)
                            Cookies.set('idMDB', response.data.idMDB)
                            this.$emit('aut', false)
                        }
                    })
                    .catch(() => (this.mensaje = 'Acceso no autorizado'))
            }
        },
        codeCheck() {
            this.errorMessages =
                this.codAutorizacion && !this.name ? 'Campo requerido' : ''

            return true
        },
        resetForm() {
            this.errorMessages = []
            this.formHasErrors = false
            this.mensaje = ''

            Object.keys(this.form).forEach(f => {
                this.$refs[f].reset()
            })
        },
        submit() {
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
                if (!this.form[f]) this.formHasErrors = true

                this.$refs[f].validate(true)
            })
            this.verificarAutorizacion()
        }
    }
}
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
