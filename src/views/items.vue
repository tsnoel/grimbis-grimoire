<template>
    <nav-header page="Magic Item Gashapon"/>
    <div class="items-container">
        <div v-if="!ItemsModel.all.length" class="no-data">
            <span>There's nothing here... yet<br/>Click <i @click="addItem" class="el-icon-circle-plus no-data-icon"></i> to acquire a new magic item</span>
        </div>
        <div v-for="item in ItemsModel.all" :key="item.id">
            <el-card class="item-card">
                <div class="item-content">
                    <div class="item name">
                        <!--span class="label">Name</span-->
                        <el-input class="name-area"
                            placeholder="Name this item..."
                            v-model="item.name">
                        </el-input>
                        <div class="delete-btn"
                            @click="deleteItem(item)">
                            <i class="el-icon-delete-solid"></i>
                        </div>
                    </div>
                    <div class="item desc">
                        <span class="label">Description</span>
                        <span class="body">{{item.description}}</span>
                    </div>
                    <div class="item origin">
                        <div class="sub-item">
                            <span class="label">Origin</span>
                            <span class="body">{{item.origin.name}}</span>
                            <span class="rarity" :class="item.origin.rarity">
                                {{item.origin.rarity}}
                            </span>
                        </div>
                        <div class="sub">{{item.origin.desc}}</div>
                    </div>
                    <div v-if="item.history" class="item hist">
                        <div class="sub-item">
                            <span class="label">History</span>
                            <span class="body">{{item.history.name}}</span>
                        </div>
                        <div class="sub">{{item.history.desc}}</div>
                    </div>
                    <div class="item prop">
                        <!--span class="label">Properties</span-->
                        <el-collapse class="body">
                            <el-collapse-item
                                v-for="(prop, index) in item.property"
                                :key="prop.name + index" :name="prop.name + index">
                                <template #title>
                                    <span class="prop-name">{{prop.name}}</span>
                                    <span class="prop-type"
                                        :class="prop.type">
                                        {{prop.type === 'curse' ? 'bane' : 'boon'}}
                                    </span>
                                    <span class="prop-rarity"
                                        :class="prop.rarity">
                                        {{prop.rarity}}
                                    </span>
                                </template>
                                <span class="prop-desc">{{prop.desc}}</span>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    <div class="item notes">
                        <!--span class="label">Notes</span-->
                        <el-input
                            class="notes-area"
                            type="textarea"
                            :rows="3"
                            placeholder="Additional notes about this item..."
                            v-model="item.notes">
                        </el-input>
                    </div>
                </div>
            </el-card>
        </div>
    </div>

    <div class="btn-group">
        <div class="btn-sub-group">
            <div class="add-btn"
                @click="addItem">
                <i class="el-icon-plus"></i>
            </div>
            <div class="browse-btn"
                @click="construction">
                <i class="el-icon-search"></i>
            </div>
        </div>
        <div class="btn-sub-group">
            <div class="raw-btn"
                @click="generateJSON(); rawFormVisible = true;">{ }</div>
            <div class="upload-btn"
                @click="construction">
                <i class="el-icon-upload2"></i>
            </div>
            <item-settings/>
        </div>
    </div>

    <el-dialog custom-class="json-dialog"
        title="Raw JSON" top="12vh" width="90%"
        v-model="rawFormVisible">
        <el-input
            v-model="rawJson"
            type="textarea"
            resize="none"
            :readonly="true"
            :rows="17">
        </el-input>

        <!-- Footer -->
        <template #footer>
            <span class="dialog-footer">
                <a id="download-items">
                    <el-button type="success"
                        icon="el-icon-download">
                        Download
                    </el-button>
                </a>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import {
    ElButton,
    ElCard,
    ElCollapse,
    ElCollapseItem,
    ElDialog,
    ElInput,
    ElMessage
} from 'element-plus';

import Nav from '../components/Nav';
import settings from '../components/items/settings'

import ItemsModel from '../models/items';

