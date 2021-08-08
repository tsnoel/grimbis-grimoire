const itemtype = require('./itemtype.json');
const moretrinkets = require('./moretrinkets.json');
const trinkets = require('./trinkets.json');

const creator = require('./creator.json');
const history = require('./history.json');
const origin = require('./origin.json');

const quirk = require('./quirk.json');

const minorprop = require('./minorprop.json');
const majorprop = require('./majorprop.json');
const property = require('./property.json');
const specialprop = require('./specialprop.json');

let res = {};

res.name = '';
// 60% mundane, 40% trinket
res.description = Math.floor(Math.random() * 10) > 5 ?
    trinkets[Math.floor(Math.random() * trinkets.length)] :
    itemtype[Math.floor(Math.random() * itemtype.length)];

// 15% above, 85% moretrinket
res.description = Math.floor(Math.random() * 20) > 2 ?
    moretrinkets[Math.floor(Math.random() * moretrinkets.length)] :
    res.description;

// 60% creator, 40% origin
res.origin = Math.floor(Math.random() * 10) > 5 ?
    creator[Math.floor(Math.random() * creator.length)] :
    origin[Math.floor(Math.random() * origin.length)];

// 10% history, 90% nothing
res.history = Math.floor(Math.random() * 10) > 0 ? '' :
    history[Math.floor(Math.random() * history.length)];

// 20% quirk, 80% nothing
res.quirk = Math.floor(Math.random() * 10) > 1 ? '' :
    quirk[Math.floor(Math.random() * quirk.length)];

// 70% minorprop, 30% nothing
res.minorprop = Math.floor(Math.random() * 10) > 6 ? '' :
    minorprop[Math.floor(Math.random() * minorprop.length)];

// 5% majorprop, 95% nothing
res.majorprop = Math.floor(Math.random() * 20) > 0 ? '' :
    majorprop[Math.floor(Math.random() * majorprop.length)];

// 40% property, 60% nothing
res.property = Math.floor(Math.random() * 10) > 3 ? '' :
    property[Math.floor(Math.random() * property.length)];

// 20% property, 60% nothing
res.specialprop = Math.floor(Math.random() * 10) > 1 ? '' :
    specialprop[Math.floor(Math.random() * specialprop.length)];

res.notes = '';

console.log(JSON.stringify(res, null, 4));
