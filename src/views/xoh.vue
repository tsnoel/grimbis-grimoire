<template>
    <el-row class="character">
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <el-divider content-position="left"
                class="divider">Abilities</el-divider>
            <el-card class="column-card">
                <div class="ability-row" v-for="(value, ability) in abilities" :key="ability">
                    <div class="ability-label">
                        <span class="short">{{ability}}</span>
                        <span class="long">{{value.label}}</span>
                    </div>
                    <div class="ability-val">
                        <span class="val">{{value.val}}</span>
                        <span class="mod">{{value.mod > 0 ? '+' : ''}}{{value.mod}}</span>
                    </div>
                    <div class="ability-save" :class="{prof: value.prof}">
                        <span class="prof-label">{{value.prof ? 'Proficient' : ''}} Save</span>
                        <span class="save">
                            {{value.save > 0 ? '+' : ''}}{{value.save}}
                        </span>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <el-divider content-position="left"
                class="divider">Skills</el-divider>
            <el-card class="column-card">
                <div class="skill-row" :class="{prof: value.prof}"
                    v-for="(value, skill) in skills" :key="skill">
                    <span>
                        <span class="skill-ability">{{value.ability}}</span>
                        <span class="skill-name">{{skill}}</span>
                    </span>
                    <span class="skill-mod">
                        {{value.mod > 0 ? '+' : ''}}{{value.mod}}
                    </span>
                </div>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <el-divider content-position="left"
                class="divider">Health</el-divider>
            <el-card class="column-card half-card">
                max hp, current hp, temp hp, max hit dice, current hit dice
            </el-card>
            <el-divider content-position="left"
                class="divider">Magic</el-divider>
            <el-card class="column-card half-card">
                max spellslot, current spellslot, Spell dc/attack/abilitymod
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <el-divider content-position="left"
                class="divider">Ki</el-divider>
            <el-card class="column-card third-card">
                max and current
            </el-card>
            <el-divider content-position="left"
                class="divider">Movement & Defense</el-divider>
            <el-card class="column-card third-card">
                init, speed, ac
            </el-card>
            <el-divider content-position="left"
                class="divider">TBD</el-divider>
            <el-card class="column-card third-card">
                idk lol
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
        </el-col>
    </el-row>
</template>

<script>
import { ElCol, ElRow, ElCard, ElDivider } from 'element-plus';

import spells from '../assets/spells.json';

import actions from '../assets/xoh/actions.json';
import features from '../assets/xoh/features.json';
import personas from '../assets/xoh/personas.json';
import background from '../assets/xoh/background.json';

const HD = {
    'Warlock': 8,
    'Monk': 8
};
const COLORS = {
    'Warlock': '#FF00FF',
    'Monk': '#999900'
};
const SKILLS = {
    'Athletics': {ability: 'STR'},
    'Acrobatics': {ability: 'DEX'},
    'Sleight of Hand': {ability: 'DEX'},
    'Stealth': {ability: 'DEX'},
    'Arcana': {ability: 'INT'},
    'History': {ability: 'INT'},
    'Investigation': {ability: 'INT'},
    'Nature': {ability: 'INT'},
    'Religion': {ability: 'INT'},
    'Animal Handling': {ability: 'WIS'},
    'Insight': {ability: 'WIS'},
    'Medicine': {ability: 'WIS'},
    'Perception': {ability: 'WIS'},
    'Survival': {ability: 'WIS'},
    'Deception': {ability: 'CHA'},
    'Intimidation': {ability: 'CHA'},
    'Performance': {ability: 'CHA'},
    'Persuasion': {ability: 'CHA'}
};

