const data = require('./w.json');
let res = {};
let res2 = [];

data.forEach((d) => {
    let parts = d.wondrous.name_disp.toLowerCase().split(' ');

    parts.forEach((part) => {
        res[part] = res[part] ? res[part] + 1 : 1;
    });
});

Object.keys(res).forEach((d) => {
    res2.push([d, res[d]]);
});

res2 = res2.sort((a, b) => b[1] - a[1]).map((r) => r[0]);

console.log(JSON.stringify(res2, null, 4));
