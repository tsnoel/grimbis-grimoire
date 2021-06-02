<template>
    <div class="card-container-sakura">
        <i class="el-icon-error" @click="emitRemove"></i>
        <spell-info v-if="data.name"
            :data="data"
            :selectedClass="selectedClass">
        </spell-info>
        <spell-search v-else
            @confirm="emitConfirm">
        </spell-search> 
    </div>
</template>

<script>
import SpellInfo from './SpellInfo.vue';
import SpellSearch from './SpellSearch.vue';
import phb from '../assets/spells.json';

export default {
    name: 'spell-card',
    components: {
        [SpellInfo.name]: SpellInfo,
        [SpellSearch.name]: SpellSearch
    },
    props: {
        data: Object,
        index: Number
    },
    data() {
        return {
            selectedClass: ''
        };
    },
    methods: {
        emitConfirm(selected) {
            this.selectedClass = selected.class;

            this.$emit('confirm', {
                key: this.index,
                data: phb.find((p) => p.name === selected.spell)
            });
        },
        emitRemove() {
            this.$emit('remove', this.index);
        }
    }
}
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';

.card-container-sakura {
    height: 21rem;
    margin: 1.5rem;
    width: 15rem;

    .el-icon-error {
        background-color: $generic-card;
        border-radius: 1rem;
        color: red;
        cursor: pointer;
        font-size: 1.5rem;
        opacity: 0;
        position: relative;
        top: -0.5rem;
        left: 14rem;
        z-index: 100;
    }

    &:hover {
        .el-icon-error {
            opacity: 1;
        }
    }
}

</style>
