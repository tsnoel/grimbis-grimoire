<template>
    <el-row :gutter="20" class="character">
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
            <el-card class="meta">
                {{meta}}
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="8" :md="6" :xl="4">
        </el-col>
    </el-row>
</template>

<script>
import { ElCol, ElRow, ElCard } from 'element-plus';

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
            meta: {
                name: 'Papa Kap',
                background: {
                    name: ' Folk Hero',
                    description: 'You come from a humble social rank, ' +
                        'but you are destined for so much more. ' +
                        'Already the people of your home village ' +
                        'regard you as their champion, and your ' +
                        'destiny calls you to stand against the ' +
                        'tyrants and monsters that threaten the ' +
                        'common folk everywhere.',
                    skills: 'Animal Handling, Survival',
                    tools: 'One type of artisan’s tools, ' +
                        'vehicles (land)',
                    equipment: 'A set of artisan’s tools (one of ' +
                        'your choice), a shovel, an iron pot, a set ' +
                        'of common clothes, and a pouch containing ' +
                        '10 gp',
                    feature: 'Rustic Hospitality'
                },
                player: 'Tim',
                race: 'Dwarf',
                alignment: 'Neutral Good',
                exp: 'Milestone'
            },
            level: {
                'Monk': {level: 8, sub: 'Way of the Open Hand', color: COLORS.Monk},
                'Warlock': {level: 2, sub: undefined, color: COLORS.Warlock}
            },
            // inspiration: false,
            // defenses: '',
            // conditions: '',
            // senses: {},
            personas: {
                'Dok': {
                    title: 'The people\'s Bugbear',
                    description: 'A bugbear with decidedly ' +
                        'un-bugbear goals: to be good, to have ' +
                        'integrity, to be balanced, to improve ' +
                        'other\'s conditions. The most likely to ' +
                        'start a union.'
                },
                'Papa Kap': {
                    title: 'The Dwarven Chef',
                    description: 'A grandfatherly dwarf man. ' +
                        'Proficient with cook\'s tools. Shared ' +
                        'among the monastery changelings to help ' +
                        'with food preparation duties.'
                },
                'Xoh': {
                    title: 'The Neurotic Changeling',
                    description: 'A young woman who uses alternate ' +
                        'personas to make up for her perceived ' +
                        'shortcomings.',
                    alignment: 'Neutral Good',
                    gender: 'F',
                    eyes: 'White',
                    size: 'Medium',
                    height: '5\'7"',
                    faith: '--',
                    hair: 'White',
                    skin: 'Pale',
                    age: '18',
                    weight: '123lb.',
                    traits: 'I judge people by their actions, ' +
                        'not their words.',
                    ideals: 'Fairness. No one should get ' +
                        'preferential treatment before the law, ' +
                        'and no one is above the law. (Lawful)',
                    bonds: 'I protect those who cannot protect ' +
                        'themselves.',
                    flaws: 'I\'m convinced of the significance of ' +
                        'my destiny, and blind to my shortcomings ' +
                        'and the risk of failure.'
                },
                '"Xed" (Kevin)': {
                    title: 'The Angsty Drow',
                    description: 'A teenage boy. Lover of dark ' +
                        'clothes, fantasy emo, and trying to look cool.'
                },
                'Gob': {
                    title: 'The Investigative Hobgoblin',
                    description: 'Much shorter than his counterparts,' +
                        ' this hobgoblin is much more interested in ' +
                        'deduction than violence.'
                },
                'Wrett': {
                    title: 'The Beefy Lizardman',
                    description: 'A mute, muscled, anthropomorphic ' +
                        'bearded dragon. Used for pranks, tricks, ' +
                        'and intimidation.'
                },
                'Zazz': {
                    title: 'The Human Monk',
                    description: 'A modest young man with shaved ' +
                        'head. Athletic build. Loves Horses. ' +
                        'Loves light magic.'
                }
            },
            proficiency: 4,
            ac: 0,
            hd: [],
            initative: 0,
            hp: {
                // current: '',
                // temp: '',
                max: 0
            },
            abilities: {
                'STR': {val: 7, prof: true},
                'DEX': {val: 20, prof: true},
                'CON': {val: 14, prof: false},
                'INT': {val: 8, prof: false},
                'WIS': {val: 14, prof: false},
                'CHA': {val: 14, prof: false}
            },
            skills: {},
            skillProfs: ['Acrobatics', 'Animal Handling', 'Athletics',
                'Insight', 'Persuasion', 'Survival'],
            speed: {'Walking': '45\''},
            proficiencies: {
                armor: 'Light Armor',
                weapons: 'Shortsword, Simple Weapons',
                tools: 'Carpenter\'s Tools, Cook\'s Utensils, ' +
                    'Smith\'s Tools, Vehicles (Land)',
                languages: 'Common, Dwarvish, Undercommon'
            },
            features: {
                'Rustic Hospitality': {
                    source: {type: 'Background', value: 'Folk Hero'},
                    description: 'Since you come from the ranks of the common ' +
                        'folk, you fit in among them with ease. You can find a place to ' +
                        'hide, rest, or recuperate among other commoners, unless you have ' +
                        'shown yourself to be a danger to them. They will shield you from ' +
                        'the law or anyone else searching for you, though they will not risk ' +
                        'their lives for you.'
                },
                'Unarmed Defense': {
                    source: {type: 'Class', value: 'Monk', level: 1},
                    description: 'Beginning at 1st level, while you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.'
                },
                'Martial Arts': {
                    source: {type: 'Class', value: 'Monk', level: 1},
                    description:' At 1st level, your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons, which are shortswords and any simple melee weapons that don’t have the two-handed or heavy property. \n\nYou gain the following benefits while you are unarmed or wielding only monk weapons and you aren’t wearing armor or wielding a shield: \n\n- You can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes and monk weapons.\n- You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels: 1d4 (1-4), 1d6 (5-10), 1d8 (11-16), and 1d10 (17-20).\n- When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven’t already taken a bonus action this turn.'
                },
                "Ki": {
                    "source": {"type": "Class", "value": "Monk", "level": 2},
                    "description": ""
                },
                "Unarmored Movement": {
                    "source": {"type": "Class", "value": "Monk", "level": 2},
                    "description": "Starting at 2nd level, your speed increases by 10' while you are not wearing armor or wielding a shield. This bonus increases when you reach certain monk levels: +10' (2-5), +15' (6-9), +20' (10-13), +25' (14-17), +30' (18-20)."
                },
                'Open Hand Technique': {
                    source: {type: 'Class', value: 'Monk', sub: 'Way of the Open Hand', level: 3},
                    description: 'Starting when you choose this tradition at 3rd level, you can manipulate your enemy’s ki when you harness your own. Whenever you hit a creature with one of the attacks granted by your Flurry of Blows, you can impose one of the following effects on that target:\n\n- It must succeed on a Dexterity saving throw or be knocked prone.\n- It must make a Strength saving throw. If it fails, you can push it up to 15 feet away from you.\n- It can’t take reactions until the end of your next turn.'
                },
                'Deflect Missiles': {
                    source: {type: 'Class', value: 'Monk', level: 3},
                    description: 'Starting at 3rd level, you can use your reaction to deflect or catch the missile when you are hit by a ranged weapon attack. When you do so, the damage you take from the attack is reduced by 1d10 + your Dexterity modifier + your monk level.\n\nIf you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in one hand and you have at least one hand free. If you catch a missile in this way, you can spend 1 ki point to make a ranged attack with the weapon or piece of ammunition you just caught, as part of the same reaction. You make this attack with proficiency, regardless of your weapon proficiencies, and the missile counts as a monk weapon for the attack, which has a normal range of 20 feet and a long range of 60 feet.'
                },
                'Ability Score Improvement': {
                    source: {type: 'Class', value: 'Monk', level: 4},
                    description: 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature.\n\nUsing the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.',
                    value: '4: DEX, DEX | 8: DEX, DEX'
                },
                'Slow Fall': {
                    source: {type: 'Class', value: 'Monk', level: 4},
                    description: 'Beginning at 4th level, you can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level.'
                },
                'Extra Attack': {
                    source: {type: 'Class', value: 'Monk', level: 5},
                    description: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.'
                },
                'Stunning Strike': {
                    source: {type: 'Class', value: 'Monk', level: 5},
                    description: 'Starting at 5th level, you can interfere with the flow of ki in an opponent’s body. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike. The target must succeed on a Constitution saving throw or be stunned until the end of your next turn.'
                },
                'Ki-Empowered Strikes': {
                    source: {type: 'Class', value: 'Monk', level: 6},
                    description: 'Starting at 6th level, your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.'
                },
                'Wholeness of Body': {
                    source: {type: 'Class', value: 'Monk', sub: 'Way of the Open Hand', level: 6},
                    description: 'At 6th level, you gain the ability to heal yourself. As an action, you can regain hit points equal to three times your monk level. You must finish a long rest before you can use this feature again.'
                },
                "Evasion": {
                    "source": {"type": "Class", "value": "Monk", "level": 7},
                    "description": "At 7th level, your instinctive agility lets you dodge out of the way of certain area effects, such as a blue dragon’s lightning breath or a fireball spell. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail."
                },
                "Stillness of Mind": {
                    "source": {"type": "Class", "value": "Monk", "level": 7},
                    "description": "Starting at 7th level, you can use your action to end one effect on yourself that is causing you to be charmed or frightened."
                }
            }
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

        console.log(this);
    }
}
</script>

<style scoped lang="scss">
</style>
