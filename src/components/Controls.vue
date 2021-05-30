<template>
    <div class="controls-container">
        <el-button class="save"
            @click="save"
            type="primary"
            :disabled="data.length === 0">
            <i class="el-icon-download"></i>
        </el-button>
        <el-button class="load"
            @click="load"
            type="primary"
            :disabled="data.length === 0">
            <i class="el-icon-upload2"></i>
        </el-button>
    </div>
</template>

<script>
import { ElButton } from 'element-plus';

export default {
    name: 'controls',
    props: {
        data: Object
    },
    components: {
        [ElButton.name]: ElButton
    },
    data() {
        return {
        };
    },
    methods: {
        save() {
            console.log('SAVE!');
        },
        load() {
            console.log('LOAD!');
        }
    }
}
</script>

<style scoped>
.controls-container {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
}

.save,
.load {
    border-radius: 3rem;
}

i {
    font-size: 1.5rem;
    color: lightgray;
    margin: 0.25rem;
}
</style>
