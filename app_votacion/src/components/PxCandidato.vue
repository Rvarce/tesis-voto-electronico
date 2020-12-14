<template>
    <v-flex class="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-4xl mx-auto">
        <v-layout wrap>
            <v-flex v-for="c in candidatos" :key="c._id" class="">
                <v-card class="my-12" elevation="10" max-width="373">
                    <div id="root" @load="cargarImagen">
                        <img
                            v-show="isLoad"
                            :src="obtenerUrlImagen(c.imagen)"
                            @load="esperarTiempo"
                            width="280"
                            min-height="373"
                        />

                        <div v-show="!isLoad">
                            <v-skeleton-loader width="280" type="image">
                            </v-skeleton-loader>
                        </div>
                    </div>
                    <v-card-title width="280">
                        {{ c.nombre }} {{ c.apellidoPat }}
                        {{ c.apellidoMat }}
                    </v-card-title>

                    <v-card-text class="max-w-xs py-0">
                        <!-- <div>
                                {{ c.numeroLista }}
                            </div> -->
                        <div class="my-1 subtitle-1">
                            {{ c.partido }}
                        </div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>
                    <v-card-actions>
                        <v-btn
                            class="flex text-gray-600 bg-gray-200 px-20 py-6 m-2"
                            @click="$emit('alert', c)"
                        >
                            <div>
                                <span>Votar</span>
                            </div>
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <!-- reserve( c.nombre + ' ' + c.apellidoPat + ' ' +  c.apellidoMat ) -->
            </v-flex>
        </v-layout>
    </v-flex>
</template>
<script>
export default {
    name: 'PxCandidato',
    props: {
        candidatos: {
            type: Array,
            default: () => []
        },
        opcion: String
    },
    data: () => ({
        selection: 1,
        loading: true,
        isLoad: false,
        img: '../img/',
        imageDefault: 'avatar_default.jpg',
        transition: 'scale-transition',
        transitions: [
            {
                text: 'None',
                value: undefined
            },
            {
                text: 'Fade Transition',
                value: 'fade-transition'
            },
            {
                text: 'Scale Transition',
                value: 'scale-transition'
            }
        ]
    }),
    crearImagen() {
        this.cargarImagen()
    },
    mounted() {
        setTimeout(() => {
            this.loading = !this.loading
            console.log('Montado')
        }, 4500)
    },
    methods: {
        reserve(candidato) {
            return candidato
        },
        obtenerUrlImagen(img) {
            return require('../assets/img/' + (img == '' ? this.imageDefault : img))
        },
        cargarImagen() {
            this.isLoad = false
            this.$nextTick(() => {
                // this.imagen = this.imagen[this.imagen]
            })
        },
        esperarTiempo() {
            setTimeout(
                function() {
                    this.isLoad = true
                }.bind(this),
                1000
            )
        }
    }
}
</script>
