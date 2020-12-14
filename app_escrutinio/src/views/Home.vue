<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawerRight" app clipped right>
            <v-list dense>
                <v-list-item @click.stop="right = !right">
                    <!-- <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action> -->
                    <v-list-item-content>
                        <v-list-item-title>Camara Secreta 1</v-list-item-title>
                        <v-switch
                            class="pl-3"
                            v-model="switch1"
                            :label="`Habilitar camara`"
                            v-if="!switch1"
                        ></v-switch>
                        <v-switch
                            class="pl-3"
                            v-else
                            v-model="switch1"
                            :label="`Habilitar camara`"
                            disabled
                        ></v-switch>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click.stop="right2 = !right2">
                    <!-- <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action> -->
                    <v-list-item-content>
                        <v-list-item-title>Camara Secreta 2</v-list-item-title>
                        <v-switch
                            class="pl-3"
                            v-model="switch2"
                            :label="`Habilitar camara`"
                            v-if="!switch2"
                        ></v-switch>
                        <v-switch
                            class="pl-3"
                            v-else
                            v-model="switch2"
                            :label="`Habilitar camara`"
                            disabled
                        ></v-switch>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app clipped-right color="indigo" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>
                Plataforma Mesa Receptora de Sufragio
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon
                @click.stop="drawerRight = !drawerRight"
            ></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <v-list-item @click.stop="left = !left">
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Resultado de mesa</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click.stop="left = !left">
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Obtener acta</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click.stop="left = !left">
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Enviar acta</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click.stop="left = !left">
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Cerrar votación</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-navigation-drawer
            v-model="left"
            fixed
            temporary
        ></v-navigation-drawer>

        <v-main>
            <v-row color="white">
                <v-col>
                    <input
                        type="text"
                        align="left"
                        class="pt-3 pl-3"
                        style="width: 300px;"
                        v-model="getFecha"
                        disabled
                    />
                </v-col>

                <v-col>
                    <div align="right" class="pt-3 pr-3 pb-0">
                        Bienvenido, Presidente de la mesa
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col> </v-col>
                <v-col>
                    <div align="right" class="pt-0">
                        <button class="px-3" @click="cerrarSesion()">
                            Salir
                        </button>
                    </div>
                </v-col>
            </v-row>
            <v-container class="" fluid>
                <v-row justify="center" align="center">
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <px-menu
                                v-on="on"
                                v-on:menu-camara="toogleCamara()"
                                class="pt-6 pb-16 mb-6"
                            />
                            <!-- <v-btn
                                    :href="source"
                                    icon
                                    large
                                    target="_blank"
                                    v-on="on"
                                >
                                    <v-icon large>mdi-code-tags</v-icon> 
                                </v-btn> -->
                        </template>
                    </v-tooltip>
                </v-row>
                <v-bottom-navigation>
                    <span class="py-4">Mesa Electoral 101M</span>
                </v-bottom-navigation>
            </v-container>
        </v-main>

        <!-- <v-navigation-drawer v-model="right" fixed right temporary>
            <px-camara :idCliente="idCliente"></px-camara>
        </v-navigation-drawer>
        <v-navigation-drawer v-model="right2" fixed right temporary>
            <px-camara :idCliente="idCliente"></px-camara>
        </v-navigation-drawer> -->

        <v-footer app color="indigo" class="white--text">
            <v-spacer></v-spacer>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
//import PxCamara from '@/components/PxCamara'
import PxMenu from '@/components/PxMenu'
import Axios from 'axios'
import Cookie from 'js-cookie'
export default {
    name: 'Home',
    components: { PxMenu },
    props: {
        source: String
    },
    data: () => ({
        drawer: false,
        drawerRight: false,
        right: false,
        right2: false,
        left: false,
        idCliente: '',
        clientes: null,
        fecha: new Date().toDateString(),
        hora: '00',
        min: '00',
        sec: '00',
        switch1: false,
        switch2: false
    }),
    created() {
        console.log('CREADO!!!!')
        this.verificarAuth()
        var self = this
        setInterval(function() {
            self.fechaYhora()
        }, 1000)
    },
    methods: {
        getCliente() {
            let token = Cookie.get('auth')
            let url = 'http://localhost:3700/cliente_votacion/obtener_clientes'
            Axios.get(url, { headers: { 'access-token': token } }).then(
                response => {
                    console.log(response.data)
                    this.clientes = response.data.clientes
                    console.log('clientes', this.clientes)
                    this.switch1 = response.data.clientes[0].estadoAcceso
                    this.switch2 = response.data.clientes[1].estadoAcceso
                }
            )
        },
        habilitarCamara(idCliente, sw) {
            let data = {
                _id: idCliente,
                estadoAcceso: true
            }
            console.log('data ', data)
            let token = Cookie.get('auth')
            let url = 'http://localhost:3700/cliente_votacion/actualizar_estado'
            Axios.put(url, data, { headers: { 'access-token': token } }).then(
                response => {
                    alert(response.data.estado)
                    console.log('data habilitar estado ', response.data)
                    if (sw == 1) {
                        this.switch1 = response.data.estado
                        console.log('sw 1', this.switch1)
                    } else if (sw == 2) {
                        this.switch2 = response.data.estado
                        console.log('sw 2', this.switch2)
                    }
                }
            )
        },
        verificarAuth() {
            let auth = Cookie.get('auth')
            if (!auth) {
                this.$router.push('/')
            }
        },
        fechaYhora() {
            var date = new Date(Date.now())
            this.hora = date.getHours()
            this.min = date.getMinutes()
            this.sec = date.getSeconds()

            this.hora = this.hora < 10 ? '0' + this.hora.toString() : this.hora
            this.min = this.min < 10 ? '0' + this.min.toString() : this.min
            this.sec = this.sec < 10 ? '0' + this.sec.toString() : this.sec
        },
        toogleCamara() {
            this.getCliente()
            this.drawerRight = !this.drawerRight
        },
        cerrarSesion() {
            Cookie.remove('auth')
            this.$router.push('/')
        }
    },
    computed: {
        getFecha() {
            return (
                this.fecha + ', ' + this.hora + ':' + this.min + ':' + this.sec
            )
        }
    },
    watch: {
        switch1: function(val) {
            if (val) {
                let id = this.clientes[0]._id
                console.log('cliente 1', this.clientes[0]._id)
                this.habilitarCamara(id, 1)
            }
        },
        switch2: function(val) {
            if (val) {
                let id = this.clientes[1]._id
                console.log('cliente 2', this.clientes[1]._id)
                this.habilitarCamara(id, 2)
            }
        },
        clientes: function(val) {
            this.switch1 = val[0].estadoAcceso
            this.switch2 = val[1].estadoAcceso
        }
    }
}
</script>
