<template>
    <div class="divider-container">
        <div class="left-line"></div>
        <div class="label">{{label}}</div>
        <div class="right-line"></div>
        <i v-if="collapsed" class="el-icon-arrow-up collapsed-arrow"></i>
        <i v-else class="el-icon-arrow-down collapsed-arrow"></i>
    </div>
</template>

<script>
export default {
    name: 'divider',
    props: {
        label: String,
        collapsed: Boolean
    },
    data() {
        return {};
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/colors';

.divider-container {
    display: flex;
    flex-direction: row;
    height: 2rem;
    margin-right: 1rem;
    width: calc(100% - 1rem);

    .collapsed-arrow {
        margin: 0.25rem 0 0 0.25rem;;
        height: 1rem;
    }

    .label {
        flex-grow: 1;
        font-weight: bold;
        text-align: center;
    }

    .left-line,
    .right-line {
        border-bottom: 1px solid color(gray, base);
        height: 0.75rem;
        margin: 0 0.25rem;
    }

    .left-line {
        flex-grow: 1;
    }

    .right-line {
        flex-grow: 2;
    }
}
</style>
