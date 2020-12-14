import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Inicio from '../views/Inicio.vue'
import Apertura from '@/views/Apertura.vue'
import Resultados from '@/views/Resultados'
Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'inicio',
        component: Inicio
    },
    {
        path: '/apertura',
        name: 'apertura',
        component: Apertura
    },
    {
        path: '/resultados',
        name: 'Resultados',
        component: Resultados
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
