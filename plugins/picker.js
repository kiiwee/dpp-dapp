import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtAp
    nuxtApp.vueApp.use(VCalendar, {})
})