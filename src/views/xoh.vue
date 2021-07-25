<template>
    <el-row class="character">
        <!-- Abilities -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <abilities></abilities>
        </el-col>
        <!-- Skills -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <skills></skills>
        </el-col>
        <!-- Health, Movement, and Defense -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <health></health>
        </el-col>
        <!-- Spirit & Magic -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <magic></magic>
        </el-col>
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
        </el-col>
    </el-row>
</template>

<script>
import { ElCol, ElRow } from 'element-plus';

import Abilities from '../components/xoh/abilities';
import Skills from '../components/xoh/skills';
import Health from '../components/xoh/health';
import Magic from '../components/xoh/magic';

import character from '../models/xoh';

export default {
    name: 'xoh',
    components: {
        [ElCol.name]: ElCol,
        [ElRow.name]: ElRow,
        [Abilities.name]: Abilities,
        [Skills.name]: Skills,
        [Health.name]: Health,
        [Magic.name]: Magic
    },
    data() {
        return {};
    },
    beforeMount() {
        console.log(character);
    }
}
</script>

<style lang="scss">
@import '../styles/colors';

.character {
    padding: 1rem 0 0 1rem;

    .divider {
        margin: 1rem 0;
        width: calc(100% - 1rem);
    }

    .divider ::v-deep(.el-divider__text) {
        background-color: color(slate, 50);
        font-size: 1rem;
        font-weight: bold;
    }

    .column-card ::v-deep(.el-card__body) {
        padding: 1rem 0.5rem;
    }

    .column-card {
        border-radius: 0.6rem;
        height: 30rem;
        margin: 0 1rem 1rem 0;
        width: calc(100% - 1rem);

        &.half-card {
            height: 13.65rem;
            margin-bottom: 1rem;
        }

        &.two-third-card {
            height: 18.5rem;
            margin-bottom: 2rem;
        }

        &.third-card {
            height: 8.3rem;
            margin-bottom: 1rem;
        }
    }
}
</style>
