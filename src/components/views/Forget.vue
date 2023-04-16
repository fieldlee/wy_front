<template>
  <v-container id="login" fill-height tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card color="warning" light max-width="100%" width="400" class="px-5 py-3">
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                忘记密码
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-row v-if="loginType == 'account'">
              <v-col cols="12">
                <v-text-field color="secondary" label="手机号或邮箱..." v-model="phoneOrmail" :rules="emailValidation"  prepend-icon="mdi-file-phone-outline"  />
              </v-col>

              <v-col cols="8">
                <v-text-field color="secondary" v-model="imgCode" label="图片验证码..."
                :rules="codeValidation" prepend-icon="mdi-alert-decagram" />
              </v-col>
              <v-col cols="4">
                <v-img :src="this.base64image" @click="reloadImg()" height="40"  width="120" contain></v-img>
                <div align="right">
                  <span class="font-weight-light" style="font-size: 8px; color: #3c4858" align="right">
                    <a :href="'#'" @click="reloadImg()" rel="noopener" class="secondary--text"
                      style="text-decoration:none;">
                      点击刷新
                    </a>
                  </span>
                </div>
              </v-col>

              <v-col cols="8">
                <v-text-field color="secondary" v-model="validCode" label="验证码..."
                :rules="codeValidation" prepend-icon="mdi-alert-decagram" />
              </v-col>
              <v-col cols="4" text-center>
                <v-btn small class="ma-1" color="warning" depressed @click="sendValidCode()">
                  {{ this.codeMsg }}
                </v-btn>
              </v-col>

              <v-col cols="12">
                  <v-text-field  label="密码..." :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordValidation"
                    :type="show ? 'text' : 'password'" color="secondary" v-model="loginPassword"
                    prepend-icon="mdi-lock-outline" @click:append.prevent="show = !show" />
              </v-col>

              <v-col cols="12">
                  <v-text-field  label="密码..." :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordValidation"
                    :type="show2 ? 'text' : 'password'" color="secondary" v-model="reloginPassword"
                    prepend-icon="mdi-lock-outline" @click:append.prevent="show2 = !show2" />
              </v-col>

            </v-row>

            <pages-btn large color="warning" @click="reset()" depressed class="v-btn--text white--text">
              修改密码
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
import {getCaptcha,reqSendSms,reqUpdatePswd,reqSendEmail} from '../../utils/api';

export default {
  name: 'Forget',

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
      show2: false,
      loginPassword: "",
      reloginPassword: "",
      phoneOrmail: "",
      imgCode: "",
      validCode: "",
      loginType: "account",
      loginuuid: "",
      base64image: "",
      snackbar: false,
      color: "info",
      snackbarMsg: "",
      codeMsg: "验证码",
      validCodeBtn: false
    }
  },
  computed: {
    emailValidation: function () {
      return [value => this.checkInput_forValidate(value) || "手机号或邮箱格式不对"]
    },
    passwordValidation: function () {
      return [value => this.checkLen_forValidate(value,6) || "密码至少6位"]
    },
    codeValidation: function () {
      return [value => this.checkeqLen_forValidate(value,4) || "验证码4位"]
    }
  },
  methods: {
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
    checkLen_forValidate: function (str,num) {
      if (str && str.length < num){
        return false;
      }
      return true;
    },
    checkeqLen_forValidate: function (str,num) {
      if (str && str.length == num){
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
    reloadImg: function(){
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
    sendValidCode: function () {

      this.validCodeBtn = true; // 验证码按钮失效

      if (this.checkInput(this.phoneOrmail) == "phone") {
        let phone_obj = {
            "phone": this.phoneOrmail,
            "vcode": this.imgCode,
            "uuid": this.loginuuid
        }
        reqSendSms(phone_obj).then((response) => {
          this.alertErr(false, "验证码已发送到您的手机，请查收并输入验证码！");
          return
        }).catch((error) => {
          this.alertErr(true, error);
          return
        });
      }
      if (this.checkInput(this.phoneOrmail) == "email") {
        let email_obj = {
            "email": this.phoneOrmail,
            "vcode": this.imgCode,
            "uuid": this.loginuuid
        }
        reqSendEmail(email_obj).then((response) => {
          this.alertErr(false, "验证码已发送到您的邮箱，请查收并输入验证码！");
          return
        }).catch((error) => {
          this.alertErr(true, error);
          return
        });
      }
    },
    reset: function () {
        let reset_data = {
            "email": "",
            "phone": "",
            "code": this.validCode,
            "password": this.loginPassword
        };

        if (this.checkInput(this.phoneOrmail) == "email") {
          reset_data = {
            "email": this.phoneOrmail,
            "code": this.validCode,
            "password": this.loginPassword
          }
        }
        if (this.checkInput(this.phoneOrmail) == "phone") {
          reset_data = {
            "phone": this.phoneOrmail,
            "code": this.validCode,
            "password": this.loginPassword
          }
        }

        reqUpdatePswd(reset_data).then((response) => {
          if (response.code == 0) {
            this.alertErr(false, "密码已修改，请重新登录！");
            this.$router.replace('/pages/login');
            return
          }
          this.alertErr(true, response.msg);
          return
        }).catch((error) => {
          this.alertErr(true, error);
          return
        });
    }
  }
}
</script>
