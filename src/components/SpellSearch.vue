<template>
    <div class="search-n-spell">
        <div class="search-inputs">
            <el-select v-model="selectedClass"
                placeholder="Select Class"
                popper-class="popper">
                <el-option
                    v-for="c in classes"
                    :key="c"
                    :label="c"
                    :value="c">
                    <span class="class-option-name">
                        {{c === 'Other' ? 'Other / Achetype' : c}}
                    </span>
                </el-option>
            </el-select>
            <el-select filterable
                v-model="selectedSpell"
                :disabled="!selectedClass"
                placeholder="Select Spell"
                popper-class="popper">
                <el-option
                    v-for="s in spells"
                    class="spell-option"
                    :key="s.name"
                    :label="s.name"
                    :value="s.name">
                    <span class="spell-option-name">
                        {{s.name}}
                    </span>
                    <span class="spell-option-level">
                        {{s.level_int}}
                    </span>
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
</template>

<script>
import { ElButton, ElSelect, ElOption } from 'element-plus';
import phb from '../assets/spells.json';

export default {
    name: 'spell-search',
    props: {},
    components: {
        [ElOption.name]: ElOption,
        [ElButton.name]: ElButton,
        [ElSelect.name]: ElSelect
    },
    data() {
        return {
            classes: [
                // 'Artificer',
                'Bard',
                'Cleric',
                'Druid',
                'Paladin',
                'Ranger',
                'Sorcerer',
                'Warlock',
                'Wizard',
                'Other'
            ],
            selectedClass: undefined,
            selectedSpell: undefined,
            spells: []
        };
    },
    watch: {
        selectedClass(val) {
            this.selectedSpell = undefined;

            this.spells = val === 'Other' ? phb :
                phb.filter((p) => p.class.includes(val));

            this.spells.sort((a, b) => a.level_int - b.level_int);
        }
    },
    methods: {
        emitConfirm() {
            this.$emit('confirm', {
                spell: this.selectedSpell,
                class: this.selectedClass
            });
        }
    }
}
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';

.search-n-spell {
    background-color: $generic-card;
    border: 0.1rem solid $secondary-text;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 0rem 1rem;
    position: relative;
    top: -1.5rem;

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

        .confirm-button {
            height: 3rem;
            margin: 6rem 0 1rem 0;
            width: 50%;
        }
    }
}
</style>
