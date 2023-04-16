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
              <v-btn v-for="(social, i) in socials" :key="i" :disabled="social.disabled"
                :color="social.type == getTypeColor() ? '#66BB6A' : '#81C784'" class="ma-1" rel="noopener" depressed
                rounded @click="setLoginType(social.type)">
                <v-icon v-text="social.icon" />
              </v-btn>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-row>
              <v-col cols="12" v-if="loginType == 'account'">
                <v-text-field color="secondary" label="账号..." :rules="usernameValidation" v-model="loginName"
                  prepend-icon="mdi-account-outline" class="mt-10" />
                <div align="right">
                  <span class="font-weight-light" style="font-size: 12px; color: #3c4858" align="right">
                    <a :href="'#'" @click="setLoginType('phoneOrmail')" rel="noopener" class="secondary--text"
                      style="text-decoration:none;">
                      忘记账号
                    </a>
                  </span>
                </div>
              </v-col>
              <v-col cols="12" v-if="loginType != 'account'">
                <v-text-field color="secondary" label="手机号或邮箱..." v-model="phoneOrmail" :rules="emailValidation"
                  prepend-icon="mdi-file-phone-outline" />
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
            <!--
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
          -->

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
import {getCaptcha,reqLogin} from "../../utils/api";

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
          icon: 'mdi-file-phone-outline',
          type: "phoneOrmail",
          disabled: true,
        },
        {
          href: '#',
          icon: 'mdi-account',
          type: "account",
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
    setLoginType: function (type) {
      this.loginType = type;
      if (this.loginType == "account") {
        this.socials[0].disabled = false;
        this.socials[1].disabled = true;
      } else {
        this.socials[0].disabled = true;
        this.socials[1].disabled = false;
      }
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

      // let url_phone_login = "http://150.158.76.64:5000/api/login_phone";
      // let url_phone_email = "http://150.158.76.64:5000/api/login_email";

      if (this.loginType === "account") {
        let login_data = {
          "username": this.loginName,
          "password": this.loginPassword,
          "vcode": this.loginImgCode,
          "uuid": this.loginuuid
        };
        // 手机或邮箱登录
        if (this.loginType != "account") {
          if (this.checkInput(this.phoneOrmail) == "phone") {
            login_data = {
              "phone": this.phoneOrmail,
              "password": this.loginPassword,
              "vcode": this.loginImgCode,
              "uuid": this.loginuuid
            }
          }
          if (this.checkInput(this.phoneOrmail) == "email") {
            login_data = {
              "email": this.phoneOrmail,
              "password": this.loginPassword,
              "vcode": this.loginImgCode,
              "uuid": this.loginuuid
            }
          }
        }
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
}
</script>
