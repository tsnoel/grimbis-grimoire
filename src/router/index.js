import { createWebHashHistory, createRouter } from 'vue-router';
import items from '@/views/items.vue';
import spells from '@/views/spells.vue';
import xoh from '@/views/xoh.vue';

const routes = [
    {
        path: '/',
        name: 'Spell Cards',
        component: spells
    },
    {
        path: '/character-sheet',
        name: 'Xoh',
        component: xoh
    },
    {
        path: '/items',
        name: 'Items',
        component: items
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