export default {
name: 'xoh',
    components: {
        [ElCol.name]: ElCol,
        [ElRow.name]: ElRow,
        [ElCard.name]: ElCard,
        [ElDivider.name]: ElDivider
    },
    data() {
        return {
            actions,
            background,
            features,
            personas,
            level: {
                'Monk': {level: 8, sub: 'Way of the Open Hand', color: COLORS.Monk},
                'Warlock': {level: 2, sub: undefined, color: COLORS.Warlock}
            },
            proficiency: 4,
            hp: {
                current: 49,
                temp: 0,
                max: 0 // beforeMount
            },
            spellSlots: {
                current: 1,
                max: 2
            },
            ki: {
                current: 7,
                max: 8
            },
            abilities: {
                'STR': {val: 7, prof: true, label: 'Strength'},
                'DEX': {val: 20, prof: true, label: 'Dexterity'},
                'CON': {val: 14, prof: false, label: 'Constitution'},
                'INT': {val: 8, prof: false, label: 'Intelligence'},
                'WIS': {val: 14, prof: false, label: 'Wisdom'},
                'CHA': {val: 14, prof: false, label: 'Charisma'}
            },
            skillProfs: ['Acrobatics', 'Animal Handling', 'Athletics',
                'Insight', 'Persuasion', 'Survival'],
            speed: {'Walking': '45\''},
            spells: ['Light', 'Sacred Flame', 'Minor Illusion', 'Eldritch Blast',
                'Cure Wounds', 'Healing Elixir', 'Hex'],
            proficiencies: {
                armor: 'Light Armor',
                weapons: 'Shortsword, Simple Weapons',
                tools: 'Carpenter\'s Tools, Cook\'s Utensils, ' +
                    'Smith\'s Tools, Vehicles (Land)',
                languages: 'Common, Dwarvish, Undercommon'
            },
            currentPersona: 'Papa Kap',
            // Derived at runtime
            ac: 0,
            hd: [],
            initative: 0,
            spellMeta: {},
            skills: {}
        };
    },
    beforeMount() {
        Object.keys(this.abilities).forEach((ability) => {
            const val = this.abilities[ability].val;
            const prof = this.abilities[ability].prof;
            const mod = Math.floor((val - 10) / 2);

            this.abilities[ability].mod = mod;
            this.abilities[ability].save = mod +
                (prof ? this.proficiency : 0);
        });

        this.ac = 10 + this.abilities.DEX.mod + this.abilities.WIS.mod;
        this.initative = this.abilities.DEX.mod;

        let hdMap = {};
        Object.keys(this.level).forEach((dndClass, index) => {
            if (index === 0) {
                this.hp.max = HD[dndClass] + this.abilities.CON.mod;
                this.hp.max +=
                    ((HD[dndClass] / 2) + 1 + this.abilities.CON.mod)
                    * (this.level[dndClass].level - 1);
            } else {
                this.hp.max +=
                    ((HD[dndClass] / 2) + 1 + this.abilities.CON.mod)
                    * (this.level[dndClass].level);
            }

            hdMap[HD[dndClass]] = hdMap[HD[dndClass]] || 0;
            hdMap[HD[dndClass]] = hdMap[HD[dndClass]] +
                this.level[dndClass].level;
        });

        Object.keys(hdMap).forEach((hd) => {
            this.hd.push(`${hdMap[hd]}d${hd}`);
        });
        this.hd = this.hd.join(', ');

        Object.keys(SKILLS).forEach((skill) => {
            const ability = SKILLS[skill].ability;
            const prof = this.skillProfs.includes(skill);

            this.skills[skill] = {
                ability, prof,
                mod: this.abilities[ability].mod +
                    (prof ? this.proficiency : 0)
            }
        });

        let fullSpells = [];
        this.spells.forEach((spell) => fullSpells.push(spells.find((s) => s.name === spell)));
        this.spells = fullSpells;

        this.spellMeta = {
            castingMod: this.abilities.CHA.mod,
            spellAttack: this.proficiency + this.abilities.CHA.mod,
            spellDC: 8 + this.proficiency + this.abilities.CHA.mod
        };

        console.log(this);
    }
}
</script>

<style scoped lang="scss">
.character {
    padding: 1rem 0 0 1rem;

    .divider {
        margin: 1rem 0;
        width: calc(100% - 1rem);
    }

    .divider ::v-deep(.el-divider__text) {
        background-color: #FBFBFB;
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
            margin-bottom: 1.5rem;
        }

        &.third-card {
            height: 8.2rem;
            margin-bottom: 1.5rem;
        }

        .ability-row {
            border: 1px solid darkgray;
            border-radius: 0.75rem;
            display: flex;
            flex-direction: row;
            height: 4.25rem;
            margin: 0.25rem 0;

            .ability-label,
            .ability-val,
            .ability-save {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
            }

            .ability-label,
            .ability-save {
                border-radius: 0.6rem;
                width: 33%;
            }

            .ability-label {
                background-color: gray;
                border-right: 1px solid darkgray;
                color: white;
                font-weight: bold;

                .long {
                    color: lightgray;
                    font-size: 0.65rem;
                }

                .short {
                    font-size: 1.5rem;
                }
            }

            .ability-save {
                border-left: 1px solid darkgray;
                font-weight: bold;

                .prof-label {
                    color: gray;
                    font-size: 0.75rem;
                }

                &.prof {
                    background-color: gray;
                    color: white;

                    .prof-label {
                        color: lightgray;
                    }
                }

                .save {
                    font-size: 1.5rem;
                }
            }

            .ability-val {
                font-weight: bold;
                width: 34%;

                .mod {
                    color: gray;
                    font-size: 1rem;
                }

                .val {
                    font-size: 1.5rem;
                }
            }
        }

        .skill-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 0.2rem 0;
            padding: 0.05rem 0.5rem;

            .skill-name {
                font-weight: bold;
            }

            .skill-ability {
                font-size: 0.8rem;
                font-weight: bold;
                margin-right: 0.25rem;
                color: darkgray;
            }

            .skill-mod {
                margin-right: 0.25rem;
            }

            &.prof {
                background-color: gray;
                border-radius: 0.5rem;
                color: white;

                .skill-ability {
                    color: lightgray;
                }
            }
        }
    }
}
</style>
