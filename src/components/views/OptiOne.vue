<template>
    <v-container id="opti1d-forms" fluid tag="section">
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="5" md="5">
                <base-material-card color="pink" icon="mdi-bullseye" title="母卷设置"
                    text="<span color='white'><b>母卷设置</b></span>" class="px-5 py-3">
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th >#</th>
                                <th >长度</th>
                                <th >数量</th>
                                <th >重量</th>
                                <th >边丝宽</th>
                                <th class="text-right" width="20%">
                                    增加/减少
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <v-text-field v-validate="'required|numeric'" data-vv-name="number" color="secondary"
                                        type="number" />
                                </td>
                                <td>
                                    <v-text-field v-validate="'required|numeric'" data-vv-name="number" color="secondary"
                                        type="number" />
                                </td>
                                <td>
                                    <v-text-field v-validate="'required|numeric'" data-vv-name="number" color="secondary"
                                        type="number" />
                                </td>
                                <td>
                                    <v-text-field v-validate="'required|numeric'" data-vv-name="number" color="secondary"
                                        type="number" />
                                </td>
                                <td class="text-right">
                                    <v-btn v-for="(action, i) in actions" :key="i" class="px-2 ml-1" :color="action.color"
                                        min-width="0" small>
                                        <v-icon small v-text="action.icon" />
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                        <v-card-actions class="pl-0 text-right">
                            <v-btn color="success" min-width="100" max-width="30">
                                选择常用规格
                            </v-btn>
                        </v-card-actions>
                    </v-simple-table>

                </base-material-card>
            </v-col>
            <v-col cols="5" md="5">
                <base-material-card color="success" icon="mdi-format-line-weight" title="分条设置"
                    text="<span color='white'><b>分条设置</b></span>" class="px-6 py-3">
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th width="4%">#</th>
                                <th>长度</th>
                                <th>按数量</th>
                                <th>按重量</th>
                                <th class="text-right" width="20%">
                                    增加/减少
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <v-text-field v-validate="'required|numeric'" data-vv-name="number" color="secondary"
                                        type="number" max-width="10" />
                                </td>
                                <td>
                                    <v-text-field v-validate="'required|numeric'" data-vv-name="number" color="secondary"
                                        type="number" max-width="50" />
                                </td>
                                <td>
                                    <v-text-field v-validate="'required|numeric'" data-vv-name="number" color="secondary"
                                        type="number" max-width="50" />
                                </td>
                                <td class="text-right">
                                    <v-btn v-for="(action, i) in actions" :key="i" class="px-2 ml-1" :color="action.color"
                                        min-width="0" small>
                                        <v-icon small v-text="action.icon" />
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                    <v-row class="text-right">
                        <v-col cols="10" md="5"></v-col>
                        <v-col cols="2" md="5">
                            <v-card-actions class="pl-0 text-right">
                                <v-btn color="success" min-width="100" max-width="30">
                                    计算
                                </v-btn>
                            </v-card-actions>
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
            <v-col cols="12">
                <div id="d3_area">
                    <svg></svg>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import * as d3 from "d3";
import * as axios from "axios";
export default {
    name: 'OptiOnePage',
    data: () => ({
        number: 0,
        actions: [
            {
                color: 'info',
                icon: 'mdi-plus'
            },
            {
                color: 'error',
                icon: 'mdi-close'
            }
        ],
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
    }),
    created() {
        this.$vuetify.theme.dark = false
    },

    beforeDestroy() {
        this.$vuetify.theme.dark = true
    },
    methods: {
        /**
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
            console.log("bigRolls before sorting", unSortedBigRolls);

            const bigRolls = this.sortBigRolls(unSortedBigRolls);
            console.log("bigRolls after sorting", bigRolls);

            this.mode_data.result.solutions = bigRolls;

            const colorDict = this.getColorDict();

            const parentWidth = this.mode_data.parents[0].width - this.side;

            // get the current width alloted to #d3_area, it's dynamic
            const graphWidth = document.getElementById("d3_area").clientWidth;
            let xScale = d3
                .scaleLinear()
                .domain([0, parentWidth])
                .range([0, graphWidth]);
            let yScale = d3
                .scaleBand()
                .domain(d3.range(bigRolls.length))
                // .range([0, 20 * bigRolls.length])
                .range([0, 300]);

            // create svg element:
            let svg = d3.select("#d3_area svg");

            let margin = { top: 20, right: 20, bottom: 20, left: 20 };

            let svgWidth = 300 - margin.left - margin.right;
            let svgHeight = 300 - margin.top - margin.bottom;

            svg
                .attr("width", svgWidth + margin.left + margin.right)
                .attr("height", svgHeight + margin.top + margin.bottom)
                .style("background-color", "#f3f4f7")
                .style("border", "1px solid #f3f4f7")
            // .style("border-left-width", "thick")
            // .style("border-right-width", "thick");
            // .append("g")
            // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            // .attr('fill', 'blue');

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
            // also hide the border of svg
            d3.select("#d3_area svg").style("border", "");
        }
        */
    }
}
</script>
