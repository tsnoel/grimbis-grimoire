<template>
    <el-card class="column-card">
        <div>{{character.expendables.hp}}</div>
        <div>{{character.expendables.hd}}</div>

        <div>{{character.initiative}}</div>
        <div>{{character.speed}}</div>

        <div>{{character.ac}}</div>

        <div class="spirit-container"
            v-for="widget in widgets"
            :key="widget.id + widget.value.current">
            <expendable
                :id="widget.id" :sub="widget.sub"
                :value="widget.value">
            </expendable>
        </div>

        <div class="spirit-info">
            These refresh after a <b>long rest</b>.
        </div>
    </el-card>
</template>

<script>
import { ElCard } from 'element-plus';
import character from '../../models/xoh';
import Expendable from './expendable';

export default {
    name: 'health',
    components: {
        [ElCard.name]: ElCard,
        [Expendable.name]: Expendable
    },
    data() {
        return {
            character,
            widgets: [
                {id: 'Healing Light', value: 'healing',
                    sub: `+1d6 hp`},
                {id: 'Wholeness of Body', value: 'wholeness',
                    sub: `+${character.level.monk.level * 3} hp`}
            ]
        };
    }
}
</script>

<style scoped lang="scss">
.column-card ::v-deep(.el-card__body) {
    padding: 0.5rem;
}

.spirit-info {
    color: color(gray, dark);
    font-size: 0.75rem;
    text-align: center;
    width: 100%;
}
</style>
