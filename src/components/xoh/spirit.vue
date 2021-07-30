<template>
    <el-card class="column-card">
        <div class="spirit-container"
            v-for="widget in widgets"
            :key="widget.id + widget.value.current">
            <expendable
                :id="widget.id" :sub="widget.sub"
                :value="widget.value">
            </expendable>
        </div>
        <div class="spirit-info">
            These refresh after a <b>short rest</b>.
        </div>
    </el-card>
</template>

<script>
import {
    ElCard
} from 'element-plus';

import Expendable from './expendable';
import character from '../../models/xoh';

export default {
    name: 'spirit',
    components: {
        [ElCard.name]: ElCard,
        [Expendable.name]: Expendable
    },
    data() {
        return {
            character,
            widgets: [
                {id: 'Ki', value: 'ki'},
                {id: 'Spell Slots', value: 'spellSlots',
                    sub: `level ${character.spellLevel}`},
                {id: 'Unsettling Visage', value: 'unsettling'}
            ]
        };
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/colors';

.column-card ::v-deep(.el-card__body) {
    padding: 0.5rem;
}

.spirit-container {
    width: 100%;

    .divider-sm {
        border-bottom: 1px solid color(gray, light);
        margin: 1.5rem 35%;
        width: 30%;
    }
}

.spirit-info {
    color: color(gray, dark);
    font-size: 0.75rem;
    text-align: center;
    width: 100%;
}
</style>
