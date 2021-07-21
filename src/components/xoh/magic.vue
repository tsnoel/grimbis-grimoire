<template>
    <div>
        <el-divider content-position="left"
            class="divider">Spirit</el-divider>
        <el-card class="column-card third-card">
            <!-- ki max and current, uv max and current -->
            <div class="spirit-container">
                <div class="ki-container">
                    <span class="label"><span class="label-text">Ki</span>
                        <span class="max">{{ki.max}}<span>max</span></span>
                    </span>
                    <el-input-number
                        class="current-input"
                        v-model="current.ki"
                        controls-position="right"
                        size="small"
                        :min="0" :max="ki.max">
                    </el-input-number>
                </div>
                <div class="uv-container">
                    <span class="label"><span class="label-text">Unsettling<br>Visage</span>
                        <span class="max">{{uv.max}}<span>max</span></span>
                    </span>
                    <el-input-number
                        class="current-input"
                        v-model="current.uv"
                        controls-position="right"
                        size="small"
                        :min="0" :max="uv.max">
                    </el-input-number>
                </div>
                <div class="spirit-info">
                    These refresh after a <b>short rest</b>.
                </div>
            </div>
        </el-card>


        <el-divider content-position="left"
            class="divider">Magic</el-divider>
        <el-card class="column-card two-third-card">
            max spellslot, current spellslot, Spell dc/attack/abilitymod
        </el-card>
    </div>
</template>

<script>
import {
    ElCard,
    ElDivider,
    ElInputNumber
} from 'element-plus';

export default {
    name: 'magic',
    components: {
        [ElCard.name]: ElCard,
        [ElDivider.name]: ElDivider,
        [ElInputNumber.name]: ElInputNumber
    },
    props: {
        ki: Object,
        spellMeta: Object,
        spellSlots: Object,
        uv: Object
    },
    data() {
        return {
            current: {}
        };
    },
    beforeMount() {
        this.current.ki = this.ki.current;
        this.current.uv = this.uv.current;
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

.spirit-container {
    display: flex;
    flex-direction: column;
    height: 6.2rem;
    justify-content: space-between;
    width: 100%;

    .ki-container,
    .uv-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .label {
            background-color: lightgray;
            border-radius: 0.5rem;
            display: flex;
            flex-direction: row;
            font-size: 1.5rem;
            text-align: center;
            width: 61%;

            .label-text {
                background-color: gray;
                border-radius: 0.5rem;
                color: white;
                width: 60%;
            }

            .max {
                width: 40%;

                >span {
                    font-size: 0.75rem;
                    margin-left: 0.25rem;
                }
            }
        }

        .current-input {
            margin-left: 5%;
            width: 34%;
        }
    }

    .uv-container {
        .label {
            .label-text {
                font-size: 0.75rem;
                white-space: normal;
            }
        }
    }

    .spirit-info {
        color: darkgray;
        font-size: 0.75rem;
        text-align: center;
        width: 100%;
    }
}
</style>
