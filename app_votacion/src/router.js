import Vue from 'vue'
import Router from 'vue-router'
import Presidentes from '@/views/Presidentes'
import Diputados from '@/views/Diputados'
import Senadores from '@/views/Senadores'
import Error from '@/views/Error'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'presidentes',
            component: Presidentes
        },
        {
            path: '/diputados',
            name: 'diputados',
            component: Diputados
        },
        {
            path: '/senadores',
            name: 'senadores',
            component: Senadores
        },
        {
            path: '*',
            name: 'Error',
            component: Error
        }
    ]
})
