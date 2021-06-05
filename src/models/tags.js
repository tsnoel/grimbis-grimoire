class Tags {

    constructor() {
        this.all = [
            { id: 0, label: 'Default', color: '#E2E4E1' },
            { id: 1, label: 'Artificer', color: '#635331' },
            { id: 2, label: 'Bard', color: '#AB7DAB' },
            { id: 3, label: 'Cleric', color: '#8B8C8E' },
            { id: 4, label: 'Druid', color: '#79853D' },
            { id: 5, label: 'Paladin', color: '#AF9643' },
            { id: 6, label: 'Ranger', color: '#49775A' },
            { id: 7, label: 'Sorcerer', color: '#C25359' },
            { id: 8, label: 'Warlock', color: '#7944AE' },
            { id: 9, label: 'Wizard', color: '#265CB6' }
        ];

        this.indexCount = 10;
    }

    fetch(id) {
        return this.all.find((a) => a.id === id);
    }

    add(label, color) {
        this.all.push({
            id: this.indexCount,
            label: label,
            color: color
        });

        this.indexCount++;
    }

    edit(id, label, color) {
        let index = this.all.findIndex((a) => a.id === id);
        this.all[index] = { id: id, label: label, color: color };
    }


    remove(id) {
        this.all = this.all.filter((a) => a.id !== id);
    }
}

const tags = new Tags();

export default tags;
