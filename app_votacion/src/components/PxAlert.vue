<template>
    <div class="pa-10">
        <v-alert text :color="info == true ? 'info' : 'teal'">
            <h3 class="headline">Información</h3>
            <div>
                {{ mensajeInfo }}
            </div>

            <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>

            <v-row class="flex items-center" no-gutters>
                <span class="flex-1 text-center pt-3">
                    {{ mensajeValidacion }}
                </span>
            </v-row>
            <v-row class="flex-1 text-center py-3" no-gutters>
                <!-- Si la opcionGuardada es null se muestra la opcion seleccionada por el votante -->
                <span
                    class="flex-1 text-center text-4xl"
                    v-if="votoGuardado == null"
                >
                    {{ votoSeleccionado }}.
                </span>
                <!-- Si no es null entonces es el voto retornado desde la api  -->
                <span class="flex-1 text-center text-4xl" v-else>
                    {{ votoGuardado }}.
                </span>
            </v-row>
            <v-row :class="info == false ? ' ' : 'hidden'">
                <v-flex class="justify-center items-center">
                    <div class="">
                        <v-card
                            class="mx-auto my-12"
                            elevation="10"
                            max-width="335"
                        >
                            <v-card-title width="320">
                                <span>Comprobante impreso</span>
                            </v-card-title>
                            <div ref="qr">
                                <qrcode-vue
                                    :value="value"
                                    :size="size"
                                    level="H"
                                    class="p-4"
                                ></qrcode-vue>
                                <!-- Para impresion se tomara una imagen mas pequeña, no se mostrara en html-->
                                <qrcode-vue
                                    :value="value"
                                    :size="250"
                                    level="H"
                                    class="hidden"
                                    id="qrcode"
                                ></qrcode-vue>

                                <v-divider class="mx-4"></v-divider>
                                <v-card-text class="max-w-xs py-4">
                                    <span> {{ text }} </span>
                                </v-card-text>
                            </div>
                        </v-card>
                    </div>
                </v-flex>
            </v-row>

            <v-row>
                <v-spacer></v-spacer>
                <v-col :class="info == true ? 'shrink' : 'd-none'">
                    <v-btn color="info" outlined @click="$emit('alert', false)">
                        Volver
                    </v-btn>
                </v-col>
                <v-col :class="info == true ? 'shrink' : 'd-none'">
                    <v-btn
                        color="info"
                        outlined
                        @click="send(opcion), $emit('voto', true)"
                    >
                        Enviar
                    </v-btn>
                </v-col>
            </v-row>
        </v-alert>
    </div>
</template>
<script>
import Axios from 'axios'
import NodeRSA from 'node-rsa'
import key from '../data/data'
import jsPDF from 'jspdf'
import QrcodeVue from 'qrcode.vue'
import Cookies from 'js-cookie'
export default {
    name: 'PxAlert',
    components: { QrcodeVue },
    props: ['opcion'],
    data() {
        return {
            info: true,
            mensajeInfo: `A continuación se realizará el envío del voto, verifique que el nombre del candidato corresponde al seleccionado.`,
            mensajeValidacion: `Su candidato seleccionado es: `,
            votoGuardado: null,
            value: '',
            size: 300,
            votoElector: this.opcion,
            text: `
Deposite este comprobante
en la urna ${this.opcion.cargo.toUpperCase()}
ubicada en la mesa receptora
de sufragio`
        }
    },
    computed: {
        votoSeleccionado: function() {
            return (
                this.opcion.nombre +
                ' ' +
                this.opcion.apellidoPat +
                ' ' +
                this.opcion.apellidoMat
            )
        }
    },
    methods: {
        send(candidato) {
            console.log('candidato ' + candidato.nombre)
            this.loading = true
            let publicK = key.public
            let privateK = key.private
            let option = [
                {
                    encryptionScheme: 'pkcs1_oaep',
                    signingScheme: 'pkcs1-sha256'
                }
            ]
            const public_key = new NodeRSA(publicK, option)
            const private_key = new NodeRSA(privateK, option)
            const fullname = `${candidato.nombre} ${candidato.apellidoPat} ${candidato.apellidoMat}`
            console.log('fullname: ', fullname)
            console.time('encrypt time')
            const encrypted = public_key.encrypt(fullname, 'base64')
            console.log('encrypted: ', encrypted)

            let url =
                'http://localhost:3700/votacion/guardar_voto/' + candidato.cargo
            let token = Cookies.get('token')
            let data = { voto: encrypted }
            let headers = { headers: { 'access-token': token } }

            Axios.post(url, data, headers)
                .then(response => {
                    let votoEncripted = response.data.voto.voto
                    this.info = false
                    this.mensajeInfo = `El sufragio se ha realizado de forma exitosa.`
                    this.mensajeValidacion = `Voto emitido: `
                    const decrypted = private_key.decrypt(votoEncripted, 'utf8')
                    this.votoGuardado = decrypted
                    console.log('votoGuardado ' + this.votoGuardado)
                    this.value = votoEncripted
                })
                .then(() => this.createPDF())
                .catch(err => console.log(err))
            setTimeout(() => (this.loading = false), 2000)
        },
        createPDF() {
            let pdfName = 'Comprobante sufragio'
            var doc = new jsPDF({
                unit: 'cm',
                format: [450, 280]
            })
            var qrcode = document.getElementById('qrcode')
            console.dir(qrcode)
            let imageData = this.getBase64Image(qrcode.firstChild)
            doc.text(1, 1, 'Comprobante impreso')
            doc.addImage(imageData, 'JPG', 1, 2)
            doc.text(1, 11, this.text)
            doc.save(pdfName + '.pdf')
        },
        getBase64Image(img) {
            var canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            var ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            var dataURL = canvas.toDataURL('image/png')
            return dataURL
        }
    }
}
</script>
