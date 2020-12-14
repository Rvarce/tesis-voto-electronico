<template>
    <v-overlay :value="overlay">
        <div class="fixed bottom-0 left-0 pb-64 z-50">
            <v-alert prominent type="warning" class="w-screen">
                <v-row align="center">
                    <v-col class="grow  text-xl py-12">
                        No ha seleccionado ningún candidato:
                        <ul>
                            <li>
                                -Presione en "Voto en blanco" para seleccionar
                                esta preferencia
                            </li>
                            <li>
                                -Presione en "Cancelar" para regresar al listado
                                de candidatos
                            </li>
                        </ul>
                    </v-col>
                </v-row>
                <v-row align="end" justify="end">
                    <v-col class="shrink">
                        <v-btn @click="$emit('over', false)">
                            Cancelar
                        </v-btn>
                    </v-col>
                    <v-col class="shrink pr-6">
                        <v-btn
                            @click="
                                $emit('voto_blanco', {
                                    nombre: 'Voto',
                                    apellidoPat: 'en',
                                    apellidoMat: 'blanco',
                                    cargo: ''
                                }),
                                    $emit('over', false)
                            "
                        >
                            Voto en blanco
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </div>
    </v-overlay>
</template>
<script>
export default {
    name: 'PxOverlay',
    props: ['overlay']
}
</script>
