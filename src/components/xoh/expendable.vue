<template>
    <div class="expendable-container">
        <div class="expendable-container-lg">
            <div class="expendable-container-md">
                <div class="expendable-container-sm">
                    <div class="max">
                        {{character.expendables[value].max}}
                        <span>max</span>
                    </div>
                </div>
                <div class="current">
                    {{character.expendables[value].current}}
                    <span>remaining</span>
                </div>
            </div>
            <div class="btn-container">
                <div :class="{disabled: character.expendables[value].current === 0}"
                    @click="update(false)">-</div>
                <div :class="{disabled: character.expendables[value].current === character.expendables[value].max}"
                    @click="update(true)">+</div>
            </div>
        </div>
        <div class="expendable-container-top">
            <span class="label-text">{{id}}</span>
            <span v-if="sub" class="label-sub">{{sub}}</span>
        </div>
    </div>
</template>

<script>
import character from '../../models/xoh';

export default {
    name: 'expendable',
    props: {
        id: String,
        sub: String,
        value: String
    },
    data() {
        return {
            character
        };
    },
    methods: {
        update(increment = true) {
            if (increment &&
                this.character.expendables[this.value].current + 1 <=
                this.character.expendables[this.value].max) {
                this.character.expendables[this.value].current++;
            } else if (!increment &&
                this.character.expendables[this.value].current - 1 >= 0) {
                this.character.expendables[this.value].current--;
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/colors';

.expendable-container {
    height: 4rem;
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
</style>
