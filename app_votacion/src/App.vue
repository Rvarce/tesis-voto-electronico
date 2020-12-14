<template>
    <v-app id="inspire">
        <px-header />
        <inicio v-if="sessionValue" v-on:aut="aut($event)" />
        <!-- <px-iniciar-sufragio
            v-else-if="iniciarValue"
            v-on:inicio="iniciarSufragio($event)"
        /> -->
        <px-navigator v-else :activeBtn="activeBtn" />
    </v-app>
</template>

<script>
import PxHeader from '@/components/PxHeader'
import PxNavigator from '@/components/PxNavigator'
import Inicio from '@/views/Inicio'
//import PxIniciarSufragio from '@/components/PxIniciarSufragio'

export default {
    name: 'App',
    components: { PxHeader, PxNavigator, Inicio },
    data() {
        return {
            activeBtn: null,
            sessionValue: true,
            iniciarValue: true
        }
    },
    methods: {
        aut(val) {
            this.sessionValue = val
        },
        iniciarSufragio(val) {
            this.iniciarValue = val
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
