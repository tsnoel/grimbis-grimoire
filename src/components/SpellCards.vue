<template>
    <el-row :gutter="20" class="cards">
        <el-col :xs="24" :sm="8" :md="6" :xl="4"
            v-for="card in all"
            :key="card.id" class="single-card">
            <div class="card-container-sakura">
                <i class="el-icon-error"
                    @click="removeCard(card.id); saveCookies();">
                </i>
                <spell-info :id="card.id"></spell-info>
            </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="6" :xl="4" class="single-card">
            <spell-search class="card-container-sakura"
                @refresh="refresh(); saveCookies();">
            </spell-search>
        </el-col>
    </el-row>
</template>

<script>
import { ElCol, ElRow } from 'element-plus';

import SpellInfo from './SpellInfo.vue';
import SpellSearch from './SpellSearch.vue';
import cardsModel from '../models/cards';

export default {
    name: 'spell-cards',
    components: {
        [ElCol.name]: ElCol,
        [ElRow.name]: ElRow,
        [SpellInfo.name]: SpellInfo,
        [SpellSearch.name]: SpellSearch
    },
    data() {
        return {
            cardsModel,
            all: []
        };
    },
    beforeMount() {
        this.loadCookies();
        this.refresh();
    },
    methods: {
        loadCookies() {
            cardsModel.load(this.$cookies.get('spells'));
        },
        async refresh() {
            this.all = [...cardsModel.all];
            await this.$nextTick();
        },
        async removeCard(id) {
            cardsModel.remove(id);
            await this.refresh();
        },
        saveCookies() {
            this.$cookies.set('spells', JSON.stringify([...cardsModel.all]), Infinity);
        }
    }
}
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';

.cards {
    margin: 0 !important;
    width: 100%;

    .single-card {
        padding: 0.5rem !important;
    }
}

.card-container-sakura {
    height: 20rem;

    .el-icon-error {
        background-color: $generic-card;
        border-radius: 1rem;
        color: red;
        cursor: pointer;
        font-size: 1.5rem;
        opacity: 0;
        position: relative;
        top: -0.5rem;
        left: 94%;
        z-index: 100;
    }

    &:hover {
        .el-icon-error {
            opacity: 1;
        }
    }
}

</style>
