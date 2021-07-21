<template>
    <div>
        <el-divider content-position="left"
            class="divider">Abilities</el-divider>
        <el-card class="column-card">
            <div class="ability-row" v-for="(value, ability) in abilities" :key="ability">
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

export default {
    name: 'abilities',
    components: {
        [ElCard.name]: ElCard,
        [ElDivider.name]: ElDivider
    },
    props: {
        abilities: String
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

.ability-row {
    border: 1px solid darkgray;
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
        background-color: gray;
        border-right: 1px solid darkgray;
        color: white;
        font-weight: bold;

        .long {
            color: lightgray;
            font-size: 0.65rem;
        }

        .short {
            font-size: 1.5rem;
        }
    }

    .ability-save {
        border-left: 1px solid darkgray;
        font-weight: bold;

        .prof-label {
            color: gray;
            font-size: 0.75rem;
        }

        &.prof {
            background-color: gray;
            color: white;

            .prof-label {
                color: lightgray;
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
            color: gray;
            font-size: 1rem;
        }

        .val {
            font-size: 1.5rem;
        }
    }
}
</style>
