<template>
    <div class="settings-btn"
        @click="settingsFormVisible = true">
        <i class="el-icon-setting"></i>
    </div>

    <!-- Settings Dialog -->
    <el-dialog custom-class="settings-dialog"
        title="Probability Settings"
        top="12vh" width="90%"
        v-model="settingsFormVisible">

        <!-- Background: Origin & History -->
        <el-tabs v-model="activeName" :stretch="true"
            class="item-settings-tabs">
            <el-tab-pane label="Background" name="background">
                <div class="settings-header">Description</div>
                <div class="settings-section">
                    <div class="settings-input">
                        <span class="settings-input-label">
                            <span class="no-label">
                                {{ItemsModel.quantities.description}} total
                            </span>
                        </span>
                    </div>
                </div>
                <div class="settings-header bg">Origin<span>Weight</span></div>
                <div class="settings-section">
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Common
                            <span class="has-label">
                                {{ItemsModel.quantities.originC}} total
                            </span>
                        </span>
                        <el-input-number
                            v-model="ItemsModel.odds.origin.common"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Uncommon
                            <span class="has-label">
                                {{ItemsModel.quantities.originU}} total
                            </span>
                        </span>
                        <el-input-number
                            v-model="ItemsModel.odds.origin.uncommon"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Rare
                            <span class="has-label">
                                {{ItemsModel.quantities.originR}} total
                            </span>
                        </span>
                        <el-input-number
                            v-model="ItemsModel.odds.origin.rare"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                </div>
                <div class="settings-header bg">History<span>Weight</span></div>
                <div class="settings-section">
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Doesn't have a history
                        </span>
                        <el-input-number
                            v-model="ItemsModel.odds.history.none"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Has a history
                            <span class="has-label">
                                {{ItemsModel.quantities.history}} total
                            </span>
                        </span>
                        <el-input-number
                            v-model="ItemsModel.odds.history.history"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                </div>
            </el-tab-pane>

            <!-- Boons: Properties -->
            <el-tab-pane label="Boons" name="boons">
                <div class="settings-header">Quality<span>Weight</span></div>
                <div class="settings-section">
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Common
                            <span class="has-label">
                                {{ItemsModel.quantities.propertyC}} total
                            </span>
                        </span>
                        <el-input-number v-model="ItemsModel.odds.property.common"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Uncommon
                            <span class="has-label">
                                {{ItemsModel.quantities.propertyU}} total
                            </span>
                        </span>
                        <el-input-number v-model="ItemsModel.odds.property.uncommon"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Rare
                            <span class="has-label">
                                {{ItemsModel.quantities.propertyR}} total
                            </span>
                        </span>
                        <el-input-number v-model="ItemsModel.odds.property.rare"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                </div>
                <div class="settings-header">Quantity<span>Weight</span></div>
                <div class="settings-section">
                    <div class="settings-input">
                        <span class="settings-input-label">
                            None
                        </span>
                        <el-input-number v-model="ItemsModel.odds.property.none"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            One Boon
                        </span>
                        <el-input-number v-model="ItemsModel.odds.property.single"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Two Boons
                        </span>
                        <el-input-number v-model="ItemsModel.odds.property.binary"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Three Boons
                        </span>
                        <el-input-number v-model="ItemsModel.odds.property.triple"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                </div>
            </el-tab-pane>

            <!-- Banes: Curses -->
            <el-tab-pane label="Banes" name="banes">
                <div class="settings-header">Quality<span>Weight</span></div>
                <div class="settings-section">
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Common
                            <span class="has-label">
                                {{ItemsModel.quantities.curseC}} total
                            </span>
                        </span>
                        <el-input-number v-model="ItemsModel.odds.curse.common"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Uncommon
                            <span class="has-label">
                                {{ItemsModel.quantities.curseU}} total
                            </span>
                        </span>
                        <el-input-number v-model="ItemsModel.odds.curse.uncommon"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Rare
                            <span class="has-label">
                                {{ItemsModel.quantities.curseR}} total
                            </span>
                        </span>
                        <el-input-number v-model="ItemsModel.odds.curse.rare"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                </div>
                <div class="settings-header">Quantity<span>Weight</span></div>
                <div class="settings-section">
                    <div class="settings-input">
                        <span class="settings-input-label">
                            None
                        </span>
                        <el-input-number v-model="ItemsModel.odds.curse.none"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            One Bane
                        </span>
                        <el-input-number v-model="ItemsModel.odds.curse.single"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Two Banes
                        </span>
                        <el-input-number v-model="ItemsModel.odds.curse.binary"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                    <div class="settings-input">
                        <span class="settings-input-label">
                            Three Banes
                        </span>
                        <el-input-number v-model="ItemsModel.odds.curse.triple"
                            controls-position="right" size="mini">
                        </el-input-number>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <!-- Footer -->
        <template #footer>
            <span class="dialog-footer">
                <el-button
                    class="reset-btn"
                    icon="el-icon-magic-stick"
                    @click="resetOdds">
                    Reset All
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import {
    ElButton,
    ElDialog,
    ElInputNumber,
    ElTabPane,
    ElTabs,
} from 'element-plus';

import ItemsModel from '../../models/items';

export default {
    name: 'item-settings',
    components: {
        [ElButton.name]: ElButton,
        [ElDialog.name]: ElDialog,
        [ElInputNumber.name]: ElInputNumber,
        [ElTabPane.name]: ElTabPane,
        [ElTabs.name]: ElTabs
    },
    data() {
        return {
            ItemsModel,
            activeName: 'background',
            settingsFormVisible: false
        };
    },
    methods: {
        resetOdds() {
            this.ItemsModel.resetOdds();
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/colors';

.settings-header {
    color: color(gray, darker);
    display: flex;
    flex-direction: row;
    font-weight: bold;
    justify-content: space-between;

    &.bg {
        margin-top: 0.5rem;
    }

    span {
        font-style: italic;
        font-weight: 100;
        margin-right: 3.5rem;
    }
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

            .has-label,
            .no-label {
                color: color(gray, base);
            }

            .has-label {
                right: calc(100% - 8rem);
                position: relative;
            }
        }
    }
}

.reset-btn {
    &:hover {
        background-color: color(green, lightest);
        border-color: color(green, lighter);
        color: color(green, darker);
    }
}
</style>
