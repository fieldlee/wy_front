<template>
    <v-container id="cal-coil" fluid tag="section">
        <v-row>
            <v-col cols="12" md="6">
                <base-material-card color="success" icon="mdi-application-outline" title="计算单张钢板重量" class="px-5 py-3">
                    <v-form class="mt-5">
                        <v-text-field v-model="plateLength" label="长度(m)" color="secondary" type="number" />
                        <v-text-field v-model="plateWidth" label="宽度(mm)" color="secondary" type="number" />
                        <v-text-field v-model="plateThick" label="厚度(mm)" color="secondary" type="number" />
                        <v-select label="钢板密度(g/cm3)" v-model="densityValue" :items="items"></v-select>
                    </v-form>

                    <v-row>
                        <v-col cols="6" md="6">
                            <v-card-actions class="pl-0">
                                <v-btn color="dark" min-width="100" @click="resetLeft()">
                                    重置
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-card-actions class="pl-0">
                                <v-btn color="success" min-width="100" @click="comLeft()">
                                    计算
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                    <v-form class="mt-5">
                        <v-text-field readonly v-model="plateWeight" label="重量（t）" color="secondary" type="number" />
                    </v-form>
                </base-material-card>
            </v-col>
            <v-col cols="12" md="6">
                <base-material-card color="success" icon="mdi-application-outline" title="计算钢卷重量" class="px-5 py-3">
                    <v-form class="mt-5">
                        <v-text-field v-model="outer" label="外径(mm)" color="secondary" type="number" />
                        <v-text-field v-model="inner" label="内径(mm)" color="secondary" type="number" />
                        <v-text-field v-model="width" label="宽度(mm)" color="secondary" type="number" />
                        <v-select label="钢板密度(g/cm3)" v-model="densityValue" :items="items"></v-select>
                    </v-form>

                    <v-row>
                        <v-col cols="6" md="6">
                            <v-card-actions class="pl-0">
                                <v-btn color="dark" min-width="100" @click="resetRight()">
                                    重置
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-card-actions class="pl-0">
                                <v-btn color="success" min-width="100" @click="comRight()">
                                    计算
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                    <v-form class="mt-5">
                        <v-text-field readonly v-model="coilWeight" label="重量（t）" color="secondary" type="number" />
                    </v-form>
                </base-material-card>
            </v-col>
        </v-row>
        <!---对话框-->
        <base-material-snackbar v-model="snackbar" :timeout="2000" :type="color" v-bind="{
                top: true,
                center: true
            }">
            <span class="font-weight-bold">{{ snackbarMsg }}</span>
        </base-material-snackbar>
    </v-container>
</template>


<script>
export default {
    name: 'Coil',
    data: function () {
        return {
            snackbar: false,
            color: "info",
            snackbarMsg: "",
            dialog: false,
            densityValue: '',
            density: 7.85,
            items: ["7.93(304,201)", "7.85(碳钢)", "7.9(304L)", "8(316,316L)", "8.03(321)"],


            plateWidth: 0,
            plateThick: 0,
            plateLength: 0,
            plateWeight: 0,

            outer: 0,
            inner: 0,
            width: 0,
            coilWeight:0,
        }
    },

    methods: {
        alertErr: function (error, msg) {
            this.snackbar = true;
            if (error === true) {
                this.color = 'error';
            } else {
                this.color = 'info';
            }
            this.snackbarMsg = msg;
        },
        getDensity: function () {
            this.items.forEach((s) => {
                if (s == "7.93(304,201)") {
                    this.density = 7.93;
                }
                if (s == "7.85(碳钢)") {
                    this.density = 7.85;
                }
                if (s == "7.9(304L)") {
                    this.density = 7.9;
                }
                if (s == "8(316,316L)") {
                    this.density = 8;
                }
                if (s == "8.03(321)") {
                    this.density = 8.03;
                }
            })
        },
        comLeft: function () {
            if (this.plateWidth == 0 || this.plateThick == 0 || this.plateLength == 0) {
                this.alertErr(true, "请输入必要的数值");
                return false;
            }
            if (this.densityValue == "") {
                this.alertErr(true, "请选择密度");
                return false;
            }
            this.getDensity();
            let w = parseFloat(this.plateWidth) / 10;
            let thick = parseFloat(this.plateThick) / 10;
            let len = parseFloat(this.plateLength) * 10;
            this.plateWeight = ((w * thick * len) * this.density) / 1000 / 1000
        },
        comRight: function () {
            if (this.outer == 0 || this.inner == 0 || this.width == 0) {
                this.alertErr(true, "请输入必要的数值");
                return false;
            }
            if (this.densityValue == "") {
                this.alertErr(true, "请选择密度");
                return false;
            }
            this.getDensity();

            let w = parseFloat(this.width) / 10;
            let outer = parseFloat(this.outer) / 10;
            let inner = parseFloat(this.inner) / 10;
            this.coilWeight = ((outer/2)*(outer/2)*Math.PI -  (inner/2)*(inner/2)*Math.PI)*w * this.density / 1000/1000;
        },

        resetLeft: function () {
            this.plateWidth = 0;
            this.plateThick = 0;
            this.plateLength = 0;
            this.densityValue = "";
        },

        resetRight: function () {
            this.width = 0;
            this.outer = 0;
            this.inner = 0;
            this.densityValue = "";
        }
    }
}
</script>