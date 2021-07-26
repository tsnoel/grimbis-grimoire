<template>
    <el-card class="column-card">
        <div class="bio-header">
            <div class="bio-name">
                {{character.persona.name}}
                <span class="bio-title">
                    {{character.persona.title}}
                </span>
            </div>
            <div class="bio-level">
                <div class="bio-level-sub" :key="dndClass"
                v-for="dndClass in Object.keys(character.level)">
                    <div class="dnd-class">{{dndClass}}</div>
                    <div class="dnd-level">{{character.level[dndClass].level}}</div>
                </div>
            </div>
            <div class="bio-desc">{{character.persona.description}}</div>
        </div>

        <div class="bio-line" v-for="(bioLine, index) in bioLines" :key="index">
            <div class="bio-block" v-for="bioBlock in bioLine" :key="bioBlock.label">
                <el-tooltip v-if="bioBlock.desc" :content="bioBlock.desc"
                    placement="left" effect="light" :popper-class="'bio-description'">
                    <div>
                        <div class="bio-block-label">{{bioBlock.label}}</div>
                        <div class="bio-block-value">{{bioBlock.value}}</div>
                    </div>
                </el-tooltip>
                <div v-else>
                    <div class="bio-block-label">{{bioBlock.label}}</div>
                    <div class="bio-block-value">{{bioBlock.value}}</div>
                </div>
            </div>
        </div>

        <div v-for="personality in bioPersonality"
            class="bio-personality-line" :key="personality.label">
            <div class="bio-personality-label">{{personality.label}}</div>
            <div class="bio-personality-value">{{personality.value}}</div>
        </div>
    </el-card>
</template>

<script>
import { ElCard, ElTooltip } from 'element-plus';
import character from '../../models/xoh';

export default {
    name: 'biography',
    components: {
        [ElCard.name]: ElCard,
        [ElTooltip.name]: ElTooltip
    },
    data() {
        return {
            bioLines: [
                [
                    {label: 'race', value: character.persona.race},
                    {label: 'gender', value: character.persona.gender},
                    {label: 'age', value: character.persona.age}
                ],
                [
                    {label: 'size', value: character.persona.size},
                    {label: 'height', value: character.persona.height},
                    {label: 'weight', value: character.persona.weight}
                ],
                [
                    {label: 'eyes', value: character.persona.eyes},
                    {label: 'hair', value: character.persona.hair},
                    {label: 'skin', value: character.persona.skin}
                ],
                [
                    {label: 'alignment', value: character.persona.alignment},
                    {label: 'faith', value: character.persona.faith},
                    {label: 'background', value: character.background.name,
                        desc: character.background.description}
                ],
            ],
            bioPersonality: [
                {label: 'trait', value: character.persona.traits},
                {label: 'ideal', value: character.persona.ideals},
                {label: 'bond', value: character.persona.bonds},
                {label: 'flaw', value: character.persona.flaws}
            ],
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

.bio-header {
    height: 5.25rem;
    width: 100%;

    .bio-name {
        background-color: color(gray, dark);
        border-radius: 0 0.5rem 0 0;
        color: color(white);
        font-size: 1.5rem;
        height: 2rem;
        padding-left: 0.5rem;

        .bio-title {
            font-size: 0.7rem;
            margin-left: 0.25rem;
        }
    }

    .bio-level {
        background-color: color(gray, base);
        color: color(black);
        display: flex;
        flex-direction: row;
        font-size: 0.7rem;
        height: 1rem;
        padding-left: 0.5rem;

        .bio-level-sub {
            display: flex;
            flex-direction: row;
            height: 0.8rem;
            margin-top: 0.1rem;
            padding: 0 0.5rem;

            &:first-child {
                border-right:1px solid color(gray, dark);
                padding-left: 0;
            }

            .dnd-class {
                text-transform: capitalize;
                margin-right: 0.5rem;
                margin-top: -0.05rem;
            }

            .dnd-sub {
                font-weight: 100;
                width: 8rem;
            }

            .dnd-level {
                font-weight: bold;
                margin-top: -0.05rem;
            }
        }
    }

    .bio-desc {
        background-color: color(gray, light);
        border-radius: 0 0 0 0.5rem;
        color: color(black);
        display: flex;
        flex-direction: column;
        font-size: 0.75rem;
        height: 2.25rem;
        justify-content: space-around;
        line-height: 0.8rem;
        text-align: center;
        padding: 0 0.5rem;
    }
}

.bio-line {
    display: flex;
    flex-direction: row;
    height: 2rem;
    justify-content: space-between;
    width: 100%;

    .bio-block {
        display: flex;
        flex-direction: column;
        height: 2rem;
        text-align: center;
        text-transform: capitalize;
        width: 30%;

        .bio-block-label {
            background-color: color(gray, dark);
            border-radius: 0 0.5rem 0 0;
            color: color(white);
            font-size: 0.6rem;
            height: 0.75rem;
            width: 100%;
        }

        .bio-block-value {
            background-color: color(gray, light);
            border-radius: 0 0 0 0.5rem;
            color: color(black);
            font-size: 0.8rem;
            height: 1.25rem;
            width: 100%;
        }
    }
}

.bio-personality-line {
    width: calc(100% - 1rem);

    .bio-personality-label {
        background-color: color(gray, dark);
        border-radius: 0 0.5rem 0 0;
        color: color(white);
        font-size: 0.6rem;
        height: 0.75rem;
        padding: 0 0.5rem;
        text-transform: capitalize;
        width: 100%;
    }

    .bio-personality-value {
        background-color: color(gray, light);
        border-radius: 0 0 0 0.5rem;
        color: color(black);
        display: flex;
        flex-direction: column;
        font-size: 0.7rem;
        height: 2rem;
        justify-content: space-around;
        padding: 0 0.5rem;
        width: 100%;
    }
}
</style>
