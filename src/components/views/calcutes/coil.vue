<template>
    <v-container id="cal-coil" fluid tag="section">
        <v-row>
            <v-col cols="12" md="6">
                <base-material-card color="success" icon="mdi-circle-double" title="计算外径" class="px-5 py-3">
                    <h1 class="font-weight-bold mb-2" style="color:#BDBDBD; font-size:18px" v-text="'已知卷重和宽度计算外径'" />
                    <h1 class="font-weight-bold mb-2" style="color:peru; font-size:12px"
                        v-text="'注：用钢卷的重量和宽度计算钢卷外径 本公式钢材密度按7.85g/cm³计算'" />

                    <v-form class="mt-5">
                        <v-text-field v-model="coilWidth" label="宽度(mm)" color="secondary" type="number" />
                        <v-text-field v-model="coilWeight" label="重量(t)" color="secondary" type="number" />
                        <v-text-field v-model="coilInner1" label="内径(mm)" color="secondary" type="number" />
                        <v-text-field v-model="density" label="钢材密度" color="secondary" type="number" />
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
                        <v-text-field readonly v-model="coilOutter1" label="外径(mm)" color="secondary" type="number" />
                    </v-form>
                </base-material-card>
            </v-col>

            <v-col cols="12" md="6">
                <base-material-card color="success" icon="mdi-circle-double" title="计算外径" class="px-5 py-3">
                    <h1 class="font-weight-bold mb-2" style="color:#BDBDBD; font-size:18px" v-text="'已知厚度和长度计算外径'" />
                    <h1 class="font-weight-bold mb-2" style="color:peru; font-size:12px"
                        v-text="'注：用钢卷的重量和宽度计算钢卷外径 本公式钢材密度按7.85g/cm³计算'" />

                    <v-form class="mt-5">
                        <v-text-field v-model="coilThick" label="厚度(mm)" color="secondary" type="number" />
                        <v-text-field v-model="coilLength" label="长度(mm)" color="secondary" type="number" />
                        <v-text-field v-model="coilInner2" label="内径(mm)" color="secondary" type="number" />
                        <v-text-field v-model="density" label="钢材密度" color="secondary" type="number" />
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
                        <v-text-field readonly v-model="coilOutter" label="外径(mm)" color="secondary" type="number" />
                    </v-form>
                </base-material-card>
            </v-col>
            <v-col cols="12" md="6">
                <base-material-card color="success" icon="mdi-circle-outline" title="计算卷长度" class="px-5 py-3">
                    <h1 class="font-weight-bold mb-2" style="color:#BDBDBD; font-size:18px" v-text="'已知厚度、内径、外径计算长度'" />
                    <h1 class="font-weight-bold mb-2" style="color:peru; font-size:12px"
                        v-text="'注：用钢卷的重量和宽度计算钢卷外径 本公式钢材密度按7.85g/cm³计算'" />

                    <v-form class="mt-5">
                        <v-text-field v-model="coilOutter3" label="外径(mm)" color="secondary" type="number" />
                        <v-text-field v-model="coilInner3" label="内径(mm)" color="secondary" type="number" />
                        <v-text-field v-model="coilThick3" label="厚度(mm)" color="secondary" type="number" />
                        <v-text-field v-model="density" label="钢材密度" color="secondary" type="number" />
                    </v-form>

                    <v-row>
                        <v-col cols="6" md="6">
                            <v-card-actions class="pl-0">
                                <v-btn color="dark" min-width="100" @click="reset3()">
                                    重置
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-card-actions class="pl-0">
                                <v-btn color="success" min-width="100" @click="comLenLeft()">
                                    计算
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                    <v-form class="mt-5">
                        <v-text-field readonly v-model="coilLength3" label="长度(m)" color="secondary" type="number" />
                    </v-form>
                </base-material-card>
            </v-col>
            <!--
