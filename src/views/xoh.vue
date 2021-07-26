<template>
    <el-row class="character">
        <!-- Biography -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <divider label="Bio" :collapsed="collapsed.biography"
                @click="collapsed.biography = !collapsed.biography">
            </divider>
            <biography v-show="!collapsed.biography"></biography>
        </el-col>
        <!-- Abilities -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <divider label="Abilities" :collapsed="collapsed.abilities"
                @click="collapsed.abilities = !collapsed.abilities">
            </divider>
            <abilities v-show="!collapsed.abilities"></abilities>
        </el-col>
        <!-- Skills -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <divider label="Skills" :collapsed="collapsed.skills"
                @click="collapsed.skills = !collapsed.skills">
            </divider>
            <skills v-show="!collapsed.skills"></skills>
        </el-col>
        <!-- Health, Movement, and Defense -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <divider label="Health & Movement" :collapsed="collapsed.health"
                @click="collapsed.health = !collapsed.health">
            </divider>
            <health v-show="!collapsed.health"></health>
        </el-col>
        <!-- Magic -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <divider label="Spells" :collapsed="collapsed.magic"
                @click="collapsed.magic = !collapsed.magic">
            </divider>
            <magic v-show="!collapsed.magic"></magic>
        </el-col>
        <!-- Spirit -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <divider label="Spirit" :collapsed="collapsed.spirit"
                @click="collapsed.spirit = !collapsed.spirit">
            </divider>
            <spirit v-show="!collapsed.spirit"></spirit>
        </el-col>
    </el-row>
</template>

<script>
import { ElCol, ElRow } from 'element-plus';

import Abilities from '../components/xoh/abilities';
import Biography from '../components/xoh/biography';
import Skills from '../components/xoh/skills';
import Health from '../components/xoh/health';
import Magic from '../components/xoh/magic';
import Spirit from '../components/xoh/spirit';

import Divider from '../components/xoh/divider';

import character from '../models/xoh';

export default {
    name: 'xoh',
    components: {
        [ElCol.name]: ElCol,
        [ElRow.name]: ElRow,
        [Abilities.name]: Abilities,
        [Biography.name]: Biography,
        [Divider.name]: Divider,
        [Skills.name]: Skills,
        [Health.name]: Health,
        [Magic.name]: Magic,
        [Spirit.name]: Spirit
    },
    data() {
        return {
            collapsed: {
                abilities: false,
                biography: false,
                skills: false,
                health: false,
                magic: false,
                spirit: false
            }
        };
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

    .column-card ::v-deep(.el-card__body) {
        padding: 1rem 0.5rem;
    }

    .column-card {
        border-radius: 0.6rem;
        height: 30rem;
        margin: 0 1rem 1rem 0;
        overflow: scroll;
        width: calc(100% - 1rem);
    }
}
</style>
