<template>
  <v-container id="optiarea-forms" fluid tag="section">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="5" md="5">
        <base-material-card color="pink" icon="mdi-bullseye"
          title="每个输入项单位保持一致，支持精确3位小数。<br/>”边丝宽度“：卷两边的卡槽损耗的宽度。<br/>”切割宽度“：切割刀片锯片损耗宽度。（根据情况设置，没有的填”0“）" :isDesc=true
          text="<span color='white'><b>母卷设置</b></span>" class="px-6 py-3">
          <v-simple-table>
            <thead>
              <tr>
                <th>#</th>
                <th>长度</th>
                <th>宽度</th>
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
                  <v-text-field v-model="parent.length" color="secondary" max-width="50" type="number" />
                </td>
                <td>
                  <v-text-field v-model="parent.width" color="secondary" max-width="50" type="number" />
                </td>
                <td>
                  <v-text-field v-model="parent.quantity" color="secondary" max-width="50" type="number" />
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
            <v-col cols="7">
              <v-text-field color="secondary" v-model="cutWidth" label="切割宽度" type="number"
                prepend-icon="mdi-zip-box-outline">
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-card-actions class="pl-0 text-right">
                <v-btn color="success" min-width="100" max-width="30" @click="selectSpec()">
                  选择常用规格
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
      <v-col cols="5" md="5">
        <base-material-card color="success" icon="mdi-format-line-weight"
          title="每个输入项单位保持一致，支持精确3位小数。<br/>”按长度切割“：不需要输入重量和数量，按照长度计算多个待选方案。<br/>”按重量切割“：根据重量计算每项数量后计算最佳的方案。" :isDesc=true
          text="<span color='white'><b>分条设置</b></span>" class="px-6 py-3">
          <v-simple-table>
            <thead>
              <tr>
                <th width="4%">#</th>
                <th>长度</th>
                <th>宽度</th>
                <th>预定重量</th>
                <th>数量</th>
                <th class="text-right" width="20%">
                  增加/减少
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(child, index) in mode_data.childs" v-bind:key="index">
                <td :style="getColor(child.color)">{{ index + 1 }}</td>
                <td>
                  <v-text-field v-model="child.length" color="secondary" type="number" max-width="10" />
                </td>
                <td>
                  <v-text-field v-model="child.width" color="secondary" type="number" max-width="10" />
                </td>
                <td>
                  <v-text-field v-model="child.weight" color="secondary" type="number" max-width="50" />
                </td>
                <td>
                  <v-text-field v-model="child.quantity" @change="" color="secondary" type="number" max-width="50" />
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
            <v-col cols="3"></v-col>
            <v-col cols="3">
              <v-card-actions class="pl-0 text-right">
                <v-btn color="success" :disabled="cutBtnDisabled" @click="sendCutRule()">
                  按规格切割
                </v-btn>
              </v-card-actions>
            </v-col>
            <v-col cols="3">
              <v-card-actions class="pl-0 text-right">
                <v-btn color="success" :disabled="cutBtnDisabled" @click="sendCutSheet('weight')">
                  按重量切割
                </v-btn>
              </v-card-actions>
            </v-col>
            <v-col cols="3">
              <v-card-actions class="pl-0 text-right">
                <v-btn color="success" :disabled="cutBtnDisabled" @click="sendCutSheet('quantity')">
                  按数量切割
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <!---待选方案-->
    <v-row style="margin-top:-40px" v-if="mode_data.childs_for_select && mode_data.childs_for_select.length > 0">
      <v-col cols="1"></v-col>
      <v-col cols="10" md="10">
        <base-material-card color="pink" icon="mdi-format-line-style" text="<span color='white'><b>待选方案</b></span>"
          class="px-5 py-3">
          <v-row>
            <v-col cols="3" v-for="(child_rolls, index) in mode_data.childs_for_select" v-bind:key="index">
              <v-simple-table class="theme--dark" dense @mouseover="hoverPlan(i)">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>长度</th>
                    <th>宽度</th>
                    <th>数量</th>
                  </tr>
                </thead>
                <thead>
                  <tr class="border">
                    <td>#</td>
                    <td colspan="2">损耗面积</td>
                    <td>
                      {{
                        child_rolls.solutions.solutions[0].unused_area / 1000 / 1000
                      }}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(child, i) in child_rolls.sub_child_solver" v-bind:key="i">
                    <td>{{ i + 1 }}</td>
                    <td>
                      {{ child.length / 1000 }}
                    </td>
                    <td>
                      {{ child.width / 1000 }}
                    </td>
                    <td>
                      {{ child.quantity }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
              <div class="text-center" style="margin-top:-10px; z-index: 1;">
                <pages-btn :color="!child_rolls.select ? 'info' : 'success'" small depressed @click="selectdRow(index)"
                  min-width="50">
                  {{ '选我' }}
                </pages-btn>
              </div>
            </v-col>
          </v-row>

        </base-material-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <!---切割方案-->
    <v-row style="margin-top:-40px">
      <v-col cols="1"></v-col>
      <v-col cols="10" md="10">
        <base-material-card color="pink" icon="mdi-format-line-style" title="分割方案"
          text="<span color='white'><b>分割方案</b></span>" class="px-5 py-3">

          <v-simple-table>
            <thead>
              <tr>
                <th width="4%">#</th>
                <th><b>有效面积</b></th>
                <th><b>有效重量</b></th>
                <th><b>使用率</b></th>
                <th><b>损耗面积</b></th>
                <th><b>损耗重量</b></th>
                <th width="50%"><b>明细(规格*数量/重量)</b></th>
              </tr>
            </thead>

            <tbody v-if="mode_data.result">
              <tr v-for="(bigRoll, index) in mode_data.result.data.solutions" v-bind:key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  {{ getRound(bigRoll.used_area, true) }}
                </td>
                <td>
                  {{ getRound(bigRoll.used_weight, false) }}
                </td>
                <td>
                  {{ getPercentageUtilization(parseFloat(bigRoll.unused_area), parseFloat(bigRoll.used_area)) }}%
                </td>
                <td>
                  {{ getRound(bigRoll.unused_area, true) }}
                </td>
                <td>
                  {{ getRound(bigRoll.unused_weight, false) }}
                </td>
                <td>
                  {{ bigRoll.subs_list.join(",") }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-row class="text-right">
            <v-col cols="5"></v-col>
            <v-col cols="3">
              <v-card-actions class="pl-0 text-right">
                <v-btn color="success" :disabled="cutBtnDisabled" @click="downloadCsv()">
                  下载
                </v-btn>
              </v-card-actions>
            </v-col>
            <v-col cols="4">
            </v-col>
          </v-row>
          <v-row style="margin-top:-20px">
            <v-col cols="3">
              <div id="d3_area_1">
                <svg style="height: 300"></svg>
              </div>
            </v-col>
            <v-col cols="3">
              <div id="d3_area_2">
                <svg style="height: 300"></svg>
              </div>
            </v-col>
            <v-col cols="3">
              <div id="d3_area_3">
                <svg style="height: 300"></svg>
              </div>
            </v-col>
            <v-col cols="3">
              <div id="d3_area_4">
                <svg style="height: 300"></svg>
              </div>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <!---对话框-->
    <base-material-snackbar v-model="snackbar" :timeout="2000" :type="color" v-bind="{
      top: true,
      center: true
    }">
      <span class="font-weight-bold">{{ snackbarMsg }}</span>
    </base-material-snackbar>
    <!---loading-->
    <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
      <v-card color="success">
        <v-card-text>
          <span class="white--text font-weight-bold"><b>请稍后，计算中...</b></span>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!---选择规格-->
    <v-dialog v-model="dialogSelect" scrollable width="400">
      <v-card>
        <v-toolbar color="info">
          <v-toolbar-title>选择常用规格</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn small class="px-2 ml-1" color="info" variant="text" @click="dialogAdd = true">
            <v-icon color="white">mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-data-table :headers="headers" :items="selections" hide-default-footer show-select v-model="selected">
        </v-data-table>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" variant="text" @click="selectedSpec()">
            确定
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialogSelect = false">
            关闭
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" align="right" variant="text" @click="delSpec()">
            删除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!---添加规格-->
    <v-dialog v-model="dialogAdd" scrollable width="300">
      <v-card>
        <v-toolbar color="info">
          <v-toolbar-title>添加常用规格</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="1"></v-col>
          <v-col cols="10">
            <v-text-field width="80%" v-model="addSpecInfo.length" label="长度" color="secondary" type="number" />
            <v-text-field width="80%" v-model="addSpecInfo.width" label="宽度" color="secondary" type="number" />
            <v-text-field width="80%" v-model="addSpecInfo.weight" label="重量" color="secondary" type="number" />
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" variant="text" @click="addSpec()">
            添加
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialogAdd = false">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as d3 from "d3";
import axios from 'axios'
export default {
  name: 'OptiAreaPage',
  components: {
    PagesBtn: () => import('../elements/Btn.vue')
  },
  data: () => ({
    dialogAdd: false,
    dialogSelect: false,
    dialog: false,
    cutWidth: 0,
    snackbar: false,
    color: "info",
    snackbarMsg: "",
    side: 0,
    selected: [],
    cutBtnDisabled: false,
    mode_data: {
      childs: [
        { length: 0, width: 0, quantity: 0, weight: 0, color: "" },
      ],
      parents: [{ length: 0, width: 0, quantity: 0, weight: 0 }],
      result: null,
      childs_for_select: null,
    },
    addSpecInfo: {
      spec_type: "ParentArea",
      length: 0,
      width: 0,
      weight: 0
    },
    selections: [],
    headers: [{
      text: '长度',
      value: 'length'
    },
    {
      text: '宽度',
      value: 'width'
    },
    {
      text: '重量',
      value: 'weight'
    }],
    colors: [
      "#FF5722", // Sun Flower
      "#E65100", // Torquise
      "#FFC107", // Orange
      "#388E3C", // Emerald
      "#DCE775", // Nephritis
      "#0277BD", // Carrot
      "#80D8FF", // Pumpkin
      "#0288D1", // Green Sea
      "#26A69A", // Peter River
      "#26C6DA", // Belize Hole
      "#651FFF", // Alizarin
      "#7E57C2", // Pomegranate
      "#5C6BC0", // Amethyst
      "#8e44ad", // Wisteria
      "#EF5350", // Clouds
      '#8E24AA', // Silver
      '#AA00FF', // Concrete <- Clouds & Silver are close
      '#2196F3', // West Asphalt <- don't use because it is very close to Midnight blue
      '#1E88E5', // Midnight Blue <- use for wasted part
      '#795548',
      '#FF9E80',
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
      '#2c3e50',
    ],
  }),
  created() {
    this.$vuetify.theme.dark = false
  },
  destroyed() {
    this.$vuetify.theme.dark = true
  },
  methods: {
    getRound: function (v, isArea) {
      if (isArea) {
        return Math.round(Math.round(parseFloat(v)) / 1000) / 1000;
      }
      return Math.round(parseFloat(v)) / 1000;
    },
    getPercentageUtilization: function (unused, used) {

      let percentage = (used * 100) / (unused + used);

      percentage *= 100; // preserve 2 digits after decimal
      percentage = Math.round(percentage); // remove the decimal part
      percentage /= 100; // back to original percentage

      return percentage;
    },
    getColor: function (color) {
      return { backgroundColor: `${color}` };
    },
    disableCutBtn: function (disabled) {
      this.cutBtnDisabled = disabled;
    },
    alertErr: function (color, msg) {
      this.snackbar = true;
      this.color = color;
      this.snackbarMsg = msg;
    },
    hoverPlan(index) {
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
    addSpec: function () {
      let url_selection = "http://124.221.185.163:5001/api/save_spec";
      let config = {
        headers: {
          access_token: $cookies.get("access_token")
        }
      };
      this.addSpecInfo.length = parseFloat(this.addSpecInfo.length);
      this.addSpecInfo.width = parseFloat(this.addSpecInfo.width);
      this.addSpecInfo.weight = parseFloat(this.addSpecInfo.weight);
      axios.post(url_selection, this.addSpecInfo, config)
        .then((response) => {
          this.dialogAdd = false;
          if (response.data.code == 0) {
            this.getSelections();
            this.selected = [];
            return
          }
          this.alertErr("error", response.data.msg);
          return
        })
        .catch((error) => {
          this.dialogAdd = false;
          this.alertErr("error", error.message);
          return false;
        });
    },
    selectSpec: function () {
      this.dialogSelect = true;
      this.getSelections();
    },
    selectedSpec: function () {
      this.dialogSelect = false;
      if (this.mode_data.parents[0].length == 0) {
        this.mode_data.parents = [];
      }
      this.selected.forEach((item) => {
        this.mode_data.parents.push({ length: item.length, width: item.width, quantity: 1, weight: item.weight });
      })
    },
    getSelections: function () {
      let url_selection = "http://124.221.185.163:5001/api/get_spec/parentArea";
      let config = {
        headers: {
          access_token: $cookies.get("access_token")
        }
      };
      axios.get(url_selection, config)
        .then((response) => {
          console.log(response);
          if (response.data.code == 0) {
            this.selections = [];
            response.data.data.forEach((data) => this.selections.push(data))
            return
          }
          this.alertErr("error", response.data.msg);
          return
        })
        .catch((error) => {
          this.alertErr("error", error.message);
          return false;
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

      // let rolls = [];
      // selectdChild.solutions.solutions.forEach((soluton) => {
      //   let subs = [];
      //   let subs_list = [];
      //   soluton.used_area = Math.round(soluton.used_area) / 1000 / 1000;
      //   soluton.used_weight = Math.round(soluton.used_weight) / 1000;
      //   soluton.unused_area = Math.round(soluton.unused_area) / 1000 / 1000;
      //   soluton.unused_weight = Math.round(soluton.unused_weight) / 1000;
      //   soluton.subs.forEach((item) => {
      //     let has = false;
      //     subs_list.forEach((sub) => {
      //       if (sub.area == (Math.round(parseFloat(item.width)) / 1000) * (Math.round(parseFloat(item.length)) / 1000)) {
      //         let w = ((Math.round(parseFloat(item.width)) / 1000) * (Math.round(parseFloat(item.length)) / 1000) / soluton.used_area) * soluton.used_weight;
      //         sub.number += 1;
      //         sub.weight += Math.round(w * 1000) / 1000;
      //         has = true;
      //       }
      //     });

      //     if (has == false) {
      //       let w = ((Math.round(parseFloat(item.width)) / 1000) * (Math.round(parseFloat(item.length)) / 1000) / soluton.used_area) * soluton.used_weight;
      //       subs_list.push({
      //         "area": (Math.round(parseFloat(item.width)) / 1000) * (Math.round(parseFloat(item.length)) / 1000),
      //         "key": (Math.round(parseFloat(item.length)) / 1000) + "X" + (Math.round(parseFloat(item.width)) / 1000),
      //         "number": 1,
      //         "weight": Math.round(w * 1000) / 1000
      //       });
      //     }

      //     let tmpItem = {
      //       x1: Math.round(parseFloat(item.x)) / 1000,
      //       y1: Math.round(parseFloat(item.y)) / 1000,
      //       x2: (Math.round(parseFloat(item.x)) / 1000) + (Math.round(parseFloat(item.width)) / 1000),
      //       y2: (Math.round(parseFloat(item.y)) / 1000) + (Math.round(parseFloat(item.length)) / 1000),
      //     }
      //     subs.push(tmpItem);
      //   });

      //   let list_str = [];
      //   subs_list.forEach((s) => {
      //     list_str.push(s.key + "*" + s.number + "/" + Math.round(parseFloat(s.weight) * 1000) / 1000);
      //   });

      //   soluton.subs_list = list_str;

      //   rolls.push(subs);
      // });

      // this.mode_data.result.solutions = rolls;

      this.displayResult();

      this.mode_data.childs_for_select[idx].solutions.solutions.computed = true;

    },
    addRowToChilds: function () {
      this.mode_data.childs.push({ length: 0, width: 0, quantity: 0, weight: 0 });
    },
    removeRowToChilds: function (index) {
      this.mode_data.childs.splice(index, 1);
    },
    addRowToParents: function () {
      this.mode_data.parents.push({ length: 0, width: 0, quantity: 0, weight: 0 });
    },
    removeRowToParents: function (index) {
      this.mode_data.parents.splice(index, 1);
    },
    prepareDataToSend2DForWeight: function (typeCut) {
      let newParents = [];
      let allWeight = 0;
      let allArea = 0;
      let subsArea = 0;
      this.mode_data.parents.forEach((parent) => {
        allArea += parseFloat(parent.width) * parseFloat(parent.length) * parseInt(parent.quantity);
        allWeight += parseFloat(parent.weight) * parseInt(parent.quantity);
        newParents.push({ "quantity": parseInt(parent.quantity), "width": parseFloat(parent.width) * 1000, "length": parseFloat(parent.length) * 1000, "weight": parseInt(parseFloat(parent.weight) * 1000) });
      });
      let unitWeight = allWeight / allArea;
      let newChilds = [];
      this.mode_data.childs.forEach((child) => {

        let area = parseFloat(child.width) * parseFloat(child.length);
        if (typeCut == "weight") {
          let quantity = parseInt(parseFloat(child.weight) / (area * unitWeight));
          child.quantity = quantity;
        }
        subsArea += area * child.quantity;

        newChilds.push({ "quantity": parseInt(child.quantity), "width": parseInt(parseFloat(child.width) * 1000), "length": parseInt(parseFloat(child.length) * 1000) });
      });

      if (subsArea >= allArea) {
        this.alertErr("error", "需要切割的数量过大，超过母板的总面积，请修改需要切割重量或数量！");
        return false;
      }

      if (subsArea >= (allArea * 0.95)) {
        this.alertErr("warning", "需要切割的数量过大，超过母板的总面积的95%，有可能会没有最优解！");
      }

      return {
        child_areas: newChilds,
        parent_areas: newParents,
        side: parseInt(parseFloat(this.cutWidth) * 1000),
        seed: Math.round(Math.random() * 10)
      };
    },
    prepareDataToSend2DForRule: function () {
      let newParents = [];
      this.mode_data.parents.forEach((parent) => {
        newParents.push({ "quantity": parseInt(parent.quantity), "width": parseFloat(parent.width) * 1000, "length": parseFloat(parent.length) * 1000, "weight": parseInt(parseFloat(parent.weight) * 1000) });
      });
      let newChilds = [];
      this.mode_data.childs.forEach((child) => {
        newChilds.push({ "width": parseInt(parseFloat(child.width) * 1000), "length": parseInt(parseFloat(child.length) * 1000) });
      });
      return {
        child_areas: newChilds,
        parent_areas: newParents,
        side: parseInt(parseFloat(this.cutWidth) * 1000),
        seed: Math.round(Math.random() * 10)
      };
    },
    sendCutSheet: function (typeCut) {
      this.clearTheDrawing();
      this.mode_data.result = null;
      this.mode_data.childs_for_select = [];
      this.cutRules = false;
      for (let index = 0; index < this.mode_data.parents.length; index++) {
        const element = this.mode_data.parents[index];
        if (element.length == null || element.length == 0) {
          this.alertErr("error", "请输入母卷的长度！");
          return false;
        }
        if (element.width == null || element.width == 0) {
          this.alertErr("error", "请输入母卷的宽度！");
          return false;
        }
        if (element.weight == null || element.weight == 0) {
          this.alertErr("error", "请输入母卷的重量！");
          return false;
        }
        if (element.quantity == null || element.quantity == 0) {
          this.alertErr("error", "请输入母卷的数量！");
          return false;
        }
      }
      for (let index = 0; index < this.mode_data.childs.length; index++) {
        const element = this.mode_data.childs[index];
        if (element.length == null || element.length == 0) {
          this.alertErr("error", "请输入子卷的长度！");
          return false;
        }
        if (element.width == null || element.width == 0) {
          this.alertErr("error", "请输入子卷的宽度！");
          return false;
        }
        if (typeCut == "weight") {
          if (element.weight == null || element.weight == 0) {
            this.alertErr("error", "请输入子卷的重量！");
            return false;
          }
        }
        if (typeCut == "quantity") {
          if (element.quantity == null || element.quantity == 0) {
            this.alertErr("error", "请输入子卷数量！");
            return false;
          }
        }
      }
      let url = 'http://124.221.185.163:5001/api/stocks_2d_by_weight';
      const dataToSend = this.prepareDataToSend2DForWeight(typeCut);
      if (dataToSend == false) {
        return
      }
      console.log(dataToSend);
      this.disableCutBtn(true);
      let config = {
        headers: {
          access_token: $cookies.get("access_token")
        }
      };
      this.dialog = true;
      axios
        .post(url, dataToSend, config)
        .then((response) => {
          console.log(response);
          this.dialog = false;
          this.disableCutBtn(false);
          if (response.data.code == 0) {
            if (response.data.data && response.data.data.status_name) {
              if (response.data.data.status_name == "Error") {
                this.alertErr("error", "服务计算超出母卷的面积，请修改子卷重量或数量后重试！");
                return false;
              }
            }
            this.mode_data.result = response.data;
            if (this.mode_data.result && this.mode_data.result.status_name) {
              this.mode_data.result.statusName =
                this.mode_data.result.status_name.toLowerCase();
            }
            this.displayResult();
            return
          }
          this.alertErr("error", response.data.msg);
        })
        .catch((error) => {
          this.dialog = false;
          console.log(error);
          this.disableCutBtn(false);
          this.alertErr("error", "连接服务失败，请检查网络");
          return false;
        });
    },
    sendCutRule: function () {
      this.clearTheDrawing();
      this.mode_data.result = null;
      this.mode_data.childs_for_select = [];
      this.cutRules = false;
      for (let index = 0; index < this.mode_data.parents.length; index++) {
        const element = this.mode_data.parents[index];
        if (element.length == null || element.length == 0) {
          this.alertErr("error", "请输入母卷的长度！");
          return false;
        }
        if (element.width == null || element.width == 0) {
          this.alertErr("error", "请输入母卷的宽度！");
          return false;
        }
        if (element.weight == null || element.weight == 0) {
          this.alertErr("error", "请输入母卷的重量！");
          return false;
        }
        if (element.quantity == null || element.quantity == 0) {
          this.alertErr("error", "请输入母卷的数量！");
          return false;
        }
      }
      for (let index = 0; index < this.mode_data.childs.length; index++) {
        const element = this.mode_data.childs[index];
        if (element.length == null || element.length == 0) {
          this.alertErr("error", "请输入子卷的长度！");
          return false;
        }
        if (element.width == null || element.width == 0) {
          this.alertErr("error", "请输入子卷的宽度！");
          return false;
        }
      }
      let url = 'http://124.221.185.163:5001/api/stocks_2d_by_area';
      const dataToSend = this.prepareDataToSend2DForRule();
      if (dataToSend == false) {
        return
      }
      console.log(dataToSend);
      this.disableCutBtn(true);
      let config = {
        headers: {
          access_token: $cookies.get("access_token")
        }
      };
      this.dialog = true;
      axios
        .post(url, dataToSend, config)
        .then((response) => {
          console.log(response);
          this.dialog = false;
          this.disableCutBtn(false);
          if (response.data.code == 0) {
            this.displayRulesResult(response);
            return
          }
          this.alertErr("error", response.data.msg);
        })
        .catch((error) => {
          this.dialog = false;
          console.log(error);
          this.disableCutBtn(false);
          this.alertErr("error", "连接服务失败，请检查网络");
          return false;
        });
    },
    displayResult: function () {
      let rolls = [];
      this.mode_data.result.data.solutions.forEach((soluton) => {
        console.log(soluton);
        let subs = [];
        let subs_list = [];
        let unit_value = 1000;
        // soluton.used_area = Math.round(soluton.used_area) / unit_value / unit_value;
        // soluton.used_weight = Math.round(soluton.used_weight) / unit_value;
        // soluton.unused_area = Math.round(soluton.unused_area) / unit_value / unit_value;
        // soluton.unused_weight = Math.round(soluton.unused_weight) / unit_value;
        soluton.subs.forEach((item) => {
          let has = false;
          subs_list.forEach((sub) => {
            if (sub.area == this.getRound(item.width, false) * this.getRound(item.length, false)) {
              let w = (this.getRound(item.width, false) * this.getRound(item.length, false) / this.getRound(soluton.used_area, true)) * this.getRound(soluton.used_weight, false);
              sub.number += 1;
              sub.weight += Math.round(w * unit_value) / unit_value;
              has = true;
            }
          });

          if (has == false) {
            let w = (this.getRound(item.width, false) * this.getRound(item.length, false) / this.getRound(soluton.used_area, true)) * this.getRound(soluton.used_weight, false);
            subs_list.push({
              "area": this.getRound(item.width, false) * this.getRound(item.length, false),
              "key": this.getRound(item.length, false) + "X" + this.getRound(item.width, false),
              "number": 1,
              "weight": Math.round(w * unit_value) / unit_value
            });
          }

          let tmpItem = {
            x1: this.getRound(item.x, false),
            y1: this.getRound(item.y, false),
            x2: this.getRound(item.x, false) + this.getRound(item.width, false),
            y2: this.getRound(item.y, false) + this.getRound(item.length, false),
          }
          subs.push(tmpItem);
        });

        let list_str = [];
        subs_list.forEach((s) => {
          list_str.push(s.key + "*" + s.number + "/" + Math.round(parseFloat(s.weight) * unit_value) / unit_value);
        });

        soluton.subs_list = list_str;

        rolls.push(subs);
      });

      this.mode_data.result.solutions = rolls;

      this.draw2d();
    },
    displayRulesResult: function (response) {
      // this.mode_data.result = response.data;
      if (response.data && response.data.status_name) {
        this.mode_data.result.statusName =
          response.data.status_name.toLowerCase();
      }
      // 赋值待选方案
      if (response.data.data.solutions && response.data.data.solutions.length > 0) {
        this.mode_data.childs_for_select = response.data.data.solutions;
      }
    },
    draw2d: function () {
      // clear old drawing
      this.clearTheDrawing();
      this.mode_data.childs.forEach((item) => {
        let j = Math.round(Math.random() * this.colors.length)
        item.color = this.colors[j];
      });

      if (!this.mode_data.result) {
        console.log(
          `Cannot draw anything. "result" is: ${this.mode_data.result} for mode: ${this.mode}`
        );
        return;
      }

      const solutions = this.mode_data.result.solutions;

      for (let i = 0; i < solutions.length; i++) {
        const sol = solutions[i];

        for (let j = 0; j < sol.length; j++) {
          const rect = sol[j];
          let x1 = parseFloat(rect.x1);
          let y1 = parseFloat(rect.y1);
          let x2 = parseFloat(rect.x2);
          let y2 = parseFloat(rect.y2);
          let tmpColor = "";
          this.mode_data.childs.forEach((item) => {
            if (((parseInt(item.width) == parseInt(y2 - y1)) && (parseInt(item.length) == parseInt(x2 - x1)))
              || ((parseInt(item.width) == parseInt(x2 - x1)) && (parseInt(item.length) == parseInt(y2 - y1)))) {
              if (tmpColor == "") {
                tmpColor = item.color;
              }
            }
          });
          this.drawRect(x1, y1, x2, y2, tmpColor, i + 1);
        }

      }
    },
    clearTheDrawing: function () {
      d3.selectAll("#d3_area_1 svg > *").remove();
      d3.select("#d3_area_1 svg").style("border", "");
      d3.selectAll("#d3_area_2 svg > *").remove();
      d3.select("#d3_area_2 svg").style("border", "");
      d3.selectAll("#d3_area_3 svg > *").remove();
      d3.select("#d3_area_3 svg").style("border", "");
      d3.selectAll("#d3_area_4 svg > *").remove();
      d3.select("#d3_area_4 svg").style("border", "");
    },
    drawRect: function (x1, y1, x2, y2, color, index) {

      // console.log("Drawing Rect... Color: ", color);
      // console.log("Draw rect", x1, y1, x2, y2);

      const width = Math.abs(parseFloat(x2) - parseFloat(x1));
      const height = Math.abs(parseFloat(y2) - parseFloat(y1));

      // const rectTitle = `${width} x ${height}`;

      const parentWidth = parseFloat(this.mode_data.parents[0].width);
      const parentHeight = parseFloat(this.mode_data.parents[0].length);
      // const dataLen = this.mode_data.parents.length;

      let xScale = d3.scaleLinear().domain([0, parentWidth]).range([0, 300]); // <- TODO here put the dynamic width of chart

      let yScale = d3.scaleLinear().domain([0, parentHeight]).range([0, 300]); // display in 300 pixels height?

      // console.log(
      //   "D3 Scaled rect",
      //   xScale(x1),
      //   yScale(y1),
      //   xScale(width),
      //   yScale(height)
      // );

      // create svg element:
      let d3_id = "#d3_area_" + index + " svg";
      let svg = d3.select(d3_id);
      console.log(svg);
      var margin = { top: 0, right: 0, bottom: 0, left: 0 };

      let svgWidth = 300 - margin.left - margin.right;
      let svgHeight = 300 - margin.top - margin.bottom;

      let g = svg
        .attr("width", svgWidth + margin.left + margin.right)
        .attr("height", svgHeight + margin.top + margin.bottom)
        .style("border", "1px solid #34495e")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Add the path using this helper function
      g
        // .data(coords)
        .append("rect")
        // .style('fill', function (coords) { return coords.color })
        .style("fill", color)
        // .style("background-color", "black")
        // .attr('x', rectX)
        .attr("x", xScale(x1)) //function (coords) { return xScale(coords.x1) })
        // .attr('y', rectY)
        .attr("y", yScale(y1)) //function (coords) {return yScale(coords.y1) })
        // .attr('width', rectW)
        .attr("width", xScale(width)) //function (coords) { return xScale(coords.width) })
        // .attr('height', rectH)
        .attr("height", yScale(height)) //function (coords) { return yScale(coords.height) })
        .attr("stroke", "#34495e")
        .text(`${width} x ${height}`);

      // add the label to the shape
      // const labelX = rectX + Math.abs( rectW / 2 - 15);
      // const labelY = rectY + Math.abs( rectH / 2 + 5);

      const labelX = xScale(x1) + Math.abs(xScale(width) / 2); // - 15);
      const labelY = yScale(y1) + Math.abs(yScale(height) / 2); // + 5);

      //   let label =
      g.append("text")
        .attr("x", labelX)
        .attr("y", labelY)
        .attr("stroke", "#34495e")
        .attr('stroke', 'black');
      // .style("font-size", 15);

      return;
    },
    downloadCsv: function () {
      if (!this.mode_data.result || !this.mode_data.result.solutions) {
        console.log("downloadCsv: bigRolls are empty..");
        return;
      }

      // prepare data
      let dataForCsv = [["序号", "有效面积", "有效重量", "使用率", "损耗面积", "损耗重量", "明细（规格*数量/重量）"]];
      let numSmallRolls = 0;

      const bigRolls = this.mode_data.result.data.solutions;
      for (let i = 0; i < bigRolls.length; i++) {
        // ['Stock #', 'Usage', 'Width of Cuts']
        const nextRow = [
          i + 1,
          bigRolls[i].used_area,
          bigRolls[i].used_weight,
          this.getPercentageUtilization(parseFloat(bigRolls[i].unused_area), parseFloat(bigRolls[i].used_area)) + "%",
          bigRolls[i].unused_area,
          bigRolls[i].unused_weight,
          bigRolls[i].subs_list.join(",")
        ];
        dataForCsv.push(nextRow);
      }
      const csvContent =
        "data:text/csv;charset=utf-8," +
        dataForCsv.map((e) => e.join(",")).join("\n");
      // console.log('csvContent: ', csvContent);

      // download the file
      let encodedUri = encodeURI(csvContent);
      // console.log('encodedUri: ', encodedUri);
      let link = document.createElement("a");
      link.setAttribute("href", encodedUri);

      // unique and identifiable filename
      const d = new Date();
      const dateString = `${d.getFullYear()}-${d.getMonth() + 1
        }-${d.getUTCDate()}-${d.getHours()}${d.getMinutes()}-${d.getSeconds()}`;

      const filename = `cuts_${numSmallRolls}_${dateString}.csv`;
      link.setAttribute("download", filename);

      document.body.appendChild(link); // Required for FF
      link.click(); // This will download the data file named "my_data.csv".
    },
  }
}
</script>
