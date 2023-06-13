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
              <v-btn-toggle v-model="loginType" color="deep-purple-accent-3" variant="outlined" divided rounded>
                <v-btn v-for="(social, i) in socials" :key="i" :value="social.type" color="success">
                  <v-icon start size="default" v-text="social.icon" />
                  {{ social.text }}
                </v-btn>
              </v-btn-toggle>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-row>
              <v-col cols="12" v-if="loginType == 'account'">
                <v-text-field color="secondary" label="账号..." :rules="usernameValidation" v-model="loginName"
                  prepend-icon="mdi-account-outline" />
              </v-col>
              <v-col cols="12" v-if="loginType == 'email'">
                <v-text-field color="secondary" label="邮箱..." v-model="logineMail" :rules="emailValidation"
                  prepend-icon="mdi-email" />
              </v-col>
              <v-col cols="12" v-if="loginType == 'phone'">
                <v-text-field color="secondary" v-model="loginPhone" minLength="11" maxLength="11" label="手机号..."
                  prepend-icon="mdi-phone" :rules="emailValidation" />
              </v-col>
              <v-col cols="12">
                <v-text-field label="密码..." :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordValidation"
                  :type="show ? 'text' : 'password'" color="secondary" v-model="loginPassword"
                  prepend-icon="mdi-lock-outline" @click:append.prevent="show = !show" />
                <div align="right">
                  <span class="font-weight-light" style="font-size: 12px; color: #3c4858" align="right">
                    <a :href="`/pages/forget`" rel="noopener" class="secondary--text" style="text-decoration:none;">
                      忘记密码
                    </a>
                  </span>
                </div>
              </v-col>
              <v-col cols="8">
                <v-text-field color="secondary" v-model="loginImgCode" label="图片验证码..." :rules="codeValidation"
                  prepend-icon="mdi-alert-decagram" />
              </v-col>
              <v-col cols="4">
                <v-img :src="this.base64image" @click="reloadImg()" height="40" width="120" contain></v-img>
                <div align="right">
                  <span class="font-weight-light" style="font-size: 8px; color: #3c4858" align="right">
                    <a :href="'#'" @click="reloadImg()" rel="noopener" class="secondary--text"
                      style="text-decoration:none;">
                      点击刷新
                    </a>
                  </span>
                </div>
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
    <base-material-snackbar v-model="snackbar" :type="color" v-bind="{
      top: true,
      center: true
    }">
      <span class="font-weight-bold">{{ snackbarMsg }}</span>
    </base-material-snackbar>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { getCaptcha, reqLogin } from "../../utils/api";

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
      logined: false,
      show: false,
      isShowSlide: false,
      phoneOrmail: "",
      loginName: "",
      loginPassword: "",
      loginPhone: "",
      logineMail: "",
      loginValidCode: "",
      loginImgCode: "",
      loginType: "account",
      loginuuid: "",
      base64image: "",
      snackbar: false,
      color: "info",
      snackbarMsg: "",
      socials: [
        {
          href: '#',
          icon: 'mdi-phone',
          type: "phone",
          text: "手机",
          disabled: true,
        },
        {
          href: '#',
          icon: 'mdi-email',
          type: "email",
          text: "邮箱",
          disabled: true,
        },
        {
          href: '#',
          icon: 'mdi-account',
          type: "account",
          text: "账号",
          disabled: false,
        }
      ]
    }
  },
  computed: {
    usernameValidation: function () {
      return [value => this.checkLen_forValidate(value, 6) || "账号名称至少6位"]
    },
    codeValidation: function () {
      return [value => this.checkLen_forValidate(value, 4) || "验证码至少4位"]
    },
    emailValidation: function () {
      return [value => this.checkInput_forValidate(value) || "手机号或邮箱格式不对"]
    },
    passwordValidation: function () {
      return [value => this.checkLen_forValidate(value, 6) || "密码至少6位"]
    }
  },
  methods: {
    checkLen_forValidate: function (str, num) {
      if (str && str.length < num) {
        return false;
      }
      return true;
    },
    checkInput_forValidate: function (str) {
      const phoneReg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
      const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
      if (phoneReg.test(str)) {
        return true;
      }
      if (emailReg.test(str)) {
        return true;
      }
      return false;
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
    reloadImg: function () {
      this.getImage();
    },
    getImage: function () {
      let url = '/captcha/' + this.loginuuid;
      getCaptcha(url, {}).then(response => {
        // 获取数据成功后的其他操作
        console.log(response);
        this.base64image = "data:image/png;base64," + response.data;
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
    checkInput: function (str) {
      const phoneReg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
      const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
      if (phoneReg.test(str)) {
        return 'phone';
      }
      if (emailReg.test(str)) {
        return 'email';
      }
      return '手机号码或邮箱格式不正确，请重新填写';
    },
    login: function () {
      let login_data = {};
      if (this.loginType === "account") {
        login_data = {
          "username": this.loginName,
          "password": this.loginPassword,
          "vcode": this.loginImgCode,
          "uuid": this.loginuuid
        };
      }
        // 手机或邮箱登录
        if (this.loginType == "email") {
          login_data = {
            "email": this.logineMail,
            "password": this.loginPassword,
            "vcode": this.loginImgCode,
            "uuid": this.loginuuid
          };
        }

      if (this.loginType == "phone") {
        login_data = {
          "phone": this.loginPhone,
          "password": this.loginPassword,
          "vcode": this.loginImgCode,
          "uuid": this.loginuuid
        };
      }

      console.log(login_data);

      reqLogin(login_data).then((response) => {
        if (response.code == 0) {
          this.$cookies.set("access_token", response.data.access_token);
          this.$store.commit("setToken", response.data.access_token);
          this.$store.commit("setUserName", response.data.user.account);
          this.$store.commit("setUserType", response.data.user.user_type);
          this.$store.commit("setUserStatus", true);
          this.logined = true;
          this.$emit('func', this.logined);
          this.$router.replace('/pages/opti1d');
          return
        }
        this.alertErr(true, response.msg);
        return
      }).catch((error) => {
        console.log("Network/Server error");
        console.error(error);
        this.alertErr(true, error);
        return
      });
    }
}
}
</script>
