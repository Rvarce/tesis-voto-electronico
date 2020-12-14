<template>
    <div>
        <!-- <v-container class="fill-height" height="200" fluid>
            <v-row justify="center" align="center" class="py-16 py-auto">
                <v-col class="" align="center">
                    class="mx-200 elevation-12"
                    -->

        <v-list class="mb-8">
            <v-subheader
                >Obtenga e ingrese el código en la camara correspondiente
                para</v-subheader
            >
            <v-list-item-group v-model="item" color="">
                <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            v-text="item.text"
                        ></v-list-item-title>
                        <v-list-item-action>
                            <v-btn
                                text
                                small
                                color="primary"
                                v-text="item.btn"
                            ></v-btn>
                        </v-list-item-action>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <!-- <v-card-text class="pt-14"
                >Obtenga e ingrese el código en la camara correspondiente para
                inicializarla.</v-card-text
            >
            <v-divider width="350px"></v-divider>
            <div class="pt-2">Camara secreta 1</div>
            <v-btn text small color="primary" class="mb-2"
                >Obtener codigo</v-btn
            >
            <v-divider width="350px"></v-divider>
            <div class="pt-2">Camara secreta 1</div>
            <v-btn text small color="primary" class="mb-2"
                >Obtener codigo</v-btn
            >
            <v-divider width="350px"></v-divider> -->

        <!-- <v-bottom-navigation absolute horizontal>
                            <v-btn
                                text
                                small
                                color="primary"
                                buttom
                                href="/home"
                                >Cancelar</v-btn
                            >
                            <v-spacer></v-spacer>
                            <v-btn text small color="primary" buttom
                                >Aceptar</v-btn
                            >
                        </v-bottom-navigation> -->
        <!-- </v-card>
                </v-col>
            </v-row>
        </v-container> -->
    </div>
</template>
<script>
export default {
    name: 'PxFormCamara',
    data: () => ({
        item: 0,
        items: [
            {
                text: 'Camara Secreta 1',
                btn: 'Obtener codigo',
                icon: 'mdi-lock'
            },
            {
                text: 'Camara Secreta 2',
                btn: 'Obtener codigo',
                icon: 'mdi-lock'
            }
        ]
    })
}
</script>
