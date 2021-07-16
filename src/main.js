import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import VueCookies from 'vue3-cookies'
import 'element-plus/lib/theme-chalk/index.css';

createApp(App).use(VueCookies).use(router).mount('#app');
