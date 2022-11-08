import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(mdiVue, {
  icons: mdijs,
})
app.use(pinia)
app.mount('#app')
