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
        this.id = Math.floor(Math.random() * 100000000);
        this.name = '';
        this.description = item.description || '';
        this.origin = item.origin || '';
        this.history = item.history || '';
        this.property = item.property || [];
        this.curse = item.curse || [];
        this.notes = '';
    }

}

class Items {

    constructor() {
        this.all = [];
        this.odds = {
            origin: {
                common: 60,
                uncommon: 30,
                rare: 10
            },
            history: {
                none: 60,
                history: 40
            },
            property: {
                common: 60,
                uncommon: 30,
                rare: 10,
                // quantity
                none: 0,
                single: 70,
                binary: 25,
                triple: 5
            },
            curse: {
                common: 60,
                uncommon: 30,
                rare: 10,
                // quantity
                none: 20,
                single: 60,
                binary: 15,
                triple: 5
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
        } else if (d100 < this.odds.origin.common + this.odds.origin.uncommon) {
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
        } else if (q100 < this.odds.property.single) {
            iterations = 1;
        } else if (q100 < this.odds.property.binary) {
            iterations = 2;
        } else {
            iterations = 3;
        }

        for(let i = 0; i < iterations; i++) {
            const d100 = Math.floor(Math.random() * oddsTotal);

            if (d100 < this.odds.property.common) {
                res.push({...propertyC[Math.floor(Math.random() * propertyC.length)], rarity: 'common'});
            } else if (d100 < this.odds.property.uncommon) {
                res.push({...propertyU[Math.floor(Math.random() * propertyU.length)], rarity: 'uncommon'});
            } else {
                res.push({...propertyR[Math.floor(Math.random() * propertyR.length)], rarity: 'rare'});
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
        } else if (q100 < this.odds.curse.single) {
            iterations = 1;
        } else if (q100 < this.odds.curse.binary) {
            iterations = 2;
        } else {
            iterations = 3;
        }

        for(let i = 0; i < iterations; i++) {
            const d100 = Math.floor(Math.random() * oddsTotal);

            if (d100 < this.odds.curse.common) {
                res.push({...curseC[Math.floor(Math.random() * curseC.length)], rarity: 'common'});
            } else if (d100 < this.odds.curse.uncommon) {
                res.push({...curseU[Math.floor(Math.random() * curseU.length)], rarity: 'uncommon'});
            } else {
                res.push({...curseR[Math.floor(Math.random() * curseR.length)], rarity: 'rare'});
            }
        }

        return res;
    }

    addItem() {
        const newItem = new Item({
            description: this.genDescription(),
            origin: this.genOrigin(),
            history: this.genHistory(),
            curse: this.genCurse(),
            property: this.genProperty()
        });

        this.all.push(newItem);
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
