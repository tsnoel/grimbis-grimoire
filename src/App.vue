<template>
    <div>
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
html,
body,
#app,
.container {
    height: 100%;
}

html {
    background-color: #fbfbfb;
    font-family: 'Source Sans Pro', sans-serif;
}

body {
    margin: 0;
}

.new-card {
    background-color: white;
    border: 0.2rem dashed lightgray;
    border-radius: 1rem;
    color: lightgray;
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
        color: #AAAAAA;
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
