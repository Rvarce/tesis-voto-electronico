<template>
    <!-- <div class="flex-col items-center">
        <h1 class="text-gray-700 text-6xl uppercase">error</h1>
        <router-link class="mt-5 text-xl text-green-600 hover:underline" to="/"
            >Volver a la página de Inicio</router-link
        >
    </div> -->

    <v-stepper v-model="e1">
        <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1"
                >Presidentes</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2"
                >Diputados</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step step="3">Senadores</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content step="1">
                <Presidentes />

                <v-btn color="primary" @click="e1 = 2">
                    Continuar
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px"
                ></v-card>

                <v-btn color="primary" @click="e1 = 3">
                    Continuar
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
                <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px"
                ></v-card>

                <v-btn color="primary" @click="e1 = 1">
                    Volver
                </v-btn>

                <v-btn text>Finalizar</v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>
<script>
import Presidentes from '@/views/Presidentes'
export default {
    name: 'Error',
    components: { Presidentes },
    data() {
        return {
            e1: 1
        }
    }
}
</script>
