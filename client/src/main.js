import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'
import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
pinia.use(({ store }) => {
    store.router = markRaw(router)
})
app.use(vue3GoogleLogin, {
    clientId: '965947261698-egtgnshm8binpgbn8v3emii6p0rq42kp.apps.googleusercontent.com'
})
app.mount('#app')
