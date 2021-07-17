<template>
    <el-row :gutter="20" class="character">
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <el-card class="meta">
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
        </el-col>
    </el-row>
</template>

<script>
import { ElCol, ElRow, ElCard } from 'element-plus';

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
        [ElCard.name]: ElCard
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
                'STR': {val: 7, prof: true},
                'DEX': {val: 20, prof: true},
                'CON': {val: 14, prof: false},
                'INT': {val: 8, prof: false},
                'WIS': {val: 14, prof: false},
                'CHA': {val: 14, prof: false}
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
</style>
