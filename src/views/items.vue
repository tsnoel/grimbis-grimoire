<template>
    <nav-header page="Magic Item Gashapon"/>
    <div class="items-container">
        <div v-for="item in ItemsModel.all" :key="item.id">
            <el-card class="item-card">
                <div class="delete-btn"
                    @click="deleteItem(item)">
                    <i class="el-icon-error"></i>
                </div>
                <div class="item-content">
                    {{item}}
                </div>
            </el-card>
        </div>
        <el-button class="generate-btn"
            @click="addItem">
            Generate Item
        </el-button>
    </div>
    <div class="btn-group">
        <div class="raw-btn"
            @click="generateJSON(); rawFormVisible = true;">{ }</div>
        <div class="settings-btn"
            @click="settingsFormVisible = true">
            <i class="el-icon-setting"></i>
        </div>
    </div>
    <el-dialog title="Raw JSON" width="90%"
        v-model="rawFormVisible">
        <el-input
            v-model="rawJson"
            type="textarea"
            :rows="15">
        </el-input>
    </el-dialog>
    <el-dialog title="Settings" width="90%"
        v-model="settingsFormVisible">
        <el-form :model="settingsForm">
            <el-form-item label="Test">
                <el-input
                    v-model="settingsForm.input"
                    autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item label="Test2">
                <el-select
                    v-model="settingsForm.select"
                    placeholder="Please select a zone">
                    <el-option
                        label="Zone No.2"
                        value="beijing">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary"
                    @click="setSettings">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import {
    ElButton,
    ElCard,
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElOption,
    ElSelect
} from 'element-plus';

import Nav from '../components/Nav';

import ItemsModel from '../models/items.js';

export default {
    name: 'items',
    components: {
        [ElButton.name]: ElButton,
        [ElCard.name]: ElCard,
        [ElDialog.name]: ElDialog,
        [ElForm.name]: ElForm,
        [ElFormItem.name]: ElFormItem,
        [ElInput.name]: ElInput,
        [ElOption.name]: ElOption,
        [ElSelect.name]: ElSelect,
        [Nav.name]: Nav
    },
    data() {
        return {
            ItemsModel,
            rawFormVisible: false,
            rawJson: '',
            settingsForm: {
                input: '',
                select: ''
            },
            settingsFormVisible: false
        };
    },
    beforeMount() {
    },
    methods: {
        addItem() {
            this.ItemsModel.addItem();
        },
        deleteItem(item) {
            this.ItemsModel.deleteItem(item);
        },
        generateJSON() {
            this.rawJson = JSON.stringify(this.ItemsModel.all, null, 4);
        },
        setSettings() {
            console.log('setSettings', this.settingsForm);
            this.settingsFormVisible = false;
        }
    }
}
</script>

<style lang="scss">
@import '../styles/colors';

.items-container {
    background-color: color(green, lightest);
    height: calc(100% - 2.5rem);
    overflow: scroll;

    .item-card {
        margin: 0.5rem 5%;

        .item-content {
            position: relative;
            top: -2rem;
        }

        .delete-btn {
            background-color: color(green, dark);
            border-radius: 1rem;
            cursor: pointer;
            height: 1.5rem;
            position: relative;
            left: calc(100% - 1rem);
            top: -0.5rem;
            width: 1.5rem;
            z-index: 1;

            i {
                color: color(white);
                font-size: 1.25rem;
                padding: 0.15rem;
                text-align: center;
            }
        }
    }

    .generate-btn {
        margin: 0.5rem 5%;
        width: 90%;
    }
}

.btn-group {
    bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 0.5rem;
    z-index: 2;

    .settings-btn,
    .raw-btn {
        background-color: color(green, darker);
        border-radius: 1.25rem;
        color: color(white);
        cursor: pointer;
        font-size: 1.5rem;
        height: 2.5rem;
        margin: 0.5rem;
        text-align: center;
        width: 2.5rem;

        i {
            height: 1.25rem;
            margin: 0.5rem 0 0 -0.25rem;
            width: 1.25rem;
        }
    }

    .raw-btn {
        height: 2.3rem;
        padding-top: 0.2rem;
    }
}
</style>
