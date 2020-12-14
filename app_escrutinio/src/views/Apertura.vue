<template>
    <v-flex>
        <px-header />
        <v-main>
            <v-stepper v-model="e1" vertical>
                <v-stepper-step :complete="e1 > 1" step="1">
                    Ingreso de datos
                </v-stepper-step>
                <v-stepper-content step="1">
                    <px-form-mesa />

                    <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>
                <v-stepper-step :complete="e1 > 2" step="2"
                    >Habilitar Camaras Secretas</v-stepper-step
                >

                <v-stepper-content step="2">
                    <!-- <v-card
                        color="grey lighten-1"
                        class="mb-12"
                        height="200px"
                    > -->
                    <px-form-camara />
                    <!-- </v-card> -->

                    <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>
            </v-stepper>
        </v-main>
        <px-footer />
    </v-flex>
</template>
<script>
import PxHeader from '@/components/PxHeader.vue'
import PxFooter from '@/components/PxFooter.vue'
import PxFormCamara from '@/components/PxFormCamara'
import PxFormMesa from '@/components/PxFormMesa'
export default {
    name: 'Apertura',
    components: {
        PxHeader,
        PxFooter,
        PxFormCamara,
        PxFormMesa
    },
    data() {
        return {
            e1: 1
        }
    }
}
</script>
