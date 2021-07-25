<template>
    <div>
        <el-divider content-position="left"
            class="divider" @click="collapsed = !collapsed">
            Abilities</el-divider>
        <el-card v-show="!collapsed" class="column-card">
            <div class="ability-row" :class="ability"
                v-for="(value, ability) in character.abilities" :key="ability">
                <div class="ability-label">
                    <span class="short">{{ability}}</span>
                    <span class="long">{{value.label}}</span>
                </div>
                <div class="ability-val">
                    <span class="val">{{value.val}}</span>
                    <span class="mod">{{value.mod > 0 ? '+' : ''}}{{value.mod}}</span>
                </div>
                <div class="ability-save" :class="{prof: value.prof}">
                    <span class="prof-label">{{value.prof ? 'Proficient' : ''}} Save</span>
                    <span class="save">
                        {{value.save > 0 ? '+' : ''}}{{value.save}}
                    </span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { ElCard, ElDivider } from 'element-plus';
import character from '../../models/xoh';

export default {
    name: 'abilities',
    components: {
        [ElCard.name]: ElCard,
        [ElDivider.name]: ElDivider
    },
    data() {
        return {
            character,
            collapsed: false
        };
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/colors';

.divider ::v-deep(.el-divider__text) {
    background-color: color(slate, 50);
    font-size: 1rem;
    font-weight: bold;
}

.column-card ::v-deep(.el-card__body) {
    padding: 1rem 0.5rem;
}

.ability-row {
    background-color: color(gray, lightest);
    // border: 1px solid color(gray, base);
    border-radius: 0.75rem;
    display: flex;
    flex-direction: row;
    height: 4.25rem;
    margin: 0.25rem 0;

    .ability-label,
    .ability-val,
    .ability-save {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .ability-label,
    .ability-save {
        border-radius: 0.6rem;
        width: 33%;
    }

    .ability-label {
        background-color: color(gray, dark);
        // border-right: 1px solid color(gray, base);
        color: color(gray, lighter);
        font-weight: bold;

        .long {
            color: color(gray, light);
            font-size: 0.65rem;
        }

        .short {
            font-size: 1.5rem;
        }
    }

    .ability-save {
        background-color: color(gray, light);
        //border-left: 1px solid color(gray, base);
        font-weight: bold;

        .prof-label {
            color: color(gray, dark);
            font-size: 0.75rem;
        }

        &.prof {
            background-color: color(gray, dark);
            color: color(gray, lighter);

            .prof-label {
                color: color(gray, light);
            }
        }

        .save {
            font-size: 1.5rem;
        }
    }

    .ability-val {
        font-weight: bold;
        width: 34%;

        .mod {
            color: color(gray, dark);
            font-size: 1rem;
        }

        .val {
            font-size: 1.5rem;
        }
    }
}
</style>
