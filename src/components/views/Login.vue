<template>
  <v-container id="login" fill-height tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card color="success" light max-width="100%" width="400" class="px-5 py-3">
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                登录
              </h1>
              <v-btn v-for="(social, i) in socials" :key="i" :color="social.type == getTypeColor() ? '#66BB6A' : '#81C784'"
                class="ma-1" rel="noopener" depressed rounded @click="setLoginType(social.type)">
                <v-icon v-text="social.icon" />
              </v-btn>
            </div>
          </template>

          <v-card-text class="text-center">

            <div v-if="loginType == 'account'">
              <v-text-field color="secondary" label="账号..." prepend-icon="mdi-account-outline" class="mt-10" />
              <v-text-field class="mb-8" color="secondary" label="密码..." type="password"
                prepend-icon="mdi-lock-outline" />
            </div>

            <v-row v-if="loginType == 'phone'">
              <v-col cols="12">
                <v-text-field color="secondary" label="手机号..." prepend-icon="mdi-phone" />
              </v-col>

              <v-col cols="8">
                <v-text-field color="secondary" label="验证码..." prepend-icon="mdi-alert-decagram" />
              </v-col>
              <v-col cols="4">
                <template v-slot:image>
                  <v-img v-if="this.imageUrl" :src="this.imageUrl" contain alt="点击重新加载"/>
                </template>
              </v-col>
              <v-col cols="12">
                <v-text-field color="secondary" label="验证码..." prepend-icon="mdi-alert-box" />
              </v-col>
            </v-row>

            <v-row v-if="loginType == 'email'">
              <v-col cols="12">
                <v-text-field color="secondary" label="邮箱..." prepend-icon="mdi-email" />
              </v-col>
              <v-col cols="8">
                <v-text-field color="secondary" label="验证码..." prepend-icon="mdi-alert-decagram" />
              </v-col>
              <v-col cols="4">
                <template v-slot:image>
                  <v-img :src="this.imageUrl" contain alt="点击重新加载"/>
                </template>
              </v-col>
              <v-col cols="12">
                <v-text-field color="secondary" label="验证码..." prepend-icon="mdi-alert-box" />
              </v-col>
            </v-row>
            <pages-btn large color="" depressed class="v-btn--text success--text">
              登录
            </pages-btn>
            <div class="text-center grey--text body-1 font-weight-light">
              <a :href="'/pages/register'" rel="noopener" class="secondary--text" style="text-decoration:none;">
                还没有账号，注册一个
              </a>
            </div>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
export default {
  name: 'PagesLogin',

  components: {
    PagesBtn: () => import('../elements/Btn')
  },

  created() {

  },

  data: function () {
    return {
      loginType: "account",
      loginuuid: uuidv4().toString(),
      imageUrl: "",
      base64imageUrl: 'http://150.158.76.64:5000/api/captcha/png/',
      socials: [
        {
          href: '#',
          icon: 'mdi-email',
          type: "email",
        },
        {
          href: '#',
          icon: 'mdi-phone',
          type: "phone",
        },
        {
          href: '#',
          icon: 'mdi-account',
          type: "account",
        }
      ]
    }
  },
  methods: {
    setLoginType: function (type) {
      this.loginType = type;
      if (this.loginType !== 'account') {
        this.imageUrl = this.base64imageUrl + this.loginuuid;
        console.log(this.imageUrl);
      }
    },
    // getImage: function (){
    //   let loginuuid = uuidv4().toString();
    //   let url = 'http://150.158.76.64:5000/api/captcha/png/'+loginuuid;
    //   axios.get(url).then((response) => {
    //         this.base64image = "data:image/png;base64,"+response.data.data.toString();
    //         console.log(this.base64image);
    //       }).catch((error) => {
    //         console.log("Network/Server error");
    //         console.error(error);
    //       });
    // },
    getTypeColor: function () {
      if (this.loginType === undefined) {
        return "account";
      }
      return this.loginType;
    }
  }
}
</script>
