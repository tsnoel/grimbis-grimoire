<template>
    <div class="card-container-sakura">
        <i class="el-icon-error" @click="emitRemove"></i>
        <div class="spell-container" v-if="data.name">
            <div class="spell-header">
                <div class="name">{{data.name}}</div>
                <div class="level">
                    {{data.level}} {{data.school}}
                </div>
            </div> 
            <div class="spell-body-footer">
                <div class="spell-body">
                    <div class="spell-meta"
                        v-for="m in meta"
                        :key="m.key">
                        <span>{{m.label}}</span>
                        <span>{{data[m.key]}}</span>
                    </div>
                    <div class="desc">
                        {{data.desc}}
                    </div>
                </div>
                <div class="spell-footer">
                    <span class="dndclass">{{selectedClass}}</span>
                    <span class="source">{{data.page}}</span>
                </div>
            </div>
        </div>
        <div class="search-n-spell" v-else>
            <div class="search-inputs">
                <el-select v-model="selectedClass"
                    placeholder="Select Class"
                    popper-class="popper">
                    <el-option
                        v-for="c in classes"
                        :key="c"
                        :label="c"
                        :value="c">
                    </el-option>
                </el-select>
                <el-select v-model="selectedSpell"
                    :disabled="!selectedClass"
                    placeholder="Select Spell"
                    popper-class="popper">
                    <el-option
                        v-for="s in spells"
                        :key="s.name"
                        :label="s.name"
                        :value="s.name">
                    </el-option>
                </el-select>
            </div>
            <div class="confirm-button-container">
                <el-button
                    class="confirm-button"
                    :disabled="!selectedSpell"
                    type="primary"
                    @click="emitConfirm">
                    Confirm
                </el-button>
            </div>
        </div> 
    </div>
</template>

<script>
// This could be cool
// https://www.npmjs.com/package/markdown-it-vue

import { ElButton, ElSelect, ElOption } from 'element-plus';
import phb from '../assets/spells.json';

export default {
    name: 'spell-card',
    props: {
        data: Object,
        index: Number
    },
    components: {
        [ElOption.name]: ElOption,
        [ElButton.name]: ElButton,
        [ElSelect.name]: ElSelect
    },
    data() {
        return {
            classes: [
                'Bard',
                'Cleric',
                'Druid',
                'Paladin',
                'Ranger',
                'Sorcerer',
                'Warlock',
                'Wizard'
            ],
            meta: [
                {key: 'casting_time', label: 'Casting Time'},
                {key: 'range', label: 'Range'},
                {key: 'duration', label: 'Duration'},
                {key: 'components', label: 'Components'}
            ],
            selectedClass: undefined,
            selectedSpell: undefined,
            spells: []
        };
    },
    watch: {
        selectedClass(val) {
            this.spells = phb.filter((p) => p.class.includes(val));
        }
    },
    methods: {
        emitConfirm() {
            this.$emit('confirm', {
                key: this.index,
                data: phb.find((p) => p.name === this.selectedSpell)
            });
        },
        emitRemove() {
            this.$emit('remove', this.index);
        }
    }
}
</script>

<style scoped>
.card-container-sakura {
    height: 20rem;
    margin: 0 2rem 2rem 0;
    width: 15rem;
}

.card-container-sakura:hover .el-icon-error {
    opacity: 1;
}

.el-icon-error {
    background-color: white;
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

.spell-container {
    height: 100%;
    position: relative;
    top: -1.5rem;
}

.name {
    text-align: center;
    background-color: var(--bgcolor);
    border-radius:0.25rem;
    font-size: 1rem;
    font-weight: 600;
}

.level {
    text-align: center;
    font-style: italic;
    font-size:0.9rem;
}

.spell-meta {
    background-color: var(--bgcolor);
    border-radius:0.3rem;
    margin:0.2rem 0.2rem 0;
    display: flex;
    flex-direction: row;
    font-size:0.75rem;
}

.spell-meta span:first-child {
    width:40%;
    text-align: center;
    color: #666;
}

.spell-body-footer, .spell-header {
    background-color: white;
    border: 2px solid #b00b69;
    border-radius: 0.45rem;
}

.spell-body-footer {
    border-top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 2.5rem);
}

.spell-header {
    border-bottom: 0;
    height: 2.5rem;
}

.desc {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    height: 11rem;
    overflow-y: scroll;
}

.spell-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: var(--bgcolor);
    border-radius:0.3rem;
    font-size:0.75rem;
    padding: 0 1rem;
}

.search-n-spell {
    background-color: white;
    border: 0.1rem solid darkgray;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 0rem 1rem;
    position: relative;
    top: -1.5rem;
}

.search-inputs {
    display: flex;
    flex-direction: column;
    height: 10rem;
    justify-content: space-around;
    margin-top: 3rem;
}

.confirm-button-container {
    display: flex;
    flex-direction: row;
    height: 10rem;
    justify-content: center;
}

.confirm-button {
    height: 3rem;
    margin: 6rem 0 1rem 0;
    width: 50%;
}

</style>
