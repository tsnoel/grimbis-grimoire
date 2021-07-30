<template>
    <el-card class="column-card">
        <div class="spell-top">
            <div class="spell-meta">
                <div class="spell-meta-left">
                    <div class="spell-meta-label">Casting Modifier</div>
                    <div class="spell-meta-value">
                        {{character.castingMod > 0 ? '+' : ''}}{{character.castingMod}}
                    </div>
                </div>
                <div class="spell-meta-center">
                    <div class="spell-meta-label">Spell Attack</div>
                    <div class="spell-meta-value">
                        {{character.spellAttack > 0 ? '+' : ''}}{{character.spellAttack}}
                    </div>
                </div>
                <div class="spell-meta-right">
                    <div class="spell-meta-label">Spell Save DC</div>
                    <div class="spell-meta-value">
                        {{character.spellDC}}
                    </div>
                </div>
            </div>
            <!--div class="spell-slot-container"
                v-for="widget in widgets"
                :key="widget.id + widget.value.current">
                <expendable
                    :id="widget.id" :sub="widget.sub"
                    :value="widget.value">
                </expendable>
            </div>
            <div class="spell-slot-info">
                These refresh after a <b>short rest</b>.
            </div-->
        </div>
        <div class="spell-bottom">
            <div class="spell-btn-container" v-for="i in spells.length" :key="i">
                <divider size="small" :label="spells[i - 1][0].level"></divider>
                <div class="spell-btn-group">
                    <div class="spell-btn"
                        :class="{'active-spell': activeSpell.name === spell.name}"
                        v-for="spell in spells[i - 1]"
                        :key="spell.name" @click="activeSpell = spell">
                        {{spell.name}}
                    </div>
                </div>
            </div>
            <divider size="small"></divider>
            <div class="spell-info">
                <div class="spell-info-line-group">
                    <div v-for="spellLine in spellLines"
                        :key="spellLine.value" class="spell-info-line">
                        <span>{{spellLine.label}}</span>
                        <span v-if="activeSpell[spellLine.value] === true">
                            Yes
                        </span>
                        <span v-else-if="activeSpell[spellLine.value] === false">
                            No
                        </span>
                        <span v-else>{{activeSpell[spellLine.value]}}</span>
                    </div>
                </div>
                <div class="spell-info-desc">
                    <div>{{activeSpell.desc}}</div>
                    <div v-if="activeSpell.higher_level">
                        <br/>
                        <b>At higher levels</b>
                    </div>
                    <div>{{activeSpell.higher_level}}</div>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
import {
    ElCard
} from 'element-plus';

import Expendable from './expendable';
import Divider from './divider';
import character from '../../models/xoh';

export default {
    name: 'magic',
    components: {
        [Divider.name]: Divider,
        [ElCard.name]: ElCard,
        [Expendable.name]: Expendable
    },
    data() {
        return {
            activeSpell: character.spells[0],
            character,
            spellLines: [
                {label: 'Level', value: 'level'},
                {label: 'Cast Time', value: 'casting_time'},
                {label: 'Range', value: 'range'},
                {label: 'Duration', value: 'duration'},
                {label: 'Components', value: 'components'},
                // {label: 'Material', value: 'material'},
                {label: 'School', value: 'school'},
                {label: 'Ritual', value: 'ritual'},
                {label: 'Concentration', value: 'concentration'}
            ],
            spells: [
                character.spells.filter((s) => s.level_int === 0),
                character.spells.filter((s) => s.level_int === 1)
            ],
            widgets: [
                {id: 'Spell Slots', value: 'spellSlots',
                    sub: `level ${character.spellLevel}`}
            ]
        };
    },
    beforeMount() {
        console.log(this.activeSpell, this.spells);
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/colors';

.column-card ::v-deep(.el-card__body) {
    height: calc(100% - 1rem);
    padding: 0.5rem;
}

.spell-top {
    display: flex;
    flex-direction: column;
    height: 5rem;
    justify-content: space-between;

    .spell-meta {
        display: flex;
        flex-direction: row;
        height: 4.5rem;
        justify-content: space-between;
        width: 100%;

        .spell-meta-right,
        .spell-meta-center,
        .spell-meta-left {
            background-color: color(gray, light);
            height: 100%;
            text-align: center;
            width: 32%;
        }

        .spell-meta-right {
            border-radius: 0.25rem 2rem 2rem 0.25rem;

            .spell-meta-label {
                border-radius: 0.25rem 2rem 0.25rem 0.25rem;
            }
        }

        .spell-meta-center {
            border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;

            .spell-meta-label {
                border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
            }
        }

        .spell-meta-left {
            border-radius: 2rem 0.25rem 0.25rem 2rem;

            .spell-meta-label {
                border-radius: 2rem 0.25rem 0.25rem 0.25rem;
            }
        }

        .spell-meta-label,
        .spell-meta-value {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }

        .spell-meta-value {
            font-size: 2rem;
        }

        .spell-meta-label {
            background-color: color(gray, dark);
            color: color(white);
            font-size: 0.7rem;
            height: 1.4rem;
            left: 0;
            padding: 0.3rem;
            position: relative;
            top: 0;
        }
    }

    .spell-slot-container {
        width: 100%;
    }

    .spell-slot-info {
        color: color(gray, dark);
        font-size: 0.75rem;
        text-align: center;
        width: 100%;
    }
}

.spell-bottom {
    display: flex;
    flex-direction: column;
    height: calc(100% - 5rem);
    justify-content: space-between;
    width: 100%;

    .spell-btn-container {
        height: 12.5%;

        .spell-btn-group {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            height: 70%;
            justify-content: space-between;

            .spell-btn {
                background-color: color(gray, light);
                border-radius: 0.25rem;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                font-size: 0.65rem;
                justify-content: space-around;
                margin: 0 0.2rem 0.2rem 0.2rem;
                text-align: center;
                width: 20%;

                &.active-spell {
                    background-color: color(gray, dark);
                    color: color(white);
                }
            }
        }
    }

    .spell-info {
        display: flex;
        flex-direction: column;
        font-size: 0.65rem;
        height: calc(75% - 1rem);
        justify-content: space-between;

        .spell-info-line-group {
            display: flex;
            flex-direction: column;
            height: 45%;
            justify-content: space-between;
            text-transform: capitalize;
            white-space: nowrap;

            .spell-info-line {
                background-color: color(gray, light);
                border-radius: 0.3rem;
                display: flex;
                flex-direction: row;
                height: 0.8rem;
                width: 100%;

                span {
                    height: 0.8rem;
                    padding: 0 0.2rem;
                }

                span:first-child {
                    background-color: color(gray, dark);
                    border-radius: 0.3rem;
                    color: color(white);
                    width: 40%
                }

                span:last-child {
                    width: 60%;
                }
            }
        }

        .spell-info-desc {
            height: 54%;
            overflow: scroll;
        }
    }
}
</style>
