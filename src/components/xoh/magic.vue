<template>
    <div>
        <el-divider content-position="left"
            class="divider">Magic & Spirit</el-divider>
        <el-card class="column-card">
            <div class="spirit-container"
                v-for="(widget, index) in widgets"
                :key="widget.id + widget.value.current">
                <div class="expendable-container">
                    <div class="expendable-container-lg">
                        <div class="expendable-container-md">
                            <div class="expendable-container-sm">
                                <div class="max">
                                    {{widget.value.max}}
                                    <span>max</span>
                                </div>
                            </div>
                            <div class="current">
                                {{widget.value.current}}
                                <span>remaining</span>
                            </div>
                        </div>
                        <div class="btn-container">
                            <div :class="{disabled: widget.value.current === 0}"
                                @click="update(widget.value, false)">-</div>
                            <div :class="{disabled: widget.value.current === widget.value.max}"
                                @click="update(widget.value, true)">+</div>
                        </div>
                    </div>
                    <div class="expendable-container-top">
                        <span class="label-text">{{widget.id}}</span>
                        <span v-if="widget.sub" class="label-sub">{{widget.sub}}</span>
                    </div>
                </div>
                <div class="divider-sm" v-if="index !== 1"></div>
            </div>
            <div class="spirit-info">
                These refresh after a <b>short rest</b>.
            </div>
        </el-card>
    </div>
</template>

<script>
import {
    ElCard,
    ElDivider,
    ElInputNumber
} from 'element-plus';

import character from '../../models/xoh';

export default {
    name: 'magic',
    components: {
        [ElCard.name]: ElCard,
        [ElDivider.name]: ElDivider,
        [ElInputNumber.name]: ElInputNumber
    },
    data() {
        return {
            character,
            widgets: [
                {id: 'Spell Slots', sub: `level ${character.spellLevel}`,
                    value: character.expendables.spellSlots},
                {id: 'Ki', value: character.expendables.ki},
                {id: 'Unsettling Visage',
                    value: character.expendables.unsettling}
            ]
        };
    },
    methods: {
        update(widgetValue, increment = true) {
            widgetValue.current = widgetValue.current + (increment ? 1 : -1);
            widgetValue.current = widgetValue.current < 0 ? 0 : widgetValue.current;
            widgetValue.current = widgetValue.current > widgetValue.max ?
                widgetValue.max : widgetValue.current;
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/colors';

.divider ::v-deep(.el-divider__text) {
    background-color: #FBFBFB;
    font-size: 1rem;
    font-weight: bold;
}

.column-card ::v-deep(.el-card__body) {
    padding: 1rem 0.5rem;
}

.spirit-container {
    width: 100%;

    .divider-sm {
        border-bottom: 1px solid color(gray, light);
        margin: 1.5rem 35%;
        width: 30%;
    }

    .expendable-container {
        height: 4rem;
        margin: 0.5rem 0;
        width: 100%;

        .expendable-container-lg {
            background-color: color(gray, light);
            border-radius: 0.5rem;
            display: flex;
            flex-direction: row;
            height: 4rem;
            width: 100%;

            .current,
            .max {
                font-size: 1.75rem;
                position: relative;
                text-align: center;

                >span {
                    font-size: 0.75rem;
                    margin-left: -0.15rem;
                    text-transform: lowercase;
                }
            }

            .btn-container {
                display: flex;
                flex-direction: row;
                height: 2.25rem;
                position: relative;
                top: 1.75rem;
                width: 20%;

                div {
                    background-color: color(gray, dark);
                    border-radius: 1rem;
                    cursor: pointer;
                    color: color(white);
                    font-size: 1.35rem;
                    margin: 0.25rem;
                    text-align: center;
                    width: 50%;

                    &.disabled {
                        background-color: color(gray, base);
                        color: color(gray, light);
                        cursor: not-allowed;
                    }
                }

                div:first-child {
                    font-size: 1.25rem;
                }
            }

            .expendable-container-md {
                background-color: color(gray, base);
                border-radius: 0.5rem;
                width: 80%;

                .current {
                    margin-left: 50%;
                    top: -2.25rem;
                }

                .expendable-container-sm {
                    background-color: color(gray, dark);
                    border-radius: 0.5rem;
                    height: 100%;
                    width: 50%;

                    .max {
                        color: color(white);
                        top: 1.75rem;
                    }
                }
            }
        }

        .expendable-container-top {
            background-color: color(gray, darker);
            border-radius: 0.5rem;
            height: 1.75rem;
            left: 0;
            position: relative;
            text-align: center;
            top: -4rem;
            width: 100%;

            .label-sub {
                color: color(gray, light);
                font-size: 0.75rem;
                margin-left: 0.25rem;
            }

            .label-text {
                color: color(white);
                font-size: 1.25rem;
            }
        }
    }
}

.spirit-info {
    color: color(gray, dark);
    font-size: 0.75rem;
    text-align: center;
    width: 100%;
}
</style>
