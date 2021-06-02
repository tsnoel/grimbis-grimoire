<template>
    <div class="spell-container" :class="selectedClass">
        <div class="spell-header">
            <div class="name">{{data.name}}</div>
            <div class="level">
                {{data.level}} {{data.school}}
            </div>
        </div> 
        <div class="spell-body-footer">
            <div class="spell-body">
                <div class="spell-meta"
                    v-for="m in meta"
                    :key="m.key">
                    <span>{{m.label}}</span>
                    <span>{{data[m.key]}}</span>
                </div>
                <div class="desc">
                    {{data.desc}}
                    <span v-if="data.higher_level">
                        <br/><br/>
                        <b>At higher levels</b>
                        <br/>
                        {{data.higher_level}}
                    </span>
                </div>
            </div>
            <div class="spell-footer">
                <span class="dndclass">{{selectedClass}}</span>
                <span class="source">{{data.page}}</span>
            </div>
        </div>
    </div>
</template>

<script>
// This could be cool
// https://www.npmjs.com/package/markdown-it-vue

export default {
    name: 'spell-info',
    props: {
        data: Object,
        selectedClass: String
    },
    data() {
        return {
            meta: [
                {key: 'casting_time', label: 'Casting Time'},
                {key: 'range', label: 'Range'},
                {key: 'duration', label: 'Duration'},
                {key: 'components', label: 'Components'}
            ]
        };
    }
}
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';

.spell-container {
    height: 100%;
    position: relative;
    top: -1.5rem;

    > * {
        border-color: $other;
        background-color: rgba($other, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($other, 0.5);
        }
    }

    &.Artificer > * {
        border-color: $artificer;
        background-color: rgba($artificer, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($artificer, 0.3);
        }
    }
    &.Bard > * {
        border-color: $bard;
        background-color: rgba($bard, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($bard, 0.3);
        }
    }
    &.Cleric > * {
        border-color: $cleric;
        background-color: rgba($cleric, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($cleric, 0.3);
        }
    }
    &.Druid > * {
        border-color: $druid;
        background-color: rgba($druid, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($druid, 0.3);
        }
    }
    &.Paladin > * {
        border-color: $paladin;
        background-color: rgba($paladin, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($paladin, 0.3);
        }
    }
    &.Ranger > * {
        border-color: $ranger;
        background-color: rgba($ranger, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($ranger, 0.3);
        }
    }
    &.Sorcerer > * {
        border-color: $sorcerer;
        background-color: rgba($sorcerer, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($sorcerer, 0.3);
        }
    }
    &.Warlock > * {
        border-color: $warlock;
        background-color: rgba($warlock, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($warlock, 0.3);
        }
    }
    &.Wizard > * {
        border-color: $wizard;
        background-color: rgba($wizard, 0.05);

        .name,
        .spell-meta,
        .spell-footer {
            background-color: rgba($wizard, 0.3);
        }
    }

    .spell-body-footer, .spell-header {
        border-width: 2px;
        border-radius: 0.45rem;
        border-style: solid;
    }

    .spell-header {
        border-bottom: 0;
        height: 2.5rem;

        .name {
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
