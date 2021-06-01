const data = require('./spells.json');
const xData = require('./xanthar_converted.json');
let res = [...data, ...xData];

res.sort((a, b) => (a.name > b.name) ? 1 : -1);

console.log(JSON.stringify(res, null, 4));