export default {
    name: 'items',
    components: {
        [ElButton.name]: ElButton,
        [ElCard.name]: ElCard,
        [ElCollapse.name]: ElCollapse,
        [ElCollapseItem.name]: ElCollapseItem,
        [ElDialog.name]: ElDialog,
        [ElInput.name]: ElInput,
        [Nav.name]: Nav,
        [settings.name]: settings
    },
    data() {
        return {
            ItemsModel,
            rawFormVisible: false,
            rawJson: ''
        };
    },
    methods: {
        addItem() {
            this.ItemsModel.addItem();
            document.getElementsByClassName('items-container')[0].scroll(0, 0);
        },
        construction() {
            ElMessage({
                message: 'This feature isn\'t ready. Check back later for updates.',
                type: 'warning',
                duration: 5000
            });
        },
        deleteItem(item) {
            this.ItemsModel.deleteItem(item);
        },
        generateJSON() {
            this.rawJson = JSON.stringify(this.ItemsModel.all, null, 4);

            const dataStr = 'data:text/json;charset=utf-8,' +
                encodeURIComponent(this.rawJson);
            const dlAnchorElem = document.getElementById('download-items');

            dlAnchorElem.setAttribute('href', dataStr);
            dlAnchorElem.setAttribute('download', 'items.json');
        }
    }
}
</script>

<style lang="scss">
@import '../styles/colors';

.items-container {
    background-color: color(green, lightest);
    height: calc(100% - 2.5rem);
    overflow-x: hidden;
    overflow-y: scroll;

    .no-data {
        color: color(green, base);
        display: flex;
        flex-direction: column;
        font-size: 1.5rem;
        height: 100%;
        justify-content: space-around;
        margin: 0 1rem;
        text-align: center;

        .no-data-icon {
            color: color(green, dark);
            cursor: pointer;
            font-size: 1.25rem;
        }
    }

    .item-card {
        margin: 0.5rem 5%;

        .item-content {
            .item {
                display: flex;
                flex-direction: row;

                .label {
                    color: color(gray, base);
                    font-size: 0.8rem;
                    font-weight: bold;
                    margin: 0.15rem 0.5rem 0 0;
                }

                .rarity {
                    border-radius: 0.5rem;
                    font-size: 0.6rem;
                    height: 0.8rem;
                    margin: 0.25rem 0 0 0.5rem;
                    padding: 0 0.5rem 0 0.5rem;

                    &.common {
                        background-color: color(orange, dark);
                        color: color(white);
                    }

                    &.uncommon {
                        background-color: color(slate, dark);
                        color: color(white);
                    }

                    &.rare {
                        background-color: color(yellow, dark);
                        color: color(black);
                    }
                }

                &.name {
                    margin-bottom: 1rem;
                }

                &.desc,
                &.origin {
                    margin-bottom: 0.5rem;
                }

                &.desc,
                &.origin,
                &.hist {
                    flex-direction: column;

                    .sub-item {
                        display: flex;
                        flex-direction: row;
                    }

                    .sub {
                        color: color(gray, dark);
                        font-size: 0.8rem;
                    }
                }

                &.prop {
                    flex-direction: column;
                    margin: 1rem 0;

                    .prop-desc {
                        color: color(gray, darker);
                        font-size: 0.75rem;
                    }

                    .prop-type,
                    .prop-rarity {
                        border-radius: 0.5rem;
                        font-size: 0.6rem;
                        height: 0.8rem;
                        line-height: 0.8rem;
                        margin-left: 0.5rem;
                        padding: 0 0.5rem;

                        &.common {
                            background-color: color(orange, dark);
                            color: color(white);
                        }

                        &.uncommon {
                            background-color: color(slate, dark);
                            color: color(white);
                        }

                        &.rare {
                            background-color: color(yellow, dark);
                            color: color(black);
                        }

                        &.curse {
                            background-color: color(red, base);
                            color: color(white);
                        }

                        &.property {
                            background-color: color(blue, base);
                            color: color(white);
                        }
                    }
                }

                .delete-btn {
                    cursor: pointer;
                    position: relative;
                    right: -0.5rem;
                    top: 0.5rem;

                    i {
                        color: color(green, dark);
                        font-size: 1.25rem;
                        text-align: center;
                    }
                }
            }
        }
    }
}

.btn-group {
    bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0.5rem;
    position: absolute;
    width: calc(100% - 1rem);
    z-index: 2;

    .btn-sub-group {
        display: flex;
        flex-direction: row;
    }

    .add-btn,
    .browse-btn,
    .settings-btn,
    .raw-btn,
    .upload-btn {
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
