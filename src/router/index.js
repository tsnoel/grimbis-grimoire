import { createWebHashHistory, createRouter } from 'vue-router';
import spells from '@/views/spells.vue';

const routes = [
    {
        path: '/',
        name: 'Spells',
        component: spells
    }
];

const router = createRouter({
    history: createWebHashHistory(), // '/grimoire/'),
    routes
});

export default router;
