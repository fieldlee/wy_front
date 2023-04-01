<template>
    <v-container id="opti1d-forms" fluid tag="section">
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="5" md="5">
                <base-material-card color="pink" icon="mdi-bullseye"
                    title="每个输入项单位保持一致，支持精确3位小数。<br/>”边丝宽度“：卷两边的卡槽损耗的宽度。<br/>”切割宽度“：切割刀片锯片损耗宽度。（根据情况设置，没有的填”0“）"
                    :isDesc=true text="<span color='white'><b>母卷设置</b></span>" class="px-6 py-3">
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>长度</th>
                                <th>数量</th>
                                <th>重量</th>
                                <th class="text-right" width="20%">
                                    增加/减少
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(parent, index) in mode_data.parents" v-bind:key="index">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <v-text-field v-model="parent.width" color="secondary" max-width="50" type="number" />
                                </td>
                                <td>
                                    <v-text-field v-model="parent.quantity" color="secondary" max-width="50"
                                        type="number" />
                                </td>
                                <td>
                                    <v-text-field v-model="parent.weight" color="secondary" max-width="50" type="number" />
                                </td>
                                <td class="text-left">
                                    <v-btn class="px-2 ml-1" color="info" min-width="0" small @click="addRowToParents()">
                                        +
                                    </v-btn>
                                    <v-btn class="px-2 ml-1" color="error" v-if="index != 0" min-width="0" small
                                        @click="removeRowToParents(index)">
                                        -
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>


                    </v-simple-table>
                    <v-row>
                        <v-col cols="1" />
                        <v-col cols="4">
                            <v-text-field color="secondary" v-model="side" label="边丝宽度" type="number"
                                prepend-icon="mdi-arrow-expand-horizontal">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field color="secondary" v-model="cutWidth" label="切割宽度" type="number"
                                prepend-icon="mdi-zip-box-outline">
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-card-actions class="pl-0 text-right">
                                <v-btn color="success" min-width="100" max-width="30">
                                    选择常用规格
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </base-material-card>
            </v-col>
            <v-col cols="5" md="5">
                <base-material-card color="success" icon="mdi-format-line-weight"
                    title="每个输入项单位保持一致，支持精确3位小数。<br/>”按长度切割“：不需要输入重量和数量，按照长度计算多个待选方案。<br/>”按预定重量切割“：根据客户预定重量计算每项数量后计算最佳的方案。"
                    :isDesc=true text="<span color='white'><b>分条设置</b></span>" class="px-6 py-3">
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th width="4%">#</th>
                                <th>长度</th>
                                <th>预定重量</th>
                                <th>数量</th>
                                <th class="text-right" width="20%">
                                    增加/减少
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(child, index) in mode_data.childs" v-bind:key="index">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <v-text-field v-model="child.width" color="secondary" type="number" max-width="10" />
                                </td>
                                <td>
                                    <v-text-field v-model="child.weight" color="secondary" type="number" max-width="50" />
                                </td>
                                <td>
                                    <v-text-field v-model="child.quantity" color="secondary" type="number" max-width="50" />
                                </td>
                                <td class="text-left">
                                    <v-btn class="px-2 ml-1" color="info" min-width="0" small @click="addRowToChilds()">
                                        +
                                    </v-btn>
                                    <v-btn class="px-2 ml-1" color="error" v-if="index != 0" min-width="0" small
                                        @click="removeRowToChilds(index)">
                                        -
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                    <v-row class="text-right">
                        <v-col cols="5"></v-col>
                        <v-col cols="3">
                            <v-card-actions class="pl-0 text-right">
                                <v-btn color="success" :disabled="cutBtnDisabled" @click="sendCutRules()">
                                    按长度切割
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-col cols="4">
                            <v-card-actions class="pl-0 text-right">
                                <v-btn color="success" :disabled="cutBtnDisabled" @click="sendCutRules()">
                                    按预定重量切割
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </base-material-card>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row style="margin-top:-40px" v-if="mode_data.childs_for_select && mode_data.childs_for_select.length > 0">
            <v-col cols="1"></v-col>
            <v-col cols="10" md="10">
                <base-material-card color="pink" icon="mdi-format-line-style" text="<span color='white'><b>待选方案</b></span>"
                    class="px-5 py-3">
                    <v-row>
                        <v-col cols="2" v-for="(child_rolls, index) in mode_data.childs_for_select" v-bind:key="index">
                            <v-simple-table class="theme--dark" @mouseover="hoverPlan(i)">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>宽度</th>
                                        <th>数量</th>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr class="border">
                                        <td>#</td>
                                        <td> 损耗</td>
                                        <td>
                                            {{
                                                child_rolls.worstWidth
                                            }}
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(child, i) in child_rolls.sub_child_solver" v-bind:key="i">
                                        <td>{{ i + 1 }}</td>
                                        <td>
                                            {{ child.width }}
                                        </td>
                                        <td>
                                            {{ child.quantity }}
                                        </td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                            <div class="text-center" style="margin-top:-15px; z-index: 1;">
                                <pages-btn :color="!child_rolls.select ? 'info' : 'success'" small depressed
                                    @click="selectdRow(index)" min-width="50">
                                    {{ '选择我' }}
                                </pages-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row v-show="selectedSolIndex">
                        <v-col cols="12">
                            <div id="d3_area">
                                <svg></svg>
                            </div>
                        </v-col>
                    </v-row>
                </base-material-card>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row style="margin-top:-40px">
            <v-col cols="1"></v-col>
            <v-col cols="10" md="10">
                <base-material-card color="pink" icon="mdi-format-line-style" title="分割方案"
                    text="<span color='white'><b>分割方案</b></span>" class="px-5 py-3">
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th width="4%">#</th>
                                <th>宽度</th>
                                <th>重量</th>
                                <th>使用率</th>
                                <th>损耗宽度</th>
                                <th>损耗重量</th>
                                <th width="25%">明细</th>
                                <th width="25%">分组</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <v-text-field dense color="secondary" outlined label="宽度" />
                                </td>
                                <td>
                                    <v-text-field dense color="secondary" outlined label="重量" />
                                </td>
                                <td>
                                    <v-text-field dense color="secondary" outlined label="使用率" />
                                </td>
                                <td>
                                    <v-text-field dense color="secondary" outlined label="损耗宽度" />
                                </td>
                                <td>
                                    <v-text-field dense color="secondary" outlined label="损耗重量" />
                                </td>
                                <td>
                                    <v-text-field dense color="secondary" outlined label="明细" />
                                </td>
                                <td>
                                    <v-text-field dense color="secondary" outlined label="分组" />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <td>合计</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tfoot>
                    </v-simple-table>
                </base-material-card>
            </v-col>
            <v-col cols="1"></v-col>

        </v-row>
        <base-material-snackbar v-model="snackbar" :type="color" v-bind="{
            top: true,
            center: true
        }">
            <span class="font-weight-bold">{{ snackbarMsg }}</span>
        </base-material-snackbar>
    </v-container>
