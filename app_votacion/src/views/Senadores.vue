<template>
    <div>
        <px-alert
            v-if="alert"
            v-on:alert="alert = $event"
            v-on:voto="estadoVotoS($event)"
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
                    votoSenador === true
                        ? $emit('continuar', 4)
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
    name: 'Senadoress',
    components: { PxCandidato, PxAlert, PxOverlay },
    data() {
        return {
            candidatos: [],
            alert: null,
            envio: null,
            opcion: 'String',
            overlay: false,
            votoSenador: false
        }
    },
    created() {
        this.getSenadores()
    },
    // mounted() {
    //     ;() => {
    //         if (this.inicio) {
    //             this.alert = false
    //         }
    //     }
    // },
    methods: {
        getSenadores() {
            let url = 'http://localhost:3700/votacion/candidatos/senador'
            let token = Cookies.get('token')
            axios
                .get(url, { headers: { 'access-token': token } })
                .then(result => (this.candidatos = result.data))
                .catch(err => console.log(err))
        },
        informacion(candidato) {
            if (candidato.cargo == '') {
                candidato.cargo = 'senador'
            }
            this.opcion = candidato
            this.alert = true
        },
        estadoVotoS(estado) {
            this.votoSenador = estado
        },
        estadoOverlay(estado) {
            this.overlay = estado
        }
    }
}
</script>
