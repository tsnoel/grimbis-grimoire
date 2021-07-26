<template>
    <el-card class="column-card">
        init, speed, ac, max hp, current hp, temp hp, max hit dice, current hit dice, healing light, wholeness of body
    </el-card>
</template>

<script>
import { ElCard } from 'element-plus';
import character from '../../models/xoh';

export default {
    name: 'health',
    components: {
        [ElCard.name]: ElCard
    },
    data() {
        return {
            character
        };
    }
}
</script>

<style scoped lang="scss">
.column-card ::v-deep(.el-card__body) {
    padding: 0.5rem;
}
</style>
