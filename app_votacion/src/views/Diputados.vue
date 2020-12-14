<template>
    <div>
        <px-alert
            v-if="alert"
            v-on:alert="alert = $event"
            v-on:voto="estadoVotoD($event)"
            :opcion="opcion"
        />
        <px-candidato
            v-else
            :candidatos="candidatos.candidatos"
            v-on:alert="informacion($event)"
        />
        <px-overlay
            :overlay="overlay"
            v-on:over="estadoOverlay($event)"
            v-on:voto_blanco="informacion($event)"
        />
        <div class="fixed bottom-0 right-0 pb-16 pr-6 z-0">
            <v-btn
                large
                color="primary"
                @click="
                    votoDiputado === true
                        ? $emit('continuar', 3)
                        : estadoOverlay(true)
                "
            >
                Continuar
            </v-btn>
        </div>
    </div>
</template>
<script>
import PxCandidato from '@/components/PxCandidato'
import PxAlert from '@/components/PxAlert'
import axios from 'axios'
import PxOverlay from '@/components/PxOverlay'
import Cookies from 'js-cookie'
export default {
    name: 'Diputados',
    components: { PxCandidato, PxAlert, PxOverlay },
    data() {
        return {
            candidatos: [],
            alert: null,
            envio: null,
            opcion: 'String',
            overlay: false,
            votoDiputado: false
        }
    },
    created() {
        this.getDiputados()
    },
    mounted() {
        ;() => {
            if (this.inicio) {
                this.alert = false
            }
        }
    },
    methods: {
        getDiputados() {
            let url = 'http://localhost:3700/votacion/candidatos/diputado'
            let token = Cookies.get('token')
            axios
                .get(url, { headers: { 'access-token': token } })
                .then(result => (this.candidatos = result.data))
                .catch(err => console.log(err))
        },
        informacion(candidato) {
            if (candidato.cargo == '') {
                candidato.cargo = 'diputado'
            }
            this.opcion = candidato
            this.alert = true
        },
        estadoVotoD(estado) {
            this.votoDiputado = estado
        },
        estadoOverlay(estado) {
            this.overlay = estado
        }
    }
}
</script>
