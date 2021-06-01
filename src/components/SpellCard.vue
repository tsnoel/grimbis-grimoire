<template>
    <div class="card-container-sakura">
        <i class="el-icon-error" @click="emitRemove"></i>
        <div class="spell-container" v-if="data.name"
            :class="selectedClass">
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
                        <span v-if="data.higher_level">
                            <br/><br/>
                            <b>At higher levels</b>
                            <br/>
                            {{data.higher_level}}
                        </span>
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
            this.selectedSpell = undefined;

            this.spells = val === 'Other' ? phb :
                phb.filter((p) => p.class.includes(val));

            this.spells.sort((a, b) => a.level_int - b.level_int);
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

<style scoped lang="scss">
@import '../styles/colors.scss';

.card-container-sakura {
    height: 21rem;
    margin: 1.5rem;
    width: 15rem;

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

    &:hover {
        .el-icon-error {
            opacity: 1;
        }
    }
}

.spell-container {
    height: 100%;
    position: relative;
    top: -1.5rem;

    > * {
        border-color: $other;
        background-color: rgba($other, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($other, 0.5);
        }
    }

    &.Artificer > * {
        border-color: $artificer;
        background-color: rgba($artificer, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($artificer, 0.3);
        }
    }
    &.Bard > * {
        border-color: $bard;
        background-color: rgba($bard, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($bard, 0.3);
        }
    }
    &.Cleric > * {
        border-color: $cleric;
        background-color: rgba($cleric, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($cleric, 0.3);
        }
    }
    &.Druid > * {
        border-color: $druid;
        background-color: rgba($druid, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($druid, 0.3);
        }
    }
    &.Paladin > * {
        border-color: $paladin;
        background-color: rgba($paladin, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($paladin, 0.3);
        }
    }
    &.Ranger > * {
        border-color: $ranger;
        background-color: rgba($ranger, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($ranger, 0.3);
        }
    }
    &.Sorcerer > * {
        border-color: $sorcerer;
        background-color: rgba($sorcerer, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($sorcerer, 0.3);
        }
    }
    &.Warlock > * {
        border-color: $warlock;
        background-color: rgba($warlock, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($warlock, 0.3);
        }
    }
    &.Wizard > * {
        border-color: $wizard;
        background-color: rgba($wizard, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($wizard, 0.3);
        }
    }

    .spell-body-footer, .spell-header {
        border-width: 2px;
        border-radius: 0.45rem;
        border-style: solid;
    }

    .spell-header {
        border-bottom: 0;
        height: 2.5rem;

        .name {
            text-align: center;
            border-radius:0.25rem;
            font-size: 1rem;
            font-weight: 600;
        }

        .level {
            text-align: center;
            font-style: italic;
            font-size:0.9rem;
        }
    }

    .spell-body-footer {
        border-top: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100% - 2.5rem);

        .spell-body {
            .spell-meta {
                border-radius:0.3rem;
                margin:0.2rem 0.2rem 0;
                display: flex;
                flex-direction: row;
                font-size:0.75rem;

                >span:first-child {
                    width:40%;
                    text-align: center;
                    color: #666;
                }
            }

            .desc {
                white-space: pre-line;
                padding: 0.5rem 1rem;
                font-size: 0.75rem;
                height: 11rem;
                overflow-y: scroll;
            }
        }

        .spell-footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-radius:0.3rem;
            font-size:0.75rem;
            padding: 0 1rem;
            position: absolute;
            bottom: -0.2rem;
            width: calc(100% - 2.2rem);
        }

    }

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
