(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-db8e1452"],{"7c15":function(e,t,o){"use strict";o.d(t,"a",(function(){return i})),o.d(t,"f",(function(){return c})),o.d(t,"k",(function(){return l})),o.d(t,"j",(function(){return d})),o.d(t,"p",(function(){return u})),o.d(t,"d",(function(){return g})),o.d(t,"g",(function(){return p})),o.d(t,"h",(function(){return h})),o.d(t,"i",(function(){return m})),o.d(t,"e",(function(){return f})),o.d(t,"c",(function(){return b})),o.d(t,"b",(function(){return y})),o.d(t,"o",(function(){return k})),o.d(t,"n",(function(){return _})),o.d(t,"m",(function(){return v})),o.d(t,"l",(function(){return w}));var n=o("cee4"),a=o("4360");function s(e,t){return new Promise((o,a)=>{n["a"].get(e,{params:t}).then(e=>{o(e.data)}).catch(e=>{a(e)})})}function r(e,t,o){return new Promise((a,s)=>{null==o?n["a"].post(e,t).then(e=>{a(e.data)}).catch(e=>{s(e)}):n["a"].post(e,t,o).then(e=>{a(e.data)}).catch(e=>{s(e)})})}console.log("production"),n["a"].defaults.baseURL="http://www.wanyeel.com:5001/api",n["a"].defaults.timeout=1e4,n["a"].defaults.headers.post["Content-Type"]="application/json;charset=UTF-8",n["a"].interceptors.request.use(e=>{const t=a["a"].state.token;return t&&(e.headers.access_token=t),e},e=>Promise.error(e)),n["a"].interceptors.response.use(e=>200===e.status?Promise.resolve(e):Promise.reject(e),e=>{if(console.log(e),e.response.status){switch(e.response.status){case 401:(void 0).$router.replace({path:"/login",query:{redirect:(void 0).$router.currentRoute.fullPath}});break;case 403:localStorage.removeItem("token"),a["a"].commit("setToken",null),setTimeout(()=>{(void 0).$router.replace({path:"/login",query:{redirect:(void 0).$router.currentRoute.fullPath}})},1e3);break;case 404:break;default:break}return Promise.reject(e.response)}});const i=(e,t)=>s(e,t),c=e=>r("/login",e),l=e=>r("/send_sms",e),d=e=>r("/send_email",e),u=e=>r("/update_password",e),g=e=>r("/check_keys",e),p=e=>r("/register",e),h=e=>r("/save_report",e),m=e=>r("/save_spec",e),f=e=>r("/del_spec",e),b=e=>s("/get_spec/parentOne",e),y=e=>s("/get_spec/parentArea",e),k=e=>r("/stocks_1d_by_weight",e),_=e=>r("/stocks_1d_by_len",e),v=e=>r("/stocks_2d_by_weight",e),w=e=>r("/stocks_2d_by_area",e,{timeout:3e6})},"7e58":function(e,t,o){},cfcb:function(e,t,o){"use strict";o.r(t);var n=o("8336"),a=(o("7e58"),o("604c")),s=a["a"].extend({name:"button-group",provide(){return{btnToggle:this}},computed:{classes(){return a["a"].options.computed.classes.call(this)}},methods:{genData:a["a"].options.methods.genData}}),r=o("a9ad"),i=o("58df"),c=Object(i["a"])(s,r["a"]).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes(){return{...s.options.computed.classes.call(this),"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile,...this.themeClasses}}},methods:{genData(){const e=this.setTextColor(this.color,{...s.options.methods.genData.call(this)});return this.group?e:this.setBackgroundColor(this.backgroundColor,e)}}}),l=o("99d9"),d=o("62ad"),u=o("a523"),g=o("132d"),p=o("adda"),h=o("0fd9"),m=o("0789"),f=o("8654"),b=function(){var e=this,t=e._self._c;return t(u["a"],{attrs:{id:"login","fill-height":"",tag:"section"}},[t(h["a"],{attrs:{justify:"center"}},[t(m["e"],{attrs:{appear:""}},[t("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"success",light:"","max-width":"100%",width:"450"},scopedSlots:e._u([{key:"heading",fn:function(){return[t("div",{staticClass:"text-center"},[t("h1",{staticClass:"display-2 font-weight-bold mb-3"},[e._v("\n              登录\n            ")]),t(c,{attrs:{color:"deep-purple-accent-3",variant:"outlined",divided:"",rounded:""},model:{value:e.loginType,callback:function(t){e.loginType=t},expression:"loginType"}},e._l(e.socials,(function(o,a){return t(n["a"],{key:a,attrs:{value:o.type,color:"success"}},[t(g["a"],{attrs:{start:"",size:"default"},domProps:{textContent:e._s(o.icon)}}),e._v("\n                "+e._s(o.text)+"\n              ")],1)})),1)],1)]},proxy:!0}])},[t(l["b"],{staticClass:"text-center"},[t(h["a"],["account"==e.loginType?t(d["a"],{attrs:{cols:"12"}},[t(f["a"],{attrs:{color:"secondary",label:"账号...",rules:e.usernameValidation,"prepend-icon":"mdi-account-outline"},model:{value:e.loginName,callback:function(t){e.loginName=t},expression:"loginName"}})],1):e._e(),"email"==e.loginType?t(d["a"],{attrs:{cols:"12"}},[t(f["a"],{attrs:{color:"secondary",label:"邮箱...",rules:e.emailValidation,"prepend-icon":"mdi-email"},model:{value:e.logineMail,callback:function(t){e.logineMail=t},expression:"logineMail"}})],1):e._e(),"phone"==e.loginType?t(d["a"],{attrs:{cols:"12"}},[t(f["a"],{attrs:{color:"secondary",minLength:"11",maxLength:"11",label:"手机号...","prepend-icon":"mdi-phone",rules:e.emailValidation},model:{value:e.loginPhone,callback:function(t){e.loginPhone=t},expression:"loginPhone"}})],1):e._e(),t(d["a"],{attrs:{cols:"12"}},[t(f["a"],{attrs:{label:"密码...","append-icon":e.show?"mdi-eye":"mdi-eye-off",rules:e.passwordValidation,type:e.show?"text":"password",color:"secondary","prepend-icon":"mdi-lock-outline"},on:{"click:append":function(t){t.preventDefault(),e.show=!e.show}},model:{value:e.loginPassword,callback:function(t){e.loginPassword=t},expression:"loginPassword"}}),t("div",{attrs:{align:"right"}},[t("span",{staticClass:"font-weight-light",staticStyle:{"font-size":"12px",color:"#3c4858"},attrs:{align:"right"}},[t("a",{staticClass:"secondary--text",staticStyle:{"text-decoration":"none"},attrs:{href:"/pages/forget",rel:"noopener"}},[e._v("\n                    忘记密码\n                  ")])])])],1),t(d["a"],{attrs:{cols:"8"}},[t(f["a"],{attrs:{color:"secondary",label:"图片验证码...",rules:e.codeValidation,"prepend-icon":"mdi-alert-decagram"},model:{value:e.loginImgCode,callback:function(t){e.loginImgCode=t},expression:"loginImgCode"}})],1),t(d["a"],{attrs:{cols:"4"}},[t(p["a"],{attrs:{src:this.base64image,height:"40",width:"120",contain:""},on:{click:function(t){return e.reloadImg()}}}),t("div",{attrs:{align:"right"}},[t("span",{staticClass:"font-weight-light",staticStyle:{"font-size":"8px",color:"#3c4858"},attrs:{align:"right"}},[t("a",{staticClass:"secondary--text",staticStyle:{"text-decoration":"none"},attrs:{href:"#",rel:"noopener"},on:{click:function(t){return e.reloadImg()}}},[e._v("\n                    点击刷新\n                  ")])])])],1)],1),t("pages-btn",{staticClass:"v-btn--text success--text",attrs:{large:"",color:"",depressed:""},on:{click:function(t){return e.login()}}},[e._v("\n            登录\n          ")]),t("div",{staticClass:"text-center grey--text body-1 font-weight-light"},[t("a",{staticClass:"secondary--text",staticStyle:{"text-decoration":"none"},attrs:{href:"/pages/register",rel:"noopener"}},[e._v("\n              还没有账号，注册一个\n            ")])])],1)],1)],1)],1),t("base-material-snackbar",e._b({attrs:{type:e.color},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},"base-material-snackbar",{top:!0,center:!0},!1),[t("span",{staticClass:"font-weight-bold"},[e._v(e._s(e.snackbarMsg))])])],1)},y=[],k=o("ec26"),_=o("7c15"),v={name:"PagesLogin",components:{PagesBtn:()=>o.e("chunk-2d22e0db").then(o.bind(null,"f9b4"))},created(){this.loginuuid=Object(k["a"])(),this.getImage()},data:function(){return{logined:!1,show:!1,isShowSlide:!1,phoneOrmail:"",loginName:"",loginPassword:"",loginPhone:"",logineMail:"",loginValidCode:"",loginImgCode:"",loginType:"account",loginuuid:"",base64image:"",snackbar:!1,color:"info",snackbarMsg:"",socials:[{href:"#",icon:"mdi-phone",type:"phone",text:"手机",disabled:!0},{href:"#",icon:"mdi-email",type:"email",text:"邮箱",disabled:!0},{href:"#",icon:"mdi-account",type:"account",text:"账号",disabled:!1}]}},computed:{usernameValidation:function(){return[e=>this.checkLen_forValidate(e,6)||"账号名称至少6位"]},codeValidation:function(){return[e=>this.checkLen_forValidate(e,4)||"验证码至少4位"]},emailValidation:function(){return[e=>this.checkInput_forValidate(e)||"手机号或邮箱格式不对"]},passwordValidation:function(){return[e=>this.checkLen_forValidate(e,6)||"密码至少6位"]}},methods:{checkLen_forValidate:function(e,t){return!(e&&e.length<t)},checkInput_forValidate:function(e){const t=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,o=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;return!!t.test(e)||!!o.test(e)},alertErr:function(e,t){this.snackbar=!0,this.color=!0===e?"error":"info",this.snackbarMsg=t},reloadImg:function(){this.getImage()},getImage:function(){let e="/captcha/"+this.loginuuid;Object(_["a"])(e,{}).then(e=>{console.log(e),this.base64image="data:image/png;base64,"+e.data,console.log(this.base64image)}).catch(e=>{console.log("Network/Server error"),console.error(e)})},getTypeColor:function(){return void 0===this.loginType?"account":this.loginType},sendEmail:function(){console.log("send email to ====")},sendValidCode:function(){console.log("send sendValidCode to ====")},checkInput:function(e){const t=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,o=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;return t.test(e)?"phone":o.test(e)?"email":"手机号码或邮箱格式不正确，请重新填写"},login:function(){let e={};"account"===this.loginType&&(e={username:this.loginName,password:this.loginPassword,vcode:this.loginImgCode,uuid:this.loginuuid}),"email"==this.loginType&&(e={email:this.logineMail,password:this.loginPassword,vcode:this.loginImgCode,uuid:this.loginuuid}),"phone"==this.loginType&&(e={phone:this.loginPhone,password:this.loginPassword,vcode:this.loginImgCode,uuid:this.loginuuid}),console.log(e),Object(_["f"])(e).then(e=>{if(0==e.code)return this.$cookies.set("access_token",e.data.access_token),this.$store.commit("setToken",e.data.access_token),this.$store.commit("setUserName",e.data.user.account),this.$store.commit("setUserType",e.data.user.user_type),this.$store.commit("setUserStatus",!0),this.logined=!0,this.$emit("func",this.logined),void this.$router.replace("/pages/opti1d");this.alertErr(!0,e.msg)}).catch(e=>{console.log("Network/Server error"),console.error(e),this.alertErr(!0,e)})}}},w=v,x=o("2877"),C=Object(x["a"])(w,b,y,!1,null,null,null);t["default"]=C.exports},ec26:function(e,t,o){"use strict";const n="undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var a={randomUUID:n};let s;const r=new Uint8Array(16);function i(){if(!s&&(s="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!s))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return s(r)}const c=[];for(let u=0;u<256;++u)c.push((u+256).toString(16).slice(1));function l(e,t=0){return(c[e[t+0]]+c[e[t+1]]+c[e[t+2]]+c[e[t+3]]+"-"+c[e[t+4]]+c[e[t+5]]+"-"+c[e[t+6]]+c[e[t+7]]+"-"+c[e[t+8]]+c[e[t+9]]+"-"+c[e[t+10]]+c[e[t+11]]+c[e[t+12]]+c[e[t+13]]+c[e[t+14]]+c[e[t+15]]).toLowerCase()}function d(e,t,o){if(a.randomUUID&&!t&&!e)return a.randomUUID();e=e||{};const n=e.random||(e.rng||i)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){o=o||0;for(let e=0;e<16;++e)t[o+e]=n[e];return t}return l(n)}t["a"]=d}}]);
//# sourceMappingURL=chunk-db8e1452.8555c8dc.js.map