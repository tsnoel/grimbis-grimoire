const data = require('./spells_merged.json');
const res = [];

const template = {
    id: '',
    name: '',
    desc: '',
    higher_level: '',
    page: '',
    range: '',
    components: '',
    material: '',
    ritual: false,
    duration: '',
    concentration: false,
    casting_time: '',
    level: '',
    level_int: -1,
    school: '',
    class: [],
    archetype: [],
    circles: [],
    oaths: [],
    domains: [],
    patrons: []
};

const lvlMap = {
    0: 'Cantrip',
    1: '1st-level',
    2: '2nd-level',
    3: '3rd-level',
    4: '4th-level',
    5: '5th-level',
    6: '6th-level',
    7: '7th-level',
    8: '8th-level',
    9: '9th-level'
};

data.forEach((s, i) => {
    res.push({
        id: i,
        name: s.name,
        desc: s.desc,
        higher_level: s.higher_level ? s.higher_level : undefined,
        page: s.page.toLowerCase(),
        range: s.range.toLowerCase(),
        components: s.components.toUpperCase(),
        material: s.material,
        ritual: typeof s.ritual === 'string' ? s.ritual.toLowerCase() === 'yes' : s.ritual,
        duration: s.duration.toLowerCase(),
        concentration: typeof s.concentration === 'string' ? s.concentration.toLowerCase() === 'yes' : s.concentration,
        casting_time: s.casting_time.toLowerCase(),
        level: lvlMap[s.level_int],
        level_int: s.level_int,
        school: s.school[0].toUpperCase() + s.school.slice(1),
        class: typeof s.class === 'string' ? s.class.split(', ') : s.class,
        archetype: s.archetype ? s.archetype.split('<br/> ') : undefined,
        circles: s.circles ? s.circles.split(', ') : undefined,
        oaths: s.oaths ? s.oaths.split(', ') : undefined,
        domains: s.domains ? s.domains.split(', ') : undefined,
        patrons: s.patrons ? s.patrons.split(', ') : undefined
    });

    // Sniff out missing template items
    /*Object.keys(s).forEach((k) => {
        if (!Object.keys(template).find((t) => t === k)) {
            console.log(k);
        }
    });*/

    // Sniff out miss-matched spell levels
    /*if(s.level !== lvlMap[s.level_int]){
        console.log(s.level, s.level_int);
    }*/
});

console.log(JSON.stringify(res, null, 4));
