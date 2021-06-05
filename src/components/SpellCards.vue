<template>
    <el-row :gutter="20" class="cards">
        <el-col :xs="24" :sm="8" :md="6" :xl="4"
            v-for="card in all"
            :key="card.id">
            <div class="card-container-sakura">
                <i class="el-icon-error"
                    @click="removeCard(card.id)">
                </i>
                <spell-info :id="card.id"></spell-info>
            </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <spell-search class="card-container-sakura"
                @refresh="refresh">
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
            all: [...cardsModel.all]
        };
    },
    methods: {
        async refresh() {
            this.all = [...cardsModel.all];
            await this.$nextTick();
        },
        async removeCard(id) {
            cardsModel.remove(id);
            await this.refresh();
        }
    }
}
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';

.cards {
    margin: 1rem 1rem 0 1rem !important;
    width: 100%
}

.card-container-sakura {
    height: 20rem;
    margin-bottom: 1rem;

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
