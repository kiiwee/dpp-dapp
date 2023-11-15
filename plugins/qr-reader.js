import { VueQrcodeReader, } from 'vue-qrcode-reader'

export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtAp
    nuxtApp.vueApp.use(VueQrcodeReader, {})
})