<v-col cols="12" md="6">
                <base-material-card color="success" icon="mdi-email-outline" title="计算卷长度" class="px-5 py-3">
                    <h1 class="font-weight-bold mb-2" style="color:#BDBDBD; font-size:18px" v-text="'已知重量、内径、外径计算长度'" />
                    <h1 class="font-weight-bold mb-2" style="color:peru; font-size:12px"
                        v-text="'注：用钢卷的重量和宽度计算钢卷外径 本公式钢材密度按7.85g/cm³计算'" />

                    <v-form class="mt-5">
                        <v-text-field v-model="coilOutter4" label="外径(mm)" color="secondary" type="number" />
                        <v-text-field v-model="coilInner4" label="内径(mm)" color="secondary" type="number" />
                        <v-text-field v-model="coilWidth4" label="宽度(mm)" color="secondary" type="number" />
                        <v-text-field v-model="coilWeight4" label="重量(t)" color="secondary" type="number" />
                        <v-text-field v-model="density" label="钢材密度" color="secondary" type="number" />
                    </v-form>

                    <v-row>
                        <v-col cols="6" md="6">
                            <v-card-actions class="pl-0">
                                <v-btn color="dark" min-width="100" @click="reset4()">
                                    重置
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-card-actions class="pl-0">
                                <v-btn color="success" min-width="100" @click="comLenRight()">
                                    计算
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                    <v-form class="mt-5">
                        <v-text-field readonly v-model="coilLength4" label="计算结果" color="secondary" type="number" />
                    </v-form>
                </base-material-card>
            </v-col>
            -->

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
            density: 7.85,
            coilWidth: 0,
            coilWeight: 0,
            coilInner1: 0,
            coilInner2: 0,
            coilOutter1:0,
            coilOutter: 0,
            coilThick: 0,
            coilLength: 0,

            coilOutter3: 0,
            coilInner3: 0,
            coilThick3: 0,
            coilLength3: 0,

            coilOutter4:0,
            coilInner4:0,
            coilWeight4:0,
            coilWidth4:0,
            coilLength4:0,
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
            if (this.coilWidth == 0 || this.coilWeight == 0 || this.coilInner1 == 0){
                this.alertErr(true,"请输入必要的数值");
                return false;
            }
            let inner =  parseFloat(this.coilInner1)/10;
            let width =  parseFloat(this.coilWidth)/10;
            let weight =  parseFloat(this.coilWeight)*1000*1000;
            let density = parseFloat(this.density);
            let X = ( weight/density + ((inner/2)*(inner/2)*Math.PI)*width ) / width /Math.PI ;
            this.coilOutter1 = Math.sqrt(X)*2*10;
        },
        comRight: function () {
            if (this.coilThick == 0 || this.coilLength == 0 || this.coilInner2 == 0){
                this.alertErr(true,"请输入必要的数值");
                return false;
            }
            let thick = parseFloat(this.coilThick);
            let length = parseFloat(this.coilLength);
            let volume = thick * length;
            let inner = parseFloat(this.coilInner2);

            let X = (volume + (inner/2)*(inner/2)*Math.PI)/Math.PI
            this.coilOutter = Math.sqrt(X)*2;
        },
        comLenLeft: function(){
            if (this.coilOutter3 == 0 || this.coilInner3 == 0 || this.coilThick3 == 0){
                this.alertErr(true,"请输入必要的数值");
                return false;
            }
            let outer = parseFloat(this.coilOutter3);
            let inner = parseFloat(this.coilInner3);
            let thick = parseFloat(this.coilThick3);

            this.coilLength3 = (((outer/2)*(outer/2)*Math.PI - (inner/2)*(inner/2)*Math.PI)/thick)/1000;
        },
        comLenRight: function(){
            if (this.coilOutter4 == 0 || this.coilInner4 == 0 || this.coilWeight4 == 0){
                this.alertErr(true,"请输入必要的数值");
                return false;
            }
            let outer = parseFloat(this.coilOutter4);
            let inner = parseFloat(this.coilInner4);
            let width = parseFloat(this.coilWidth4);
            let weight = parseFloat(this.coilWeight4);
            this.coilLength3 = ((outer/2)*(outer/2)*Math.PI - (inner/2)*(inner/2)*Math.PI)/thick;
        },
        resetLeft: function () {
            this.coilWidth = 0;
            this.coilWeight = 0;
            this.coilInner1 = 0;
        },
        resetRight: function () {
            this.coilThick = 0;
            this.coilLength = 0;
            this.coilInner2 = 0;
        },
        reset3: function () {
            this.coilOutter3 = 0;
            this.coilInner3 = 0;
            this.coilThick3 = 0;
        },
        reset4: function () {
            this.coilOutter4 = 0;
            this.coilInner4 = 0;
            this.coilWeight4 = 0;
            this.coilLength4 = 0;
            this.coilWidth4 = 0;
        }
    }
}
</script>