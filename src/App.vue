<template>
    <div class="container">
        <spell-card
            v-for="(spell, index) in spells"
            :key="index + ' ' + refresh"
            :index="index"
            :data="spell"
            @confirm="confirmCard"
            @remove="removeCard">
        </spell-card>
        <div class="new-card" @click="addCard">
            <i class="el-icon-circle-plus-outline"></i>
        </div>
        <!--controls :data="spells"></controls-->
    </div>
</template>

<script>
import { ElIcon } from 'element-plus';
import SpellCard from './components/SpellCard.vue';
import Controls from './components/Controls.vue';


export default {
    name: 'App',
    components: {
        [ElIcon.name]: ElIcon,
        [Controls.name]: Controls,
        [SpellCard.name]: SpellCard
    },
    data() {
        return {
            refresh: 0,
            spells: [{}]
        };
    },
    methods: {
        addCard() {
            this.spells.push({});
        },
        confirmCard(data) {
            this.spells[data.key] = data.data;
        },
        removeCard(index) {
            this.spells.splice(index, 1);
            this.refresh++;
        }
    }
}
</script>

<style>
:root {
    --bgcolor: #e0e0e0;
}

html,
body,
#app,
.container {
    height: 100%;
}

html {
    background-color: #fbfbfb;
    font-family: 'Source Sans Pro', sans-serif;
}

body {
    margin: 2rem 0 0 2rem;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
}

.new-card {
    background-color: white;
    border: 0.2rem dashed lightgray;
    border-radius: 1rem;
    color: lightgray;
    cursor: pointer;
    font-size: 10rem;
    height: 10rem;
    margin: 0 2rem 2rem 0;
    padding: 4rem 2.5rem 6rem 2.5rem;
    width: 10rem;
}

</style>
