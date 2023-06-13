<template>
    <v-container id="cal-thread" fluid tag="section">
        <v-row>
            <v-col cols="12" md="6">
                <base-material-card color="success" icon="mdi-bolt" title="计算螺纹钢根数" class="px-5 py-3">
                    <v-form class="mt-5">
                        <v-select label="长度(m)" v-model="threadLength" :items="items"></v-select>
                        <v-text-field v-model="threadCircle" label="直径(mm)" color="secondary" type="number" />
                        <v-text-field v-model="threadWeight" label="重量(t)" color="secondary" type="number" />
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
                        <v-text-field readonly v-model="threadNumber" label="根数" color="secondary" type="number" />
                    </v-form>
                </base-material-card>
            </v-col>
            <v-col cols="12" md="6">
                <base-material-card color="success" icon="mdi-bolt" title="计算螺纹钢重量" class="px-5 py-3">
                    <v-form class="mt-5">
                        <v-select label="长度(m)" v-model="threadLength2" :items="items"></v-select>
                        <v-text-field v-model="threadCircle2" label="直径(mm)" color="secondary" type="number" />
                        <v-text-field v-model="threadNumber2" label="根数" color="secondary" type="number" />

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
                        <v-text-field readonly v-model="threadWeight2" label="重量（t）" color="secondary" type="number" />
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
    name: 'Thread',
    data: function () {
        return {
            snackbar: false,
            color: "info",
            snackbarMsg: "",
            dialog: false,
            densityValue: 9,
            density: 7.85,
            items: [3,6,9,12],

            threadNumber: 0,
            threadCircle: 0,
            threadWeight: 0,
            threadLength: 0,

            threadNumber2: 0,
            threadCircle2: 0,
            threadWeight2: 0,
            threadLength2: 0,
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
        comLeft: function () {
            if (this.threadCircle == 0 || this.threadWeight == 0 || this.threadLength == 0) {
                this.alertErr(true, "请输入必要的数值");
                return false;
            }

            let circle = parseFloat(this.threadCircle) * 10;
            let length = parseFloat(this.threadLength) / 10;
            let volume = (circle / 2)*(circle / 2)*Math.PI * length;
            let weight = parseFloat(this.density) * volume;

            let all_weight = this.threadWeight * 1000 * 1000;

            this.threadNumber  = all_weight / weight;
        },
        comRight: function () {
            if (this.threadCircle2 == 0 || this.threadLength2 == 0 || this.threadNumber2 == 0) {
                this.alertErr(true, "请输入必要的数值");
                return false;
            }
            let circle = parseFloat(this.threadCircle2) * 10;
            let length = parseFloat(this.threadLength2) / 10;
            let volume = (circle / 2)*(circle / 2)*Math.PI * length;
            let weight = parseFloat(this.density) * volume * this.threadNumber2;

            this.threadWeight2 =  weight / 1000/1000;
        },

        resetLeft: function () {
            this.threadCircle = 0;
            this.threadWeight = 0;
            this.threadNumber = 0;
        },

        resetRight: function () {
            this.threadCircle2 = 0;
            this.threadNumber2 = 0;
            this.threadWeight2 = 0;

        }
    }
}
</script>