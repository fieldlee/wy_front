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
              <v-btn v-for="(social, i) in socials" :key="i"
                :color="social.type == getTypeColor() ? '#66BB6A' : '#81C784'" class="ma-1" rel="noopener" depressed
                rounded @click="setLoginType(social.type)">
                <v-icon v-text="social.icon" />
              </v-btn>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-row v-if="loginType == 'account'">
              <v-col cols="12">
                <v-text-field color="secondary" label="账号..." v-model="loginName" prepend-icon="mdi-account-outline"
                  class="mt-10" />
              </v-col>
              <v-col cols="12">
                  <v-text-field  label="密码..." :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'" color="secondary" v-model="loginPassword"
                    prepend-icon="mdi-lock-outline" @click:append.prevent="show = !show" />
              </v-col>
              <v-col cols="8">
                <v-text-field color="secondary" v-model="loginImgCode" label="图片验证码..."
                  prepend-icon="mdi-alert-decagram" />
              </v-col>
              <v-col cols="4">
                <v-img :src="this.base64image" height="40" contain></v-img>
              </v-col>
            </v-row>

            <v-row v-if="loginType == 'phone'">
              <v-col cols="12">
                <v-text-field color="secondary" v-model="loginPhone" minLength="11" maxLength="11" label="手机号..."
                  prepend-icon="mdi-phone" />
              </v-col>

              <v-col cols="8">
                <v-text-field color="secondary" v-model="loginImgCode" label="图片验证码..."
                  prepend-icon="mdi-alert-decagram" />
              </v-col>
              <v-col cols="4">
                <v-img :src="this.base64image" height="40" contain></v-img>
              </v-col>
              <v-col cols="8">
                <v-text-field color="secondary" v-model="loginValidCode" label="验证码..." prepend-icon="mdi-alert-box" />
              </v-col>
              <v-col cols="4">
                <v-btn :color="'#66BB6A'" class="ma-1" rel="noopener" depressed rounded @click="sendValidCode()">
                  验证码
                </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="loginType == 'email'">
              <v-col cols="12">
                <v-text-field color="secondary" v-model="logineMail" type="email" label="邮箱..."
                  prepend-icon="mdi-email" />
              </v-col>
              <v-col cols="8">
                <v-text-field color="secondary" v-model="loginImgCode" label="图片验证码..."
                  prepend-icon="mdi-alert-decagram" />
              </v-col>
              <v-col cols="4">
                <v-img :src="this.base64image" height="40" contain></v-img>
              </v-col>
              <v-col cols="8">
                <v-text-field color="secondary" v-model="loginValidCode" label="验证码..." prepend-icon="mdi-alert-box" />
              </v-col>
              <v-col cols="4">
                <v-btn :color="'#66BB6A'" class="ma-1" rel="noopener" depressed rounded @click="sendEmail()">
                  验证码
                </v-btn>
              </v-col>
            </v-row>
            <pages-btn large color="" @click="login()" depressed class="v-btn--text success--text">
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
    PagesBtn: () => import('../elements/Btn'),
  },

  created() {
    this.loginuuid = uuidv4();
    this.getImage();
  },

  data: function () {
    return {
      show: false,
      isShowSlide: false,
      loginName: "",
      loginPassword: "",
      loginPhone: "",
      logineMail: "",
      loginValidCode: "",
      loginImgCode: "",
      loginType: "account",
      loginuuid: "",
      base64image: "",
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
        this.getImage();
      }
    },
    getImage: function () {
      let url = 'http://150.158.76.64:5000/api/captcha/' + this.loginuuid;
      axios.get(url).then((response) => {
        console.log(response);
        this.base64image = "data:image/png;base64," + response.data.data;
        console.log(this.base64image);
      }).catch((error) => {
        console.log("Network/Server error");
        console.error(error);
      });
    },
    getTypeColor: function () {
      if (this.loginType === undefined) {
        return "account";
      }
      return this.loginType;
    },
    sendEmail: function () {
      console.log("send email to ====");
    },
    sendValidCode: function () {
      console.log("send sendValidCode to ====");
    },
    login: function () {

      let url_phone_login = "http://150.158.76.64:5000/api/login_phone";
      let url_phone_email = "http://150.158.76.64:5000/api/login_email";

      if (this.loginType === "account") {
        let url_login = 'http://150.158.76.64:5000/api/login';
        let login_data = {
          "username": this.loginName,
          "password": this.loginPassword,
          "vcode": this.loginImgCode,
          "uuid": this.loginuuid
        };
        axios.post(url_login, login_data).then((response) => {
          console.log(response);
          console.log(response.data.data.access_token);
          this.$cookies.set("access_token",response.data.data.access_token);
          this.$router.replace('/pages/opti1d');
        }).catch((error) => {
          console.log("Network/Server error");
          console.error(error);
        });
      }

    }
  }
}
</script>
