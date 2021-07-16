<template>
    <div class="container">
        <spell-cards></spell-cards>
    </div>
</template>

<script>
import SpellCards from '../components/SpellCards.vue';

export default {
    name: 'spells',
    components: {
        [SpellCards.name]: SpellCards
    },
    data() {
        return {};
    }
}
</script>

<style scoped lang="scss">
</style>
