<template>
  <v-container id="login" fill-height tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card color="success" light max-width="100%" width="450" class="px-5 py-3">
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-3">
                登录
              </h1>
            </div>
          </template>
          <v-card-text class="text-center">
            <v-row>
              <v-col cols="12">
                <div id="wxcode"></div>
              </v-col>
            </v-row>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  name: 'PagesLogin',

  components: {
    PagesBtn: () => import('../elements/Btn'),
  },
  mounted() {
    this.createWxQrcode();
  },
  data: function () {
    return {
      logined: false,
      show: false,
      isShowSlide: false,
    }
  },
  computed: {

  },
  methods: {
    createWxQrcode() {
      // 生成微信登录二维码
      var obj = new WxLogin({
        self_redirect: true,
        id: "wxcode", // 页面显示二维码的容器id
        appid: "wxbdc5610cc59c1631", // 微信官方提供的测试id
        scope: "snsapi_login",
        redirect_uri: encodeURI("https://passport.yhd.com/wechat/login.do"), // 微信官方中的测试地址
        state: "bind",
        style: "black",
        href: "",
      });
    },

    alertErr: function (error, msg) {
      this.snackbar = true;
      if (error === true) {
        this.color = 'error';
      } else {
        this.color = 'info';
      }
      this.snackbarMsg = msg;
    }
}
}
</script>
