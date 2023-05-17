import './assets/main.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'


import './assets/main.scss';
import './assets/style.css';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './Routes/routes';

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    strict: true
})
const pinia = createPinia()

const app = createApp(App)
app.use(pinia);
app.use(router)
app.mount('#app')
