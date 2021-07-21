<template>
    <div>
        <el-divider content-position="left"
            class="divider">Skills</el-divider>
        <el-card class="column-card">
            <div class="skill-row" :class="{prof: value.prof}"
                v-for="(value, skill) in skills" :key="skill">
                <span>
                    <span class="skill-ability">{{value.ability}}</span>
                    <span class="skill-name">{{skill}}</span>
                </span>
                <span class="skill-mod">
                    {{value.mod > 0 ? '+' : ''}}{{value.mod}}
                </span>
            </div>
        </el-card>
    </div>
</template>

<script>
import { ElCard, ElDivider } from 'element-plus';

export default {
    name: 'skills',
    components: {
        [ElCard.name]: ElCard,
        [ElDivider.name]: ElDivider
    },
    props: {
        skills: Object
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

.skill-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.2rem 0;
    padding: 0.05rem 0.5rem;

    .skill-name {
        font-weight: bold;
    }

    .skill-ability {
        font-size: 0.8rem;
        font-weight: bold;
        margin-right: 0.25rem;
        color: darkgray;
    }

    .skill-mod {
        margin-right: 0.25rem;
    }

    &.prof {
        background-color: gray;
        border-radius: 0.5rem;
        color: white;

        .skill-ability {
            color: lightgray;
        }
    }
}
</style>
