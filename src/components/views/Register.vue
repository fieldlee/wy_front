<template>
  <v-container id="register" fill-height tag="section">
    <v-form ref="registerForm">
      <v-row justify="center">
      <v-col cols="9">
        <v-slide-y-transition appear>

          <v-card class="pa-3 pa-md-5 mx-auto" light>
            <pages-heading class="text-center display-3">
              注册账号
            </pages-heading>

            <v-row>
              <v-col cols="12" md="6">
                <v-row no-gutters>
                  <v-col v-for="(section, i) in sections" :key="i" cols="12">
                    <v-list-item three-line>
                      <v-list-item-icon class="mr-4 mt-5 mt-md-4">
                        <v-icon :large="$vuetify.breakpoint.mdAndUp" :color="section.iconColor" v-text="section.icon" />
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title class="font-weight-light mb-4 mt-3" v-text="section.title" />

                        <v-list-item-subtitle v-text="section.text" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-col>


              <v-col cols="12" md="6">
                <div class="text-center">
                  <v-btn v-for="(social, i) in socials" :key="i" :color="social.iconColor" class="my-2 mr-1" dark
                    depressed fab small>
                    <v-icon v-text="social.icon" />
                  </v-btn>

                  <div class="my-2" />

                  <v-text-field color="secondary" label="用户名..." v-model="account" :rules="usernameValidation" prepend-icon="mdi-account" />

                  <v-text-field color="secondary" label="手机号或邮箱..." v-model="phoneOrmail" :rules="emailValidation"  prepend-icon="mdi-file-phone-outline"  />

                  <v-text-field label="密码..." :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordValidation"
                    :type="show ? 'text' : 'password'" color="secondary" v-model="password"
                    prepend-icon="mdi-lock-outline" @click:append.prevent="show = !show" />
                  <v-text-field label="密码..." :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordValidation"
                    :type="show2 ? 'text' : 'password'" color="secondary" v-model="repassword"
                    prepend-icon="mdi-lock-outline" @click:append.prevent="show2 = !show2" />
                  <v-row>
                    <v-col cols="8">
                      <v-text-field color="secondary" v-model="loginImgCode" label="图片验证码..."
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

                  <pages-btn color="success" @click="register()">
                    注册
                  </pages-btn>
                  <br />
                  <v-btn class="mb-8" color="#F48FB1" dark text @click="gotoLogin()">
                    已有账号了，请登录
                  </v-btn>

                </div>
              </v-col>

            </v-row>
          </v-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    </v-form>

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
import axios from 'axios'
export default {
  name: 'PagesRegister',

  components: {
    PagesBtn: () => import('../elements/Btn'),
    PagesHeading: () => import('../elements/Heading')
  },

  data: () => ({
    account: null,
    phoneOrmail: null,
    password: null,
    repassword: null,
    show: false,
    show2: false,
    snackbar: false,
    color: "info",
    snackbarMsg: "",
    base64image: "",
    loginuuid: "",
    loginImgCode: "",
    sections: [
      {
        icon: 'mdi-chart-timeline-variant',
        iconColor: 'primary',
        title: '持续更新',
        text: `您不会被过时的应用程序困住。保持在线运行，并定期更新，因此您不必为未来的升级付费或一次又一次地安装新的更新包。`
      },
      {
        icon: 'mdi-code-tags',
        iconColor: 'secondary',
        title: '数据隐私',
        text: `不记录保存计算的数据，保护公司和个人业务隐私。个人信息加密存储绝不会泄露任何信息。`
      },
      {
        icon: 'mdi-account-multiple',
        iconColor: 'cyan',
        title: '专业团队',
        text: '专业工程师将第一时间保障服务正常运行，快速、高效解决您的需求'
      }
    ],
    socials: [
      {
        href: '#',
        icon: 'mdi-email',
        iconColor: '#1DA1F2'
      },
      {
        href: '#',
        icon: 'mdi-phone',
        iconColor: '#ea4c89'
      },
      {
        href: '#',
        icon: 'mdi-account',
        iconColor: '#3B5998'
      }

    ]
  }),
  created() {
    this.loginuuid = uuidv4();
    this.getImage();
  },
  computed: {
    usernameValidation: function () {
      return [value => this.checkLen_forValidate(value) || "账号名称至少6位"]
    },
    emailValidation: function () {
      return [value => this.checkInput_forValidate(value) || "手机号或邮箱格式不对"]
    },
    passwordValidation: function () {
      return [value => this.checkLen_forValidate(value) || "密码至少6位"]
    }
  },
  methods: {
    checkLen_forValidate: function (str) {
      if (str && str.length < 6){
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
    gotoLogin: function () {
      this.$router.replace('/pages/login');
    },
    reloadImg: function(){
      this.getImage();
    },
    getImage: function () {
      let url = 'http://127.0.0.1:5001/api/captcha/' + this.loginuuid;
      axios.get(url).then((response) => {
        console.log(response);
        this.base64image = "data:image/png;base64," + response.data.data;
        console.log(this.base64image);
      }).catch((error) => {
        console.log("Network/Server error");
        console.error(error);
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
    },

    register: function () {
      if ((this.account == null || this.account == '' || this.account.length < 6 )) {
        this.alertErr(true, "请输入您的账号,账号至少6位");
        return
      }

      if ((this.password != null || this.password != "") && (this.password.length >= 6)) {
        if (!(this.password == this.repassword)) {
          this.alertErr(true, "两次密码输入不同，请修改您的密码");
          return
        }
      } else {
        this.alertErr(true, "请修改您的密码,密码最少6位。");
        return
      }

      let register = {
        "account": this.account,
        "pwd": this.password,
        "phone": "",
        "email": "",
        "register_type": "Password",
        "uuid": this.loginuuid,
        "code":this.loginImgCode
      };

      if (this.checkInput(this.phoneOrmail) == "phone" || this.checkInput(this.phoneOrmail) == "email") {
        if (this.checkInput(this.phoneOrmail) == "phone") {
          register.phone = this.phoneOrmail
        }
        if (this.checkInput(this.phoneOrmail) == "email") {
          register.email = this.phoneOrmail
        }
      } else {
        this.alertErr(true, "手机号或邮箱地址格式错误，请修正");
        return
      }

      let check_url = "http://127.0.0.1:5001/api/check_keys";
      let check_obj = {
        "account": this.account
      };
      axios.post(check_url, check_obj).then((response) => {
        console.log(response.data.data.account);
        if (response.data.data.account == true) {
          this.alertErr(true, "您的账号已存在，请修改");
          return
        }
        //注册账号
        let register_url = "http://127.0.0.1:5001/api/register";
        axios.post(register_url, register).then((response) => {
          console.log(response);
          if (response.data.code == 0) {
            this.alertErr(false,"已注册完成，请登录");
            this.$router.replace('/pages/login');
          }
        }).catch((error) => {
          this.alertErr(true, error);
          return
        });
      }).catch((error) => {
        this.alertErr(true, error);
        return
      });
    }
  }
}
</script>

<style lang="sass">
  #register
    .v-list-item__subtitle
      -webkic-line-clamp: initial
      -webkit-box-orient: initial
</style>
