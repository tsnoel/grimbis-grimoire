<template>
    <el-card class="column-card">
        <div class="skill-row" :class="{prof: value.prof}"
            v-for="(value, skill) in character.skills" :key="skill">
            <span>
                <span class="skill-ability">{{value.ability}}</span>
                <span class="skill-name">{{skill}}</span>
            </span>
            <span class="skill-mod">
                {{value.mod > 0 ? '+' : ''}}{{value.mod}}
            </span>
        </div>
    </el-card>
</template>

<script>
import { ElCard } from 'element-plus';
import character from '../../models/xoh';

export default {
    name: 'skills',
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
@import '../../styles/colors';

.column-card ::v-deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    height: calc(100% - 1rem);
    justify-content: space-between;
    padding: 0.5rem;
}

.skill-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.05rem 0.5rem;

    .skill-name {
        font-weight: bold;
    }

    .skill-ability {
        font-size: 0.8rem;
        font-weight: bold;
        margin-right: 0.25rem;
        color: color(gray, base);
    }

    .skill-mod {
        margin-right: 0.25rem;
    }

    &.prof {
        background-color: color(gray, dark);
        border-radius: 0.5rem;
        color: color(white);

        .skill-ability {
            color: color(gray, light);
        }
    }
}
</style>
