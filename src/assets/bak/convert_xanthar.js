const data = require('./xanthar_spells.json');
let res = [];

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

data.forEach((d) => {
    res.push({
        name: d.Name,
        desc: d.Description,
        higher_level: '',
        page: 'XGtE',
        range: d.Range.toLowerCase(),
        components: d.Components.split(' (')[0].toUpperCase(),
        material: d.Components.split(' (').length > 1 ? d.Components.split(' (')[1].slice(0, -1) : '',
        ritual: !!d.Ritual,
        duration: d.Duration.split(', ').length > 1 ? d.Duration.split(', ')[1] : d.Duration.toLowerCase(),
        concentration: d.Duration.includes('Concentration'),
        casting_time: d.CastingTime.toLowerCase(),
        level: lvlMap[d.Level],
        level_int: d.Level,
        school: d.School[0].toUpperCase() + d.School.slice(1),
        class: d.Classes.join(', '),
        archetype: '',
        circles: '',
        oaths: '',
        domains: '',
        patrons: ''
    });

    //console.log(Object.keys(d).length !== 14 ? d.Name : '');
});

console.log(JSON.stringify(res, null, 4));
