import spells from '../assets/spells.json';
import tagsModel from './tags';

class Cards {

    constructor() {
        this.all = [];

        this.indexCount = 0;
    }

    load(data) {
        this.all = data ? JSON.parse(data) : [];
        this.indexCount = this.all.length ? this.all[this.all.length - 1].id + 1 : 0;
    }

    fetch(id) {
        return this.all.find((a) => a.id === id);
    }

    add(tag, spell) {
        this.all.push({
            id: this.indexCount,
            tagId: tag,
            tag: tagsModel.fetch(tag),
            spellId: spell,
            spell: spells.find((s) => s.id === spell)
        });

        this.indexCount++;
    }

    edit(id, tag, spell) {
        let index = this.all.findIndex((a) => a.id === id);
        this.all[index] = {
            id: id,
            tagId: tag,
            tag: tagsModel.fetch(tag),
            spellId: spell,
            spell: spells.find((s) => s.id === spell)
        };
    }

    remove(id) {
        this.all = this.all.filter((a) => a.id !== id);
    }
}

const cards = new Cards();

export default cards;
