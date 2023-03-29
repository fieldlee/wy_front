<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">

        <base-material-card icon="mdi-earth" color="pink" title="全球最好的切割解决方案">

          <v-row>
            <v-col cols="6" md="6" class="mt-10" background="/title.jpeg">
              <v-card-title class="justify-center display-2 font-weight-bold pt-5 white--text">
                易于使用的切割优化软件
              </v-card-title>

              <div class="text-center display-1 grey--text font-weight-bold mb-6">
                板材、钢卷、纸卷等一切切割分条分块的最小损耗解决方案，大大提升材料利用率
              </div>
              <div class="pa-3 text-center">
                  <v-btn
                  class="ma-1 justify-center"
                  color="pink"
                  rounded
                  large
                  align="center"
                  @click="router2Opti()"
                >
                  <v-icon left>
                    mdi-heart
                  </v-icon>
                  试一试
                </v-btn>
              </div>

            </v-col>


            <v-col cols="12" md="6">
              <v-world-map :country-data="countryData" high-color="#BBBBBB" low-color="RED"  />
            </v-col>
          </v-row>
        </base-material-card>

      </v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-row class="text-center">
          <v-col cols="12" sm="6" lg="3">
            <base-material-stats-card hover-reveal color="info" icon="mdi-twitter" title="免费试用" value=""
              sub-text="提供全功能试用切割优化或线性切割计算器,计算结果下载提供表格下载，帮您解决记录的数据麻烦。" />
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <base-material-stats-card hover-reveal color="purple" icon="mdi-poll" title="算法精妙" value=""
              sub-text="求解引擎使用多种优化算法，因此最终的切割计划包含最小的浪费和最大的材料产量。我们帮你省了很多钱。" />
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <base-material-stats-card hover-reveal color="orange" icon="mdi-sofa" title="云服务器" value=""
              sub-text="在线运行在云中的高性能服务器上，具有强大的计算能力，因此您可以非常快速地得到结果。" />
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <base-material-stats-card hover-reveal color="success" icon="mdi-store" title="无需安装" value=""
              sub-text="无论您使用什么类型的设备或操作系统，都不需要安装任何软件，独立于设备和操作系统的。" />
          </v-col>

          <v-col cols="12" sm="6" lg="3">
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <base-material-stats-card hover-reveal color="#7B1FA2" icon="mdi-lock" title="隐私保护" value=""
              sub-text="不记录保存计算的数据，保护公司和个人业务隐私。个人信息加密存储绝不会泄露任何信息。" />
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <base-material-stats-card hover-reveal color="#303F9F" icon="mdi-widgets" title="持续更新" value=""
              sub-text="您不会被过时的应用程序困住。保持在线运行，并定期更新，因此您不必为未来的升级付费或一次又一次地安装新的更新包。" />
          </v-col>
          <v-col cols="12" sm="6" lg="3">
          </v-col>
        </v-row>

      </v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="1"></v-col>
      <v-col align="center" cols="10">
        <base-material-card  icon="mdi-account-multiple-plus" title="会员信息">
          <v-row align="center" class="text-center" justify="center">
            <template v-for="(plan, i) in plans">
              <v-col class="d-flex" cols="12" sm="6" md="3" @mouseover="hoverPlan(i)">
                <pages-plan-card  :plan="plan" />
              </v-col>

              <v-col v-if="(i === 1 && $vuetify.breakpoint.smAndDown) && i + 1 !== plans.length" :key="`divider-${i}`"
                class="pa-6" cols="12">
                <v-divider />
              </v-col>
            </template>
          </v-row>
        </base-material-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <v-row>
      <v-col cols="1"></v-col>
      <v-col
        cols="10"
      >
        <base-material-card
          color="#00838F"
          icon="mdi-message-text"
          title="联系我们"
          class="px-5 py-3"
        >
          <v-form>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="您的邮箱"
                  outlined
                  class="ml-4"
                  />
              </v-col>

              <v-col cols="6">
                <v-text-field
                label="您的电话"
                outlined
                class="ml-4"
              />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="您的意见"
                  value=""
                />
              </v-col>

              </v-row>
          </v-form>

          <div class="pa-3 text-center">
            <v-card-actions class="ma-1 justify-center">
              <v-btn
                color="#00838F"
                min-width="100"
                class="ma-1 justify-center"
              >
                请收下我的反馈
              </v-btn>
          </v-card-actions>
          </div>

        </base-material-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PagesPricing',

  components: {
    PagesPlanCard: () => import('../elements/PlanCard')
  },

  data: () => ({
    countryData: {
      CN: 100,
      US: 4999,
      CA: 5000,
    },
    plans: [
      {
        best: false,
        heading: '季度会员',
        icon: 'mdi-sofa',
        title: '299',
        text: ''
      },
      {
        best: false,
        heading: '半年会员',
        icon: 'mdi-home',
        title: '499',
        text: ''
      },
      {
        best: true,
        heading: '年度会员',
        icon: 'mdi-domain',
        title: '799',
        text: '强烈推荐'
      },
      {
        best: false,
        heading: '终身会员',
        icon: 'mdi-bank',
        title: '1999',
        text: ''
      }
    ]
  }),
  methods: {
    router2Opti() {
      this.$router.replace('/pages/opti1d');
    },
    hoverPlan(index) {
      console.log(index);
      let i = 0;
      this.plans.forEach((item) => {
        if (index === i) {
          item.best = true;
        } else {
          item.best = false;
        }
        i++;
      });
    }
  }
}
</script>
