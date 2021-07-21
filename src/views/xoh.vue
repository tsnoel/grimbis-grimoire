<template>
    <el-row class="character">
        <!-- Abilities -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <abilities :abilities="abilities"></abilities>
        </el-col>
        <!-- Skills -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <skills :skills="skills"></skills>
        </el-col>
        <!-- Health, Movement, and Defense -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <health
                :hp="hp" :speed="speed"
                :ac="ac" :hd="hd"
                :initative="initative"
                :wholeness="wholeness"
                :healing="healing">
            </health>
        </el-col>
        <!-- Spirit & Magic -->
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <magic :ki="ki"
                :spellMeta="spellMeta"
                :spellSlots="spellSlots"
                :uv="unsettling">
            </magic>
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
        [Abilities.name]: Abilities,
        [Skills.name]: Skills,
        [Health.name]: Health,
        [Magic.name]: Magic
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
            unsettling: {
                current: 1,
                max: 1
            },
            wholeness: {
                current: 1,
                max: 1
            },
            healing: {
                current: 3,
                max: 3
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
            hd: {
                max: [],
                current: []
            },
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
            this.hd.max.push(`${hdMap[hd]}d${hd}`);
            this.hd.current.push(`d${hd}`);
        });

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

<style lang="scss">
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

        &.two-third-card {
            height: 19.1rem;
            margin-bottom: 1.5rem;
        }

        &.third-card {
            height: 8.2rem;
            margin-bottom: 1.5rem;
        }
    }
}
</style>
