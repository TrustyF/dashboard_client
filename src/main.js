import './assets/main.css'
import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide('curr_api', "http://127.0.0.1:5000")

app.mount('#app')
