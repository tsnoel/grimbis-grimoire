<template>
    <nav-header page="Magic Item Gashapon"/>
    <div class="items-container">
        <div v-if="!ItemsModel.all.length" class="no-data">
            <span>There's nothing here... yet<br/>Click <i @click="addItem" class="el-icon-plus no-data-icon"></i> to add a new magic item!</span>
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
                            <i class="el-icon-error"></i>
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
        <!--el-button class="generate-btn"
            @click="addItem">
            Generate Item
        </el-button-->
    </div>

    <div class="btn-group">
        <div class="add-btn"
            @click="addItem">
            <i class="el-icon-plus"></i>
        </div>
        <div class="btn-sub-group">
            <div class="raw-btn"
                @click="generateJSON(); rawFormVisible = true;">{ }</div>
            <div class="settings-btn"
                @click="settingsFormVisible = true">
                <i class="el-icon-setting"></i>
            </div>
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

    <!-- Settings Dialog -->
    <el-dialog custom-class="settings-dialog"
        title="Probability Settings" width="90%"
        :fullscreen="true"
        v-model="settingsFormVisible">
        <div class="settings-header">Origin</div>
        <div class="settings-section">
            <div class="settings-input">
                <span class="settings-input-label">
                    Common <span>{{ItemsModel.quantities.originC}} total</span>
                </span>
                <el-input-number v-model="ItemsModel.odds.origin.common"
                    controls-position="right" size="mini">
                </el-input-number>
            </div>
            <div class="settings-input">
                <span class="settings-input-label">
                    Uncommon <span>{{ItemsModel.quantities.originU}} total</span>
                </span>
                <el-input-number v-model="ItemsModel.odds.origin.uncommon"
                    controls-position="right" size="mini">
                </el-input-number>
            </div>
            <div class="settings-input">
                <span class="settings-input-label">
                    Rare <span>{{ItemsModel.quantities.originR}} total</span>
                </span>
                <el-input-number v-model="ItemsModel.odds.origin.rare"
                    controls-position="right" size="mini">
                </el-input-number>
            </div>
        </div>
        <div class="settings-header">History</div>
        <div class="settings-section">
            <div class="settings-input">
                <span class="settings-input-label">
                    Doesn't have a history
                </span>
                <el-input-number v-model="ItemsModel.odds.history.none"
                    controls-position="right" size="mini">
                </el-input-number>
            </div>
            <div class="settings-input">
                <span class="settings-input-label">
                    Has a history
                </span>
                <el-input-number v-model="ItemsModel.odds.history.history"
                    controls-position="right" size="mini">
                </el-input-number>
            </div>
        </div>
        <div class="settings-header">Boons</div>
        <div class="settings-section">
            <div class="settings-input">
                <span class="settings-input-label">
                    Common <span>{{ItemsModel.quantities.propertyC}} total</span>
                </span>
                <el-input-number v-model="ItemsModel.odds.property.common"
                    controls-position="right" size="mini">
                </el-input-number>
            </div>
            <div class="settings-input">
                <span class="settings-input-label">
                    Uncommon <span>{{ItemsModel.quantities.propertyU}} total</span>
                </span>
                <el-input-number v-model="ItemsModel.odds.property.uncommon"
                    controls-position="right" size="mini">
                </el-input-number>
            </div>
            <div class="settings-input">
                <span class="settings-input-label">
                    Rare <span>{{ItemsModel.quantities.propertyR}} total</span>
                </span>
                <el-input-number v-model="ItemsModel.odds.property.rare"
                    controls-position="right" size="mini">
                </el-input-number>
            </div>
        </div>
        <div class="settings-header">Banes</div>
        <div class="settings-section">
            <div class="settings-input">
                <span class="settings-input-label">
                    Common <span>{{ItemsModel.quantities.curseC}} total</span>
                </span>
                <el-input-number v-model="ItemsModel.odds.curse.common"
                    controls-position="right" size="mini">
                </el-input-number>
            </div>
            <div class="settings-input">
                <span class="settings-input-label">
                    Uncommon <span>{{ItemsModel.quantities.curseU}} total</span>
                </span>
                <el-input-number v-model="ItemsModel.odds.curse.uncommon"
                    controls-position="right" size="mini">
                </el-input-number>
            </div>
            <div class="settings-input">
                <span class="settings-input-label">
                    Rare <span>{{ItemsModel.quantities.curseR}} total</span>
                </span>
                <el-input-number v-model="ItemsModel.odds.curse.rare"
                    controls-position="right" size="mini">
                </el-input-number>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary"
                    @click="resetOdds">
                    Reset
                </el-button>
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
    ElInputNumber,
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
        [ElCollapse.name]: ElCollapse,
        [ElCollapseItem.name]: ElCollapseItem,
        [ElDialog.name]: ElDialog,
        [ElInput.name]: ElInput,
        [ElInputNumber.name]: ElInputNumber,
        [ElOption.name]: ElOption,
        [ElSelect.name]: ElSelect,
        [Nav.name]: Nav
    },
    data() {
        return {
            ItemsModel,
            rawFormVisible: false,
            rawJson: '',
            settingsFormVisible: false
        };
    },
    beforeMount() {
    },
    methods: {
        addItem() {
            this.ItemsModel.addItem();
            document.getElementsByClassName('items-container')[0].scroll(0, 0);
        },
        deleteItem(item) {
            this.ItemsModel.deleteItem(item);
        },
        generateJSON() {
            this.rawJson = JSON.stringify(this.ItemsModel.all, null, 4);
        },
        resetOdds() {
            this.ItemsModel.resetOdds();
        },
        setSettings() {
            console.log('setSettings', this.ItemsModel.odds);
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
    overflow-x: hidden;
    overflow-y: scroll;

    .no-data {
        color: color(green, base);
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        height: 100%;
        justify-content: space-around;
        text-align: center;

        .no-data-icon {
            background-color: color(green, darker);
            border-radius: 0.5rem;
            color: color(white);
            cursor: pointer;
            font-size: 0.8rem;
            height: 0.8rem;
            padding-top: 0.1rem;
            width: 0.9rem;    
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
                    top: -0.5rem;

                    i {
                        color: color(green, dark);
                        font-size: 1.5rem;
                        text-align: center;
                    }
                }
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

.settings-header {
    border-bottom: 1px solid color(gray, darker);
    color: color(gray, darker);
    font-weight: bold;
}

.settings-section {
    display: flex;
    flex-direction: column;

    .settings-input {
        border-bottom: 1px solid color(gray, lighter);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 0.25rem;
        padding-bottom: 0.25rem;
        width: 100%;

        &:last-child {
            border-bottom: none;
            margin-bottom: 0.5rem;
        }

        .settings-input-label {
            color: color(gray, dark);
            margin-top: 0.25rem;

            span {
                color: color(gray, base);
                right: calc(100% - 8rem);
                position: relative;
            }
        }
    }
}
</style>
