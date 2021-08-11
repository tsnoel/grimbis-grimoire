<template>
    <div class="route-container">
        <router-view />
    </div>
</template>

<script>
import './styles/element-variables.scss';

export default {
    name: 'App',
    data() {
        return {};
    }
}
</script>

<style lang="scss">
@import './styles/colors';

html,
body,
#app,
.route-container,
.container {
    height: 100%;
}

html {
    background-color: color(slate, 50);
    font-family: 'Source Sans Pro', sans-serif;
}

body {
    margin: 0;
}

// ==== Items Page ====
.json-dialog,
.settings-dialog {
    height: 30.5rem;

    .el-dialog__body {
        height: 23rem;
        padding: 0 1.25rem !important;
    }
}

.item-settings-tabs {
    .el-tabs__item {
        &:hover {
            color: color(green, base) !important;
        }
    }

    .el-tabs__active-bar {
        background-color: color(green, base) !important;
    }

    .is-active {
        color: color(green, base) !important;
    }
}

// ==== Character Sheet ====
.bio-description {
    line-height: 1rem;
    width: 8rem;
}

// ==== Spell Cards ====
.new-card {
    background-color: color(white);
    border: 0.2rem dashed color(gray, light);
    border-radius: 1rem;
    color: color(gray, light);
    cursor: pointer;
    font-size: 10rem;
    height: 10rem;
    margin: 1.5rem;
    padding: 4.5rem 2.5rem 6.5rem 2.5rem;
    width: 10rem;
}

.spell-option {
    .spell-option-name {

    }
    .spell-option-level {
        float: right;
        color: color(gray, base);
    }

    .tag-option-preview {
        height: 40%;
        line-height: 1;
        margin-top: 3%;
        float: right;
        font-size: 0.8rem;
        padding: 0.25rem;
        border-radius: 0.25rem;
    }
}

</style>
