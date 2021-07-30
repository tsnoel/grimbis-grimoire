<template>
    <div class="divider-container" :class="{'small-divider': size === 'small'}">
        <div class="left-line"></div>
        <div class="label" v-if="label">{{label}}</div>
        <div class="right-line"></div>
        <div v-if="size !== 'small'">
            <i v-if="collapsed" class="el-icon-arrow-up collapsed-arrow"></i>
            <i v-else class="el-icon-arrow-down collapsed-arrow"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'divider',
    props: {
        collapsed: Boolean,
        label: String,
        size: String
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
        margin: 0.25rem 0 0 0.25rem;
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

    &.small-divider {
        height: 1rem;
        margin: 0 30%;
        width: 40%;

        .left-line,
        .right-line {
            border-bottom: 1px solid color(gray, light);
            height: 0.4rem;
            margin: 0;
        }

        .left-line {
            flex-grow: 2;
        }

        .label {
            color: color(gray, dark);
            font-size: 0.7rem;
            font-weight: bold;
        }
    }
}
</style>
