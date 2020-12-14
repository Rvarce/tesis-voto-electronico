<template>
    <div>
        <v-row>
            <v-col>
                <v-card elevation="8" align="center">
                    <img
                        src="../assets/img/apertura-mesa.png"
                        width="80"
                        height="80"
                        class="pa-2"
                    />
                    <v-divider></v-divider>
                    <div class="py-4">
                        <v-btn
                            text
                            small
                            color="primary"
                            :disabled="mesaIniciada"
                            href="/apertura"
                        >
                            Apertura Mesa Receptora
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
            <v-col>
                <v-card elevation="8" align="center">
                    <img
                        src="../assets/img/autentificacion-del-elector.png"
                        width="80"
                        height="80"
                        class="pa-2"
                    />
                    <v-divider></v-divider>
                    <div class="py-4">
                        <v-btn
                            text
                            small
                            color="primary"
                            :disabled="!mesaIniciada"
                            href="http://localhost:3000"
                        >
                            Autenticación del Elector
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
            <v-col>
                <v-card elevation="8" align="center">
                    <img
                        src="../assets/img/camara-secreta.png"
                        width="80"
                        height="80"
                        class="pa-2"
                    />
                    <v-divider></v-divider>
                    <div class="py-4">
                        <v-btn
                            text
                            small
                            color="primary"
                            @click="$emit('menu-camara')"
                            :disabled="!mesaIniciada"
                            >Habilitar Camara Secreta</v-btn
                        >
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card elevation="8" align="center">
                    <img
                        src="../assets/img/cierre-mesa.png"
                        width="80"
                        height="80"
                        class="pa-2"
                    />
                    <v-divider></v-divider>
                    <div class="py-4">
                        <v-btn
                            text
                            small
                            color="primary"
                            :disabled="!mesaIniciada"
                        >
                            Cierre Mesa Receptora
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
            <v-col>
                <v-card elevation="8" align="center">
                    <img
                        src="../assets/img/resultados-de-escrutinio.png"
                        width="80"
                        height="80"
                        class="pa-2"
                    />
                    <v-divider></v-divider>
                    <div class="py-4">
                        <v-btn
                            text
                            small
                            color="primary"
                            :disabled="!mesaIniciada"
                            href="/resultados"
                        >
                            Resultados del Escrutinio
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
            <v-col>
                <v-card elevation="8" align="center">
                    <img
                        src="../assets/img/acta-electoral.png"
                        width="80"
                        height="80"
                        class="pt-4"
                    />
                    <v-divider></v-divider>
                    <div class="py-4">
                        <v-btn
                            text
                            small
                            color="primary"
                            :disabled="!mesaIniciada"
                        >
                            Acta Electoral
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: 'PxMenu',
    data() {
        return {
            mesaIniciada: true
        }
    },
    methods: {
        prueba() {
            return this.mesaIniciada
        }
    }
}
</script>
