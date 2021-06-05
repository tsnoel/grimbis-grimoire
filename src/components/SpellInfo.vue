<template>
    <div class="spell-container"
        v-if="data.tag.label"
        :style="{'--color': hexToRgb(data.tag.color)}">
        <div class="spell-header">
            <div class="name">{{data.spell.name}}</div>
            <div class="level">
                {{data.spell.level}} {{data.spell.school}}
            </div>
        </div> 
        <div class="spell-body-footer">
            <div class="spell-body">
                <div class="spell-meta"
                    v-for="m in meta"
                    :key="m.key">
                    <span>{{m.label}}</span>
                    <span>{{data.spell[m.key]}}</span>
                </div>
                <div class="desc">
                    {{data.spell.desc}}
                    <span v-if="data.spell.higher_level">
                        <br/><br/>
                        <b>At higher levels</b>
                        <br/>
                        {{data.spell.higher_level}}
                    </span>
                </div>
            </div>
            <div class="spell-footer">
                <span class="dndclass">{{data.tag.label}}</span>
                <span class="source">{{data.spell.page}}</span>
            </div>
        </div>
    </div>
</template>

<script>
// This could be cool
// https://www.npmjs.com/package/markdown-it-vue

import cardsModel from '../models/cards';

export default {
    name: 'spell-info',
    props: {
        id: Number
    },
    data() {
        return {
            data: {},
            meta: [
                {key: 'casting_time', label: 'Casting Time'},
                {key: 'range', label: 'Range'},
                {key: 'duration', label: 'Duration'},
                {key: 'components', label: 'Components'}
            ]
        };
    },
    beforeMount() {
        this.data = cardsModel.fetch(this.id);
    },
    methods: {
        hexToRgb(hex) {
            let result =
                /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ?
                `${parseInt(result[1], 16)}, ` +
                `${parseInt(result[2], 16)}, ` +
                `${parseInt(result[3], 16)}` : '0, 0, 0';
        },
        hasLightText(hex) {
            return !!hex;
        }
    }
}
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';

.spell-container {
    height: 100%;
    position: relative;
    top: -1.5rem;

    .spell-body-footer, .spell-header {
        background-color: rgba(var(--color), 0.05);
        border-color: rgb(var(--color));
        border-width: 2px;
        border-radius: 0.45rem;
        border-style: solid;
    }

    .spell-header {
        border-bottom: 0;
        height: 2.5rem;

        .name {
            background-color: rgba(var(--color), 0.5);
            text-align: center;
            border-radius:0.25rem;
            font-size: 1rem;
            font-weight: 600;
        }

        .level {
            text-align: center;
            font-style: italic;
            font-size:0.9rem;
        }
    }

    .spell-body-footer {
        border-top: 0;
        height: calc(100% - 2.5rem);
        margin-top: -0.2rem;

        .spell-body {
            height: calc(100% - 0.9rem);

            .spell-meta {
                background-color: rgba(var(--color), 0.5);
                border-radius:0.3rem;
                margin:0.2rem 0.2rem 0;
                display: flex;
                flex-direction: row;
                font-size:0.75rem;

                >span:first-child {
                    width:40%;
                    text-align: center;
                    color: $secondary-text;
                }
            }

            .desc {
                white-space: pre-line;
                padding: 0.5rem 1rem;
                font-size: 0.75rem;
                height: calc(100% - 5.5rem);
                overflow-y: scroll;
            }
        }

        .spell-footer {
            background-color: rgba(var(--color), 0.5);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-radius: 0.45rem;
            font-size: 0.75rem;
            padding: 0 1rem;
            position: absolute;
            bottom: -0.2rem;
            width: calc(100% - 2.2rem);
        }

    }

}
</style>
