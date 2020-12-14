<template>
    <div>
        <px-iniciar-sufragio
            v-on:inicio="iniciarSufragio($event)"
            v-if="inicio"
        />
        <v-stepper v-model="e1" v-else>
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                    Presidentes
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">
                    Diputados
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 3" step="3">
                    Senadores
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="4">
                    Finalizar
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <Presidentes
                        v-on:continuar="e1 = $event"
                        :inicio="inicio"
                    />
                </v-stepper-content>

                <v-stepper-content step="2">
                    <diputados v-on:continuar="e1 = $event" :inicio="inicio" />
                </v-stepper-content>

                <v-stepper-content step="3">
                    <senadores
                        v-on:continuar="changeTimeOut($event)"
                        :inicio="inicio"
                    />
                </v-stepper-content>

                <v-stepper-content step="4">
                    <finalizar
                        :timeOut="timeOut"
                        v-on:inicio="iniciarSufragio($event)"
                    />
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>
<script>
import Presidentes from '@/views/Presidentes'
import Diputados from '@/views/Diputados'
import Senadores from '@/views/Senadores'
import Finalizar from '@/views/Finalizar'
import PxIniciarSufragio from '@/components/PxIniciarSufragio'
export default {
    name: 'PxNavigator',
    components: {
        Presidentes,
        Diputados,
        Senadores,
        Finalizar,
        PxIniciarSufragio
    },
    mounted() {
        console.log('timeout navigator', this.timeOut)
    },
    data() {
        return {
            e1: 1,
            inicio: true,
            timeOut: false
        }
    },
    methods: {
        iniciarSufragio(val) {
            this.inicio = val
            this.e1 = 1
            this.timeOut = false
        },
        changeTimeOut(next){
            if (next == 4) {
                this.e1 = next
                this.timeOut = true
            }
        }
    }
}
</script>
