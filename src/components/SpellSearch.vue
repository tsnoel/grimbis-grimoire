<template>
    <div class="search-n-spell">
        <div class="search-inputs">
            <el-divider>
                <span>Filter</span>
            </el-divider>
            <el-select v-model="filteredClass"
                clearable
                placeholder="Filter by Class"
                popper-class="popper">
                <el-option
                    v-for="c in classes"
                    :key="c"
                    :value="c">
                    <span class="class-option-name">
                        {{c}}
                    </span>
                </el-option>
            </el-select>
        </div>

        <div class="search-inputs">
            <el-divider>
                <span>Required Info</span>
            </el-divider>
            <div class="tag-select-container">
                <el-select filterable
                    class="tag-select"
                    v-model="selectedTag"
                    placeholder="Select Tag"
                    popper-class="popper">
                    <el-option
                        v-for="t in tagsModel.all"
                        class="spell-option"
                        :key="t.id"
                        :label="t.label"
                        :value="t.id">
                        <span class="spell-option-name">
                            {{t.label}}
                        </span>
                        <span class="tag-option-preview"
                            :style="{'background-color': t.color, 'color': isWhiteText(t.color)}">
                            {{t.color}}
                        </span>
                    </el-option>
                </el-select>
                <!--span v-if="selectedTag !== undefined" class="tag-select-preview">
                    Preview
                    <span class="tag-select-preview-badge"
                        :style="{'background-color': tagsModel.fetch(selectedTag).color, 'color': isWhiteText(tagsModel.fetch(selectedTag).color)}">
                        {{tagsModel.fetch(selectedTag).label}}
                    </span>
                </span-->
            </div>

            <el-select filterable
                v-model="selectedSpell"
                placeholder="Select Spell"
                popper-class="popper">
                <el-option
                    v-for="s in spells"
                    class="spell-option"
                    :key="s.id"
                    :label="s.name"
                    :value="s.id">
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
                :disabled="!selectedSpell || !selectedTag"
                type="primary"
                @click="confirmCard">
                Add Spell
            </el-button>
        </div>
    </div>
</template>

<script>
import { ElButton, ElSelect, ElOption, ElDivider } from 'element-plus';
import phb from '../assets/spells.json';

import cardsModel from '../models/cards';
import tagsModel from '../models/tags';

export default {
    name: 'spell-search',
    components: {
        [ElDivider.name]: ElDivider,
        [ElOption.name]: ElOption,
        [ElButton.name]: ElButton,
        [ElSelect.name]: ElSelect
    },
    data() {
        return {
            tagsModel,
            classes: [
                // 'Artificer',
                'Bard',
                'Cleric',
                'Druid',
                'Paladin',
                'Ranger',
                'Sorcerer',
                'Warlock',
                'Wizard'
            ],
            filteredClass: undefined,
            selectedTag: undefined,
            selectedSpell: undefined,
            spells: phb.sort((a, b) => a.level_int - b.level_int)
        };
    },
    watch: {
        filteredClass(val) {
            this.spells = val ?
                phb.filter((p) => p.class.includes(val)) : phb;

            this.spells.sort((a, b) => a.level_int - b.level_int);
        }
    },
    methods: {
        confirmCard() {
            cardsModel.add(this.selectedTag, this.selectedSpell);
            this.$emit('refresh');
        },
        isWhiteText(hex) {
            let result =
                /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            let r = result ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16)
            ] : [0, 0, 0];
            return (r[0]*0.299 + r[1]*0.587 + r[2]*0.114) <= 186 ? '#fff' : '#000';
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
    justify-content: space-around;
    padding: 0 1rem;

    .search-inputs {
        display: flex;
        flex-direction: column;

        .tag-select-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 1rem;

            .tag-select {
                width: 100%;
            }

            .tag-select-preview {
                width: 30%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 0.65rem;
                color: $secondary-text;
                align-items: center;

                .tag-select-preview-badge {
                    font-size: .8rem;
                    padding: .25rem;
                    border-radius: 0.25rem;
                    width: fit-content;
                }
            }
        }
    }

    .confirm-button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;

        .confirm-button {
            height: 3rem;
            width: 50%;
        }
    }
}
</style>
