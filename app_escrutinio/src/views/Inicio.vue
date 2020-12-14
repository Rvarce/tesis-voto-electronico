<template>
    <v-flex>
        <px-header />
        <v-main>
            <v-container class="fill-height" height="200" fluid>
                <v-row justify="center" align="center" class="py-16 py-auto">
                    <v-col class="" align="center">
                        <v-tooltip center>
                            <template v-slot:activator="{ on }">
                                <v-card
                                    class="mx-200 elevation-12 rounded-xl"
                                    color="white"
                                    max-width="550px"
                                    height="300"
                                >
                                    <v-card-subtitle
                                        class="bg-gray-200 pb-0 pt-16"
                                    >
                                        PROCESO DE VOTACIÓN
                                    </v-card-subtitle>
                                    <v-card-subtitle>
                                        <h1>PORTAL DE INGRESO</h1>
                                    </v-card-subtitle>
                                    <v-card-actions>
                                        <v-layout row>
                                            <v-flex justify-center>
                                                <v-btn
                                                    primary
                                                    v-on="on"
                                                    @click="login()"
                                                    large
                                                    class="my-8"
                                                >
                                                    Acerque su huella al lector
                                                    biométrico
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-flex>
</template>
<script>
import PxHeader from '@/components/PxHeader'
import Cookie from 'js-cookie'
export default {
    name: 'Inicio',
    components: { PxHeader },
    data() {
        return {
            inicio: false,
            padding: 16
        }
    },
    created() {
        this.verificarAuth()
    },
    watch: {
        inicio: function(val) {
            console.log('this.inicio', this.inicio)
            if (!val) {
                console.log('val', val)
                this.routeHome()
            }
        }
    },
    methods: {
        login() {
            //Pendiente, Token se creara con la autenticacion biometrica
            let token = 'eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI1ZjA2OGZkZGZjMjUyOTExY2M4ZjJjZjUiLCJpYXQiOjE1OTU1NTg2MTk5NTksInVzZXJuYW1lIjoiY2FtYXJhX3NlY3JldGFfMSJ9.si3Pg8rKXYcQFukwW4x2ABxnVe1Mty89EHLbmN24afhNAisD6Rro7roCcmEBFNgMnE6TwqvGwYINXikMuHNgYGsG4BiUgW3BhbvOm2iP8DdbJ_VVb2NlLowmt3biuJzhcD1_BuD1BSf3mgbUX78P1sSDVcE5_3IIxLI5akpsqKhnr_K9PMxyyiWVE7M5jcAzE-3DZPL8TInfCi9bCZAxOlQ-psQLUh8HRaYAPCBGRuAaC9H-V-oE2ajExiO3QHGm3fLVRLviGphDMDfqUg4aUWEvrxWdzXSpWpYoZW52S0-JrZQ4HxUVeihq1VlbPr_xlKJyNHwtX4aXl-Pdt1Pweg'
            Cookie.set('auth', token)
            this.inicio = false
            this.$router.push('home')
        },
        verificarAuth() {
            let auth = Cookie.get('auth')
            if (auth) {
                this.$router.push('home')
            }
        }
    }
}
</script>
