<template>
    <v-container id="cal-dish" fluid tag="section">
        <v-row>
            <v-col cols="12" md="6">
                <base-material-card color="success" icon="mdi-circle-double" title="计算盘条长度" class="px-5 py-3">
                    <v-form class="mt-5">
                        <v-text-field v-model="dishCircle" label="直径(mm)" color="secondary" type="number" />
                        <v-text-field v-model="dishWeight" label="重量(t)" color="secondary" type="number" />
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
                        <v-text-field readonly v-model="dishLength" label="长度(m)" color="secondary" type="number" />
                    </v-form>
                </base-material-card>
            </v-col>

            <v-col cols="12" md="6">
                <base-material-card color="success" icon="mdi-circle-double" title="计算盘条重量" class="px-5 py-3">
                    <v-form class="mt-5">
                        <v-text-field v-model="dishLength2" label="长度(m)" color="secondary" type="number" />
                        <v-text-field v-model="dishCircle2" label="直径(mm)" color="secondary" type="number" />
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
                        <v-text-field readonly v-model="dishWeight2" label="重量(t)" color="secondary" type="number" />
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
    name: 'Dish',
    data: function () {
        return {
            snackbar: false,
            color: "info",
            snackbarMsg: "",
            dialog: false,
            densityValue: '',
            density: 7.85,
            dishLength:0,
            dishCircle:0,
            dishWeight:0,

            dishLength2:0,
            dishCircle2:0,
            dishWeight2:0,
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
            if ( this.dishCircle == 0 || this.dishWeight == 0) {
                this.alertErr(true, "请输入必要的数值");
                return false;
            }
            let volume = (this.dishWeight*1000*1000) / this.density;

            let c = ((parseFloat(this.dishCircle) * 10) / 2)*((parseFloat(this.dishCircle) * 10) / 2)*Math.PI;

            let len = volume / c ;

            this.dishLength = len / 10;
        },
        comRight: function () {
            if ( this.dishLength2 == 0 || this.dishCircle2 == 0) {
                this.alertErr(true, "请输入必要的数值");
                return false;
            }
            // let volume = (this.dishWeight*1000*1000) / this.density;

            let c = ((parseFloat(this.dishCircle2) * 10) / 2)*((parseFloat(this.dishCircle2) * 10) / 2)*Math.PI;

            let volume = c * this.dishLength2 * 10;

            this.dishWeight2  = (volume * this.density)/1000/1000;
        },
        resetLeft: function () {
            this.dishLength = 0;
            this.dishCircle = 0;
            this.dishWeight = 0;
        }
        ,
        resetRight: function () {
            this.dishLength2 = 0;
            this.dishCircle2 = 0;
            this.dishWeight2 = 0;
        }
    }
}
</script>