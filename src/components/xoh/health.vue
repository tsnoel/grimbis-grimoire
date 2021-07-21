<template>
    <div>
        <el-divider content-position="left"
            class="divider">Health</el-divider>
        <el-card class="column-card two-third-card">
            max hp, current hp, temp hp, max hit dice, current hit dice, healing light, wholeness of body
        </el-card>
        <el-divider content-position="left"
            class="divider">Defense & Movement</el-divider>
        <el-card class="column-card third-card">
            init, speed, ac
        </el-card>
    </div>
</template>

<script>
import { ElCard, ElDivider } from 'element-plus';

export default {
    name: 'health',
    components: {
        [ElCard.name]: ElCard,
        [ElDivider.name]: ElDivider
    },
    props: {
        hp: Object,
        speed: Object,
        ac: Number,
        hd: Object,
        initative: Number,
        wholeness: Object,
        healing: Object
    },
    data() {
        return {};
    }
}
</script>

<style scoped lang="scss">
.divider ::v-deep(.el-divider__text) {
    background-color: #FBFBFB;
    font-size: 1rem;
    font-weight: bold;
}

.column-card ::v-deep(.el-card__body) {
    padding: 1rem 0.5rem;
}
</style>
