const data = require('/Users/timnoel/home-server/grimbis-grimoire/src/assets/items/wip/bb2.json');

// console.log(JSON.stringify(data.sort((d, e) => d.rating - e.rating), null, 4));

console.log(`Total: ${data.length}`);
console.log(`Unsorted: ${data.filter((d) => d.rating === 0).length}`);
console.log(`Boon 1: ${data.filter((d) => d.rating === 1).length}`);
console.log(`Boon 2: ${data.filter((d) => d.rating === 2).length}`);
console.log(`Boon 3: ${data.filter((d) => d.rating === 3).length}`);
console.log(`Bane 1: ${data.filter((d) => d.rating === -1).length}`);
console.log(`Bane 2: ${data.filter((d) => d.rating === -2).length}`);
console.log(`Bane 3: ${data.filter((d) => d.rating === -3).length}`);
