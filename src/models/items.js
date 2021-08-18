const trinkets = require('../assets/items/trinkets.json');
const history = require('../assets/items/history.json');

const originC = require('../assets/items/origin/common.json');
const originU = require('../assets/items/origin/uncommon.json');
const originR = require('../assets/items/origin/rare.json');

const propertyC = require('../assets/items/property/common.json');
const propertyU = require('../assets/items/property/uncommon.json');
const propertyR = require('../assets/items/property/rare.json');

const curseC = require('../assets/items/curse/common.json');
const curseU = require('../assets/items/curse/uncommon.json');
const curseR = require('../assets/items/curse/rare.json');

class Item {

    constructor(item) {
        // Elite ID Generating Haxx
        this.id = item.id || Math.floor(Math.random() * 100000000);
        this.name = item.name || '';
        this.description = item.description || '';
        this.origin = item.origin || {name: 'None', desc: ''};
        this.history = item.history || '';
        this.property = item.property || [{name: 'None', desc: '', rarity: '', type: ''}];
        this.notes = item.notes || '';
    }

}

class Items {

    constructor() {
        this.all = [];
        this.odds = {};
        this.quantities = {
            description: trinkets.length,
            originC: originC.length,
            originU: originU.length,
            originR: originR.length,
            history: history.length,
            propertyC: propertyC.length,
            propertyU: propertyU.length,
            propertyR: propertyR.length,
            curseC: curseC.length,
            curseU: curseU.length,
            curseR: curseR.length
        };

        this.resetOdds();
    }

    resetOdds() {
        this.odds = {
            origin: {
                common: 72,
                uncommon: 25,
                rare: 3
            },
            history: {
                none: 90,
                history: 10
            },
            property: {
                common: 72,
                uncommon: 25,
                rare: 3,
                // quantity
                none: 30,
                single: 59,
                binary: 10,
                triple: 1
            },
            curse: {
                common: 72,
                uncommon: 25,
                rare: 3,
                // quantity
                none: 50,
                single: 39,
                binary: 10,
                triple: 1
            }
        };
    }

    genDescription() {
        return trinkets[Math.floor(Math.random() * trinkets.length)];
    }

    genOrigin() {
        const oddsTotal = this.odds.origin.common +
            this.odds.origin.uncommon +
            this.odds.origin.rare;

        const d100 = Math.floor(Math.random() * oddsTotal);

        if (d100 < this.odds.origin.common) {
            return {...originC[Math.floor(Math.random() * originC.length)], rarity: 'common'};
        } else if (d100 < this.odds.origin.common +
            this.odds.origin.uncommon) {
            return {...originU[Math.floor(Math.random() * originU.length)], rarity: 'uncommon'};
        } else {
            return {...originR[Math.floor(Math.random() * originR.length)], rarity: 'rare'};
        }
    }

    genHistory() {
        const oddsTotal = this.odds.history.none +
            this.odds.history.history;

        const d100 = Math.floor(Math.random() * oddsTotal);

        if (d100 < this.odds.history.none) {
            return '';
        } else {
            return history[Math.floor(Math.random() * history.length)];
        }
    }

    genProperty() {
        const quantityTotal = this.odds.property.none +
            this.odds.property.single +
            this.odds.property.binary +
            this.odds.property.triple;

        const oddsTotal = this.odds.property.common +
            this.odds.property.uncommon +
            this.odds.property.rare;

        const q100 = Math.floor(Math.random() * quantityTotal);

        let iterations;
        let res = [];

        if (q100 < this.odds.property.none) {
            iterations = 0;
        } else if (q100 < this.odds.property.none +
            this.odds.property.single) {
            iterations = 1;
        } else if (q100 < this.odds.property.none +
            this.odds.property.single +
            this.odds.property.binary) {
            iterations = 2;
        } else {
            iterations = 3;
        }

        for(let i = 0; i < iterations; i++) {
            const d100 = Math.floor(Math.random() * oddsTotal);

            if (d100 < this.odds.property.common) {
                res.push({
                    ...propertyC[Math.floor(Math.random() * propertyC.length)],
                    rarity: 'common', type: 'property'
                });
            } else if (d100 < this.odds.property.common +
                this.odds.property.uncommon) {
                res.push({
                    ...propertyU[Math.floor(Math.random() * propertyU.length)],
                    rarity: 'uncommon', type: 'property'
                });
            } else {
                res.push({
                    ...propertyR[Math.floor(Math.random() * propertyR.length)],
                    rarity: 'rare', type: 'property'
                });
            }
        }

        return res;
    }

    genCurse() {
        const quantityTotal = this.odds.curse.none +
            this.odds.curse.single +
            this.odds.curse.binary +
            this.odds.curse.triple;

        const oddsTotal = this.odds.curse.common +
            this.odds.curse.uncommon +
            this.odds.curse.rare;

        const q100 = Math.floor(Math.random() * quantityTotal);

        let iterations;
        let res = [];

        if (q100 < this.odds.curse.none) {
            iterations = 0;
        } else if (q100 < this.odds.curse.none +
            this.odds.curse.single) {
            iterations = 1;
        } else if (q100 < this.odds.curse.none +
            this.odds.curse.single +
            this.odds.curse.binary) {
            iterations = 2;
        } else {
            iterations = 3;
        }

        for(let i = 0; i < iterations; i++) {
            const d100 = Math.floor(Math.random() * oddsTotal);

            if (d100 < this.odds.curse.common) {
                res.push({
                    ...curseC[Math.floor(Math.random() * curseC.length)],
                    rarity: 'common', type: 'curse'
                });
            } else if (d100 < this.odds.curse.common +
                this.odds.curse.uncommon) {
                res.push({
                    ...curseU[Math.floor(Math.random() * curseU.length)],
                    rarity: 'uncommon', type: 'curse'
                });
            } else {
                res.push({
                    ...curseR[Math.floor(Math.random() * curseR.length)],
                    rarity: 'rare', type: 'curse'
                });
            }
        }

        return res;
    }

    loadItems(data) {
        data.forEach((d) => {
            this.all.push(new Item(d));
        });
    }

    addItem() {
        const newItem = new Item({
            description: this.genDescription(),
            origin: this.genOrigin(),
            history: this.genHistory(),
            property: [...this.genProperty(), ...this.genCurse()]
        });

        this.all.unshift(newItem);
    }

    deleteItem(item) {
        const found = this.all.findIndex(e => e.id === item.id);

        if (found >= 0) {
            this.all.splice(found, 1);
        } else {
            throw new Error('Whoops!');
        }
    }

}

const items = new Items();

export default items;
