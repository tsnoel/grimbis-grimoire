import spells from '../assets/spells.json';

import actions from '../assets/xoh/actions.json';
import equipment from '../assets/xoh/equipment.json';
import features from '../assets/xoh/features.json';
import personas from '../assets/xoh/personas.json';
import background from '../assets/xoh/background.json';

const HD = {
    sorcerer: 6,
    wizard: 6,
    artificer: 8,
    bard: 8,
    cleric: 8,
    druid: 8,
    monk: 8,
    rouge: 8,
    warlock: 8,
    fighter: 10,
    paladin: 10,
    ranger: 10,
    barbarian: 12
};

const SAVE = {
    artificer: ['CON', 'INT'],
    barbarian: ['STR', 'CON'],
    bard: ['DEX', 'CHA'],
    cleric: ['WIS', 'CHA'],
    druid: ['INT', 'WIS'],
    fighter: ['STR', 'CON'],
    monk: ['STR', 'DEX'],
    paladin: ['WIS', 'CHA'],
    ranger: ['STR', 'DEX'],
    rogue: ['DEX', 'INT'],
    sorcerer: ['CON', 'CHA'],
    warlock: ['WIS', 'CHA'],
    wizard: ['INT', 'WIS']
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

class Character {

    constructor() {
        this.abilities = {
            'STR': {val: 7, label: 'Strength'},
            'DEX': {val: 20, label: 'Dexterity'},
            'CON': {val: 14, label: 'Constitution'},
            'INT': {val: 8, label: 'Intelligence'},
            'WIS': {val: 14, label: 'Wisdom'},
            'CHA': {val: 14, label: 'Charisma'}
        },
        this.ac = undefined;
        this.actions = actions;
        this.background = background;
        this.castingMod = undefined;
        this.equipment = equipment;
        this.expendables = {
            healing: {current: 3, max: 3},
            hd: {max: [], current: []},
            hp: {current: 49, temp: 0, max: 0},
            ki: {current: 7,max: 8},
            spellSlots: {current: 1,max: 2},
            unsettling: {current: 1, max: 1},
            wholeness: {current: 1, max: 1}
        };
        this.features = features;
        this.initiative = undefined;
        this.level = {
            'monk': {level: 8, sub: 'Way of the Open Hand'},
            'warlock': {level: 2, sub: 'Celestial Patron'}
        };
        this.persona = undefined;
        this.proficiencies = {
            armor: ['Light Armor'],
            languages: ['Common', 'Dwarvish', 'Undercommon'],
            skills: ['Acrobatics', 'Animal Handling', 'Athletics',
                'Insight', 'Persuasion', 'Survival'],
            tools: ['Carpenter\'s Tools', 'Cook\'s Utensils',
                'Smith\'s Tools', 'Vehicles (Land)'],
            weapons: ['Shortsword', 'Simple Weapons']
        };
        this.proficiency = undefined;
        this.skills = {};
        this.speed = {walk: 30};
        this.spellAttack = undefined;
        this.spellDC = undefined;
        this.spellLevel = 1;
        this.spells = ['Light', 'Sacred Flame', 'Minor Illusion',
            'Eldritch Blast', 'Cure Wounds', 'Healing Elixir', 'Hex'];

        this.aggregateValues();
    }

    aggregateValues() {
        this.calculateProficiency();
        this.calculateAbilities();
        this.calculateAC(true);
        this.calculateCasting();
        this.calculateHPHD();
        this.calculateInitiative();
        this.calculateSkills();
        this.calculateUnarmoredMovement();

        this.setExpendables();
        this.setPersona('Papa Kap');

        this.hydrateSpells();
    }

    calculateAbilities() {
        Object.keys(this.abilities).forEach((ability) => {
            const val = this.abilities[ability].val;
            const prof = SAVE[Object.keys(this.level)[0]].includes(ability);
            const mod = Math.floor((val - 10) / 2);

            this.abilities[ability].prof = prof;
            this.abilities[ability].mod = mod;
            this.abilities[ability].save = mod +
                (prof ? this.proficiency : 0);
        });
    }

    calculateAC(useWIS) {
        this.ac = 10 + this.abilities.DEX.mod + (useWIS ? this.abilities.WIS.mod : 0);
    }

    calculateCasting() {
        this.castingMod = this.abilities.CHA.mod;
        this.spellAttack = this.proficiency + this.abilities.CHA.mod;
        this.spellDC = 8 + this.proficiency + this.abilities.CHA.mod;
    }

    calculateHPHD() {
        let hdMap = {};
        Object.keys(this.level).forEach((dndClass, index) => {
            if (index === 0) {
                this.expendables.hp.max = HD[dndClass] + this.abilities.CON.mod;
                this.expendables.hp.max +=
                    ((HD[dndClass] / 2) + 1 + this.abilities.CON.mod)
                    * (this.level[dndClass].level - 1);
            } else {
                this.expendables.hp.max +=
                    ((HD[dndClass] / 2) + 1 + this.abilities.CON.mod)
                    * (this.level[dndClass].level);
            }

            hdMap[HD[dndClass]] = hdMap[HD[dndClass]] || 0;
            hdMap[HD[dndClass]] = hdMap[HD[dndClass]] +
                this.level[dndClass].level;
        });

        Object.keys(hdMap).forEach((hd) => {
            this.expendables.hd.max.push({val: hdMap[hd], type: hd});
            this.expendables.hd.current.push({val: 0, type: hd});
        });
    }

    calculateInitiative() {
        this.initiative = this.abilities.DEX.mod;
    }

    calculateProficiency() {
        let total = 0;

        Object.values(this.level).forEach((l) => {
            total += l.level;
        });

        this.proficiency = Math.ceil(total / 4) + 1;
    }

    calculateSkills() {
        Object.keys(SKILLS).forEach((skill) => {
            const ability = SKILLS[skill].ability;
            const prof = this.proficiencies.skills.includes(skill);

            this.skills[skill] = {
                ability, prof,
                mod: this.abilities[ability].mod +
                    (prof ? this.proficiency : 0)
            }
        });
    }

    calculateUnarmoredMovement() {
        const monkLevels =
            Object.keys(this.level).find((l) => l === 'monk') ?
                this.level.monk.level : 0;

        const unarmoredMovement = monkLevels > 1 ?
            (Math.ceil((monkLevels - 1) / 4) + 1) * 5 : 0;


        Object.keys(this.speed).forEach((s) => {
            this.speed[s] = this.speed[s] + unarmoredMovement;
        });
    }

    hydrateSpells() {
        let fullSpells = [];
        this.spells.forEach((spell) => fullSpells.push(spells.find((s) => s.name === spell)));
        this.spells = fullSpells;
    }

    setExpendables() {
        this.expendables.healing.current = 3;
        this.expendables.hd.current[0].val = 10,
        this.expendables.hp.current = 49;
        this.expendables.hp.temp = 0;
        this.expendables.ki.current = 7;
        this.expendables.spellSlots.current = 1;
        this.expendables.unsettling.current = 1;
        this.expendables.wholeness.current = 1;
    }

    setPersona(persona = 'Xoh') {
        const availablePersonas = Object.keys(personas);
        const defaultPersona = 'Xoh';
        const personaKeys = Object.keys(personas[defaultPersona]);

        this.persona = {
            name: availablePersonas.includes(persona) ? persona : defaultPersona
        };

        personaKeys.forEach((key) => {
            this.persona[key] =
                personas[this.persona.name][key] || personas[defaultPersona][key];
        });
    }
}

const xoh = new Character();

export default xoh;