</template>

<script>
import * as d3 from "d3";
import axios from 'axios'
export default {
    name: 'OptiOnePage',
    components: {
        PagesBtn: () => import('../elements/Btn.vue')
    },
    data: () => ({
        selectedSolIndex: false,
        cutBtnDisabled: false,
        side: 3,
        cutWidth: 0,
        number: 0,
        snackbar: false,
        color: "info",
        snackbarMsg: "",
        colors: [
            "#f1c40f", // Sun Flower
            "#1abc9c", // Torquise
            "#f39c12", // Orange
            "#2ecc71", // Emerald
            "#27ae60", // Nephritis
            "#e67e22", // Carrot
            "#d35400", // Pumpkin
            "#16a085", // Green Sea
            "#3498db", // Peter River
            "#2980b9", // Belize Hole
            "#e74c3c", // Alizarin
            "#c0392b", // Pomegranate
            "#9b59b6", // Amethyst
            "#8e44ad", // Wisteria
            "#ecf0f1", // Clouds
            '#bdc3c7', // Silver
            '#95a5a6', // Concrete <- Clouds & Silver are close
            '#34495e', // West Asphalt <- don't use because it is very close to Midnight blue
            '#2c3e50', // Midnight Blue <- use for wasted part
        ],
        wasteColor: "#7f8c8d",
        mode_data: {
            childs: [
                { width: 120, quantity: 0, weight: 0 },
                { width: 97, quantity: 0, weight: 0 },
                { width: 87, quantity: 0, weight: 0 },
            ],
            parents: [{ width: 1200, quantity: 1, weight: 6 }],
            result: null,
            childs_for_select: null,
        },
    }),
    created() {
        this.$vuetify.theme.dark = false
    },
    destroyed() {
        this.$vuetify.theme.dark = true
    },
    methods: {
        hoverPlan(index) {
            console.log(index);
            let i = 0;
            this.childs_for_select.forEach((item) => {
                if (index === i) {
                    item.select = true;
                } else {
                    item.select = false;
                }
                i++;
            });
        },
        selectdRow: function (idx) {
            this.selectedSolIndex = true;
            let selectdChild = this.mode_data.childs_for_select[idx];
            for (let index = 0; index < selectdChild.sub_child_solver.length; index++) {
                const ele = selectdChild.sub_child_solver[index];
                this.mode_data.childs[index].quantity = ele.quantity;
            }
            this.rule_selectd_index = idx;
            this.mode_data.result = { "data": { "solutions": null, "sub_weights": null } };
            this.mode_data.result.data.solutions = this.mode_data.childs_for_select[idx].solutions.solutions;
            this.mode_data.result.data.sub_weights = this.mode_data.childs_for_select[idx].solutions.sub_weights;
            let rolls = [];
            this.mode_data.result.data.solutions.forEach((soluton) => {
                let subs = [];
                soluton.subs.forEach((s) => {
                    subs.push(Math.round(parseFloat(s)) / 1000);
                });
                let subs_weight = [];
                soluton.sub_weights.forEach((s) => {
                    subs_weight.push(Math.round(parseFloat(s)) / 1000);
                });

                rolls.push([parseFloat(soluton.un_used / 1000), subs, parseFloat(soluton.un_used_weight / 1000), subs_weight]);
            });
            console.log(rolls);
            this.mode_data.result.solutions = rolls;
            let child_index = 0;
            this.mode_data.result.data.sub_weights.forEach(() => {
                this.mode_data.childs[child_index].weight = 0;
                child_index += 1;
            });
            child_index = 0;
            this.mode_data.result.data.sub_weights.forEach((w) => {
                if (parseFloat(this.mode_data.childs[child_index].weight)) {
                    this.mode_data.childs[child_index].weight = parseFloat(this.mode_data.childs[child_index].weight) + w / 1000;
                } else {
                    this.mode_data.childs[child_index].weight = w / 1000;
                }
                child_index += 1;
            });
            this.draw1d();
        },
        alertErr: function (error, msg) {
            this.snackbar = true;
            if (error === true) {
                this.color = 'error';
            } else {
                this.color = 'info';
            }
            this.snackbarMsg = msg;
        },
        prepareDataToSend1DForRule: function () {
            let newChilds = [];
            this.mode_data.childs.forEach((child) => {
                console.log("child");
                console.log(child);
                newChilds.push({ "width": parseInt(parseFloat(child.width) * 1000) });
            });

            let newParents = [];
            this.mode_data.parents.forEach((parent) => {
                console.log("parent");
                console.log(parent);
                let worst_weight = Math.round((parseFloat(this.side) / parseFloat(parent.width)) * (parseFloat(parent.weight) * 1000));
                newParents.push({ "quantity": parseInt(parent.quantity), "width": parseInt(parseFloat(parent.width) * 1000), "weight": parseInt(parseFloat(parent.weight) * 1000 - worst_weight) });
            });

            return {
                child_rolls: newChilds,
                parent_rolls: newParents,
                side: parseInt(parseFloat(this.cutWidth) * 1000),
                out_side: parseInt(parseFloat(this.side) * 1000),
                seed: Math.round(Math.random() * 10)
            };
        },
        disableCutBtn: function (disabled) {
            this.cutBtnDisabled = disabled;
        },
        sendCutRules: function () {
            this.disableCutBtn(true);
            let dataToSend = this.prepareDataToSend1DForRule();
            console.log(dataToSend);
            let url = "http://127.0.0.1:5001/api/stocks_1d_by_len";
            let config = {
                headers: {
                    access_token: $cookies.get("access_token")
                }
            };

            axios.post(url, dataToSend, config)
                .then((response) => {
                    this.disableCutBtn(false);
                    console.log(response);
                    if (response.data.code == 0) {
                        response.data.data.solutions.forEach((sol) => {
                            if (sol.sub_child_solver.length > 0) {
                                sol.sub_child_solver.forEach((rule) => {
                                    rule.width = rule.width / 1000;
                                })
                            }
                            // 计算浪费宽度
                            let worstWidth = 0;
                            sol.solutions.solutions.forEach((sud_sol) => {
                                worstWidth += parseFloat(sud_sol.un_used);
                            });
                            sol.worstWidth = (worstWidth / 1000) + this.side;
                        });
                        this.mode_data.childs_for_select = response.data.data.solutions;
                        console.log(this.mode_data.childs_for_select);
                        return
                    }
                    this.alertErr(true, response.data.msg);
                })
                .catch((error) => {
                    this.disableCutBtn(false);
                    this.alertErr(true, error.message);
                    return false;
                });
        },
        displayResult: function (response) {
            if (response.data.data && response.data.data.status_name) {
                if (response.data.data.status_name == "Error") {
                    this.alertErr(true, "服务计算超出母卷的长度，请重试！");
                    return false;
                }
            }

            this.mode_data.result = response.data;

            if (this.mode_data.result && this.mode_data.result.status_name) {
                this.mode_data.result.statusName =
                    this.mode_data.result.status_name.toLowerCase();
            }
            let rolls = [];
            this.mode_data.result.data.solutions.forEach((soluton) => {
                let subs = [];
                soluton.solutions.solutions.forEach((item) => {
                    item.subs.forEach((s) => {
                        subs.push(Math.round(parseFloat(s)) / 1000);
                    });
                });
                let subs_weight = [];

                soluton.solutions.solutions.forEach((item) => {
                    item.sub_weights.forEach((s) => {
                        subs_weight.push(Math.round(parseFloat(s)) / 1000);
                    });
                });
                rolls.push([parseFloat(soluton.un_used / 1000), subs, parseFloat(soluton.un_used_weight / 1000), subs_weight]);
            });

            this.mode_data.result.solutions = rolls;
            // let child_index = 0;
            // console.log("this.mode_data.result.data.sub_weights");
            // console.log(this.mode_data.result.data.solutions);
            // this.mode_data.result.data.solutions.forEach((soluton) => {
            //     soluton.solutions.solutions.forEach((item) => {
            //         console.log(item.sub_weights);
            //         item.sub_weights.forEach((weight) => {
            //             console.log(weight);
            //             console.log(child_index);
            //             console.log(this.mode_data.childs[child_index]);
            //             this.mode_data.childs[child_index].weight = parseFloat(weight / 1000);
            //         });
            //         child_index += 1;
            //     });
            // });

            this.draw1d();
        },
        sortBigRolls: function (bigRolls) {
            bigRolls = bigRolls.sort(function (a, b) {
                return a[0] - b[0];
            });
            for (let i = 0; i < bigRolls.length; i++) {
                // 计算子卷的个数和重量
                let unique_arr = Array.from(new Set(bigRolls[i][1]));
                let for_each_unique_arr = Array.from(new Set(bigRolls[i][1]));
                for_each_unique_arr.forEach((j, index_j) => {
                    let num = 0;
                    let weight = 0;
                    bigRolls[i][1].forEach((k, index_k) => {
                        if (j == k) {
                            num += 1;
                            weight += bigRolls[i][3][index_k];
                        }
                    })
                    unique_arr[index_j] = j + "*" + num + "/" + Math.round(parseFloat(weight) * 1000) / 1000;
                })
                bigRolls[i][3] = unique_arr;
                // 排序
                let smallRolls = bigRolls[i][1];
                smallRolls = smallRolls.sort(function (a, b) {
                    return a - b;
                });
                bigRolls[i][1] = smallRolls;
            }
            return bigRolls;
        },
        getColorDict: function () {
            const bigRolls = this.mode_data.result.solutions;
            let uniqueSmallRollsSet = new Set([]);
            for (let i = 0; i < bigRolls.length; i++) {
                const smallRolls = bigRolls[i][1];
                smallRolls.forEach((roll) => {
                    uniqueSmallRollsSet.add(roll);
                });
            }

            let uniqueSmallRolls = Array.from(uniqueSmallRollsSet);
            let colorDict = {};

            for (let i = 0; i < uniqueSmallRolls.length; i++) {
                colorDict[uniqueSmallRolls[i]] = this.colors[i % this.colors.length];
            }
            return colorDict;
        },
        draw1d: function () {
            this.clearTheDrawing();
            if (!this.mode_data.result) {
                console.log(
                    `Cannot draw anything. "result" is: ${this.mode_data.result} for mode: ${this.mode}`
                );
                return;
            }
            const unSortedBigRolls = this.mode_data.result.solutions;
            const bigRolls = this.sortBigRolls(unSortedBigRolls);
            this.mode_data.result.solutions = bigRolls;
            const colorDict = this.getColorDict();
            const parentWidth = this.mode_data.parents[0].width;
            // get the current width alloted to #d3_area, it's dynamic
            const graphWidth = document.getElementById("d3_area").clientWidth;
            console.log(graphWidth);
            let xScale = d3
                .scaleLinear()
                .domain([0, parentWidth])
                .range([0, graphWidth]);
            let yScale = d3
                .scaleBand()
                .domain(d3.range(bigRolls.length))
                // .range([0, 20 * bigRolls.length])
                .range([0, 100]);

            // create svg element:
            let svg = d3.select("#d3_area svg");

            let margin = { top: 20, right: 20, bottom: 20, left: 20 };

            let svgWidth = graphWidth - margin.left - margin.right;
            let svgHeight = 100 - margin.top - margin.bottom;

            svg
                .attr("width", svgWidth + margin.left + margin.right)
                .attr("height", svgHeight + margin.top + margin.bottom)
                .style("background-color", "#f3f4f7")
                .style("border", "1px solid #f3f4f7")

            let x1 = 0;
            let x2 = 0;
            let y1 = 0;
            for (let i = 0; i < bigRolls.length; i++) {
                const unusedWidth = bigRolls[i][0];
                const smallRolls = bigRolls[i][1];

                x1 = 0;
                y1 = yScale(i);

                for (let j = 0; j < smallRolls.length; j++) {
                    const smallRoll = smallRolls[j];

                    const width = xScale(smallRoll);
                    x2 = x1 + width;

                    // add the rectangular strip / bar
                    let g = svg.append("g").attr("transform", `translate(${x1},${y1})`); // one vertical bar

                    g.append("rect")
                        .attr("fill", colorDict[smallRoll]) // <- apply color associated with this width
                        .attr("width", width - 1)
                        .attr("height", yScale.bandwidth() - 1);

                    // add text
                    g.append("text")
                        .attr("fill", "white")
                        .attr("x", 3) // this x is relative to the parent g
                        .attr("y", yScale.bandwidth() / 2)
                        .attr("dy", "0.35em")
                        .text(smallRoll);

                    // for next rect, x1 will update to x2 of current rect
                    x1 = x2;
                }

                if (unusedWidth > 0) {
                    // add unusedWith as rectangular bar
                    x2 = x1 + xScale(unusedWidth);
                    let g = svg.append("g").attr("transform", `translate(${x1},${y1})`); // one vertical bar

                    g.append("rect")
                        .attr("fill", this.wasteColor)
                        .attr("width", xScale(unusedWidth) - 1)
                        .attr("height", yScale.bandwidth() - 1);

                    // add text
                    g.append("text")
                        .attr("fill", "white")
                        .attr("x", 3)
                        .attr("y", yScale.bandwidth() / 2)
                        .attr("dy", "0.35em")
                        .text(Math.round(unusedWidth));
                }
            }
            return svg.node();
        },
        clearTheDrawing: function () {
            d3.selectAll("#d3_area svg > *").remove();
            d3.select("#d3_area svg").style("border", "");
        },
        addRowToChilds: function () {
            this.mode_data.childs.push([0, 0, 0]);
        },
        removeRowToChilds: function (index) {
            this.mode_data.childs.splice(index, 1);
        },
        addRowToParents: function () {
            this.mode_data.parents.push([0, 0, 0]);
        },
        removeRowToParents: function (index) {
            this.mode_data.parents.splice(index, 1);
        },
    }
}
</script>
