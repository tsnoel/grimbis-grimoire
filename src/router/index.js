import { createWebHashHistory, createRouter } from 'vue-router';
import spells from '@/views/spells.vue';
import xoh from '@/views/xoh.vue';

const routes = [
    {
        path: '/',
        name: 'Spell Cards',
        component: spells
    },
    {
        path: '/xoh',
        name: 'Xoh',
        component: xoh
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
