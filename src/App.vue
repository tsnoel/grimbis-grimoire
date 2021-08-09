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

.bio-description {
    line-height: 1rem;
    width: 8rem;
}

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
