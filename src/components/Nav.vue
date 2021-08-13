<template>
    <div class="nav-header">
        <span class="logo-container">
            <div class="icon-container">
                <div class="icon-square">
                    <grimbi-icon class="logo-icon"/>
                </div>
            </div>
            <span class="logo-text">Grimbi's Grimoire</span>
            <span class="page-text">{{page}}</span>
        </span>
    </div>
</template>

<script>
import GrimbiIcon from '../assets/grimbi';

export default {
    name: 'nav-header',
    components: {
        'grimbi-icon': GrimbiIcon
    },
    props: {
        page: String
    }
}
</script>

<style scoped lang="scss">
@import '../styles/colors';

.nav-header {
    background-color: color(green, light);
    display: flex;
    flex-direction: row;
    height: 2.5rem;

    .logo-container {
        color: color(white);
        display: flex;
        flex-direction: row;

        .icon-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0.25rem -0.5rem 0.25rem 1rem;
            width: 2.75rem;

            .icon-square {
                background-color: color(green, darker);
                height: 1.5rem;
                width: 1.5rem;
            }

            .logo-icon {
                fill: color(white);
                height: 2rem;
                margin: -0.1rem 0 0 -0.25rem;
                width: 2rem;
            }
        }

        .logo-text {
            font-size: 1.25rem;
            margin: 0.4rem 0;
        }

        .page-text {
            border-left: 2px solid color(green);
            font-size: 0.8rem;
            margin: 0.7rem 0.5rem;
            padding: 0 0.5rem;
        }
    }
}
</style>
