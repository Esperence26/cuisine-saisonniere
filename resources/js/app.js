import './bootstrap';
import '../css/app.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import fr from './locales/fr.json';

// Create Pinia store
const pinia = createPinia();

// Create i18n instance
const i18n = createI18n({
    legacy: false,
    locale: 'fr',
    fallbackLocale: 'fr',
    messages: {
        fr
    }
});

// Create Vue app
const app = createApp(App);

// Use plugins
app.use(pinia);
app.use(router);
app.use(i18n);

// Mount app
app.mount('#app');
