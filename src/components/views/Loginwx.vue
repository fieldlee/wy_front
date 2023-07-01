<template>
  <v-container id="lock" fill-height tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <v-card class="mt-6 mt-md-0" light max-width="100%" width="250">
          <v-card-text class="text-center">
            <v-avatar class="mt-n12 mb-6 elevation-12" color="grey" size="88">
              <v-icon color="success" size="88">mdi-wechat</v-icon>
            </v-avatar>

            <div class="display-1 font-weight-light mb-3 text--darken-3 grey--text">
              登录中...
            </div>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import { wxLogin } from "../../utils/api";
export default {
  name: 'WXLogin',
  mounted() {
    this.getWxCode();
  },
  data: function () {
    return {

    }
  },
  computed: {

  },
  methods: {
    getWxCode() {
      let code = this.$urlParse.getUrlKey("code")
      console.log(code);
      let state = this.$urlParse.getUrlKey("state")
      console.log(state);
      wxLogin({
        "code":code,
        "state":state,
      }).then(response => {
        // 获取数据成功后的其他操作
        console.log(response);
      }).catch((error) => {
        console.log("Network/Server error");
        console.error(error);
      });
    },
  }
}
</script>
