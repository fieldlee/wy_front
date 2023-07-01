(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a1f8046"],{"4bd4":function(t,i,e){"use strict";var s=e("58df"),a=e("7e2b"),o=e("3206");i["a"]=Object(s["a"])(a["a"],Object(o["b"])("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const i=Object.values(t).includes(!0);this.$emit("input",!i)},deep:!0,immediate:!0}},methods:{watchInput(t){const i=t=>t.$watch("hasError",i=>{this.$set(this.errorBag,t._uid,i)},{immediate:!0}),e={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?e.shouldValidate=t.$watch("shouldValidate",s=>{s&&(this.errorBag.hasOwnProperty(t._uid)||(e.valid=i(t)))}):e.valid=i(t),e},validate(){return 0===this.inputs.filter(t=>!t.validate(!0)).length},reset(){this.inputs.forEach(t=>t.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(t=>t.resetValidation()),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const i=this.inputs.find(i=>i._uid===t._uid);if(!i)return;const e=this.watchers.find(t=>t._uid===i._uid);e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter(t=>t._uid!==i._uid),this.inputs=this.inputs.filter(t=>t._uid!==i._uid),this.$delete(this.errorBag,i._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},this.$slots.default)}})},b084:function(t,i,e){"use strict";e.r(i);var s=e("8336"),a=e("99d9"),o=e("62ad"),l=e("a523"),c=e("4bd4"),r=e("0fd9"),n=e("8654"),h=function(){var t=this,i=t._self._c;return i(l["a"],{attrs:{id:"cal-coil",fluid:"",tag:"section"}},[i(r["a"],[i(o["a"],{attrs:{cols:"12",md:"6"}},[i("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"success",icon:"mdi-circle-double",title:"计算外径"}},[i("h1",{staticClass:"font-weight-bold mb-2",staticStyle:{color:"#BDBDBD","font-size":"18px"},domProps:{textContent:t._s("已知卷重和宽度计算外径")}}),i("h1",{staticClass:"font-weight-bold mb-2",staticStyle:{color:"peru","font-size":"12px"},domProps:{textContent:t._s("注：用钢卷的重量和宽度计算钢卷外径 本公式钢材密度按7.85g/cm³计算")}}),i(c["a"],{staticClass:"mt-5"},[i(n["a"],{attrs:{label:"宽度(mm)",color:"secondary",type:"number"},model:{value:t.coilWidth,callback:function(i){t.coilWidth=i},expression:"coilWidth"}}),i(n["a"],{attrs:{label:"重量(t)",color:"secondary",type:"number"},model:{value:t.coilWeight,callback:function(i){t.coilWeight=i},expression:"coilWeight"}}),i(n["a"],{attrs:{label:"内径(mm)",color:"secondary",type:"number"},model:{value:t.coilInner1,callback:function(i){t.coilInner1=i},expression:"coilInner1"}}),i(n["a"],{attrs:{label:"钢材密度",color:"secondary",type:"number"},model:{value:t.density,callback:function(i){t.density=i},expression:"density"}})],1),i(r["a"],[i(o["a"],{attrs:{cols:"6",md:"6"}},[i(a["a"],{staticClass:"pl-0"},[i(s["a"],{attrs:{color:"dark","min-width":"100"},on:{click:function(i){return t.resetLeft()}}},[t._v("\n                                    重置\n                                ")])],1)],1),i(o["a"],{attrs:{cols:"6",md:"6"}},[i(a["a"],{staticClass:"pl-0"},[i(s["a"],{attrs:{color:"success","min-width":"100"},on:{click:function(i){return t.comLeft()}}},[t._v("\n                                    计算\n                                ")])],1)],1)],1),i(c["a"],{staticClass:"mt-5"},[i(n["a"],{attrs:{readonly:"",label:"外径(mm)",color:"secondary",type:"number"},model:{value:t.coilOutter1,callback:function(i){t.coilOutter1=i},expression:"coilOutter1"}})],1)],1)],1),i(o["a"],{attrs:{cols:"12",md:"6"}},[i("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"success",icon:"mdi-circle-double",title:"计算外径"}},[i("h1",{staticClass:"font-weight-bold mb-2",staticStyle:{color:"#BDBDBD","font-size":"18px"},domProps:{textContent:t._s("已知厚度和长度计算外径")}}),i("h1",{staticClass:"font-weight-bold mb-2",staticStyle:{color:"peru","font-size":"12px"},domProps:{textContent:t._s("注：用钢卷的重量和宽度计算钢卷外径 本公式钢材密度按7.85g/cm³计算")}}),i(c["a"],{staticClass:"mt-5"},[i(n["a"],{attrs:{label:"厚度(mm)",color:"secondary",type:"number"},model:{value:t.coilThick,callback:function(i){t.coilThick=i},expression:"coilThick"}}),i(n["a"],{attrs:{label:"长度(mm)",color:"secondary",type:"number"},model:{value:t.coilLength,callback:function(i){t.coilLength=i},expression:"coilLength"}}),i(n["a"],{attrs:{label:"内径(mm)",color:"secondary",type:"number"},model:{value:t.coilInner2,callback:function(i){t.coilInner2=i},expression:"coilInner2"}}),i(n["a"],{attrs:{label:"钢材密度",color:"secondary",type:"number"},model:{value:t.density,callback:function(i){t.density=i},expression:"density"}})],1),i(r["a"],[i(o["a"],{attrs:{cols:"6",md:"6"}},[i(a["a"],{staticClass:"pl-0"},[i(s["a"],{attrs:{color:"dark","min-width":"100"},on:{click:function(i){return t.resetRight()}}},[t._v("\n                                    重置\n                                ")])],1)],1),i(o["a"],{attrs:{cols:"6",md:"6"}},[i(a["a"],{staticClass:"pl-0"},[i(s["a"],{attrs:{color:"success","min-width":"100"},on:{click:function(i){return t.comRight()}}},[t._v("\n                                    计算\n                                ")])],1)],1)],1),i(c["a"],{staticClass:"mt-5"},[i(n["a"],{attrs:{readonly:"",label:"外径(mm)",color:"secondary",type:"number"},model:{value:t.coilOutter,callback:function(i){t.coilOutter=i},expression:"coilOutter"}})],1)],1)],1),i(o["a"],{attrs:{cols:"12",md:"6"}},[i("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"success",icon:"mdi-circle-outline",title:"计算卷长度"}},[i("h1",{staticClass:"font-weight-bold mb-2",staticStyle:{color:"#BDBDBD","font-size":"18px"},domProps:{textContent:t._s("已知厚度、内径、外径计算长度")}}),i("h1",{staticClass:"font-weight-bold mb-2",staticStyle:{color:"peru","font-size":"12px"},domProps:{textContent:t._s("注：用钢卷的重量和宽度计算钢卷外径 本公式钢材密度按7.85g/cm³计算")}}),i(c["a"],{staticClass:"mt-5"},[i(n["a"],{attrs:{label:"外径(mm)",color:"secondary",type:"number"},model:{value:t.coilOutter3,callback:function(i){t.coilOutter3=i},expression:"coilOutter3"}}),i(n["a"],{attrs:{label:"内径(mm)",color:"secondary",type:"number"},model:{value:t.coilInner3,callback:function(i){t.coilInner3=i},expression:"coilInner3"}}),i(n["a"],{attrs:{label:"厚度(mm)",color:"secondary",type:"number"},model:{value:t.coilThick3,callback:function(i){t.coilThick3=i},expression:"coilThick3"}}),i(n["a"],{attrs:{label:"钢材密度",color:"secondary",type:"number"},model:{value:t.density,callback:function(i){t.density=i},expression:"density"}})],1),i(r["a"],[i(o["a"],{attrs:{cols:"6",md:"6"}},[i(a["a"],{staticClass:"pl-0"},[i(s["a"],{attrs:{color:"dark","min-width":"100"},on:{click:function(i){return t.reset3()}}},[t._v("\n                                    重置\n                                ")])],1)],1),i(o["a"],{attrs:{cols:"6",md:"6"}},[i(a["a"],{staticClass:"pl-0"},[i(s["a"],{attrs:{color:"success","min-width":"100"},on:{click:function(i){return t.comLenLeft()}}},[t._v("\n                                    计算\n                                ")])],1)],1)],1),i(c["a"],{staticClass:"mt-5"},[i(n["a"],{attrs:{readonly:"",label:"长度(m)",color:"secondary",type:"number"},model:{value:t.coilLength3,callback:function(i){t.coilLength3=i},expression:"coilLength3"}})],1)],1)],1)],1),i("base-material-snackbar",t._b({attrs:{timeout:2e3,type:t.color},model:{value:t.snackbar,callback:function(i){t.snackbar=i},expression:"snackbar"}},"base-material-snackbar",{top:!0,center:!0},!1),[i("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.snackbarMsg))])])],1)},u=[],d={name:"Coil",data:function(){return{snackbar:!1,color:"info",snackbarMsg:"",dialog:!1,density:7.85,coilWidth:0,coilWeight:0,coilInner1:0,coilInner2:0,coilOutter1:0,coilOutter:0,coilThick:0,coilLength:0,coilOutter3:0,coilInner3:0,coilThick3:0,coilLength3:0,coilOutter4:0,coilInner4:0,coilWeight4:0,coilWidth4:0,coilLength4:0}},methods:{alertErr:function(t,i){this.snackbar=!0,this.color=!0===t?"error":"info",this.snackbarMsg=i},comLeft:function(){if(0==this.coilWidth||0==this.coilWeight||0==this.coilInner1)return this.alertErr(!0,"请输入必要的数值"),!1;let t=parseFloat(this.coilInner1)/10,i=parseFloat(this.coilWidth)/10,e=1e3*parseFloat(this.coilWeight)*1e3,s=parseFloat(this.density),a=(e/s+t/2*(t/2)*Math.PI*i)/i/Math.PI;this.coilOutter1=2*Math.sqrt(a)*10},comRight:function(){if(0==this.coilThick||0==this.coilLength||0==this.coilInner2)return this.alertErr(!0,"请输入必要的数值"),!1;let t=parseFloat(this.coilThick),i=parseFloat(this.coilLength),e=t*i,s=parseFloat(this.coilInner2),a=(e+s/2*(s/2)*Math.PI)/Math.PI;this.coilOutter=2*Math.sqrt(a)},comLenLeft:function(){if(0==this.coilOutter3||0==this.coilInner3||0==this.coilThick3)return this.alertErr(!0,"请输入必要的数值"),!1;let t=parseFloat(this.coilOutter3),i=parseFloat(this.coilInner3),e=parseFloat(this.coilThick3);this.coilLength3=(t/2*(t/2)*Math.PI-i/2*(i/2)*Math.PI)/e/1e3},comLenRight:function(){if(0==this.coilOutter4||0==this.coilInner4||0==this.coilWeight4)return this.alertErr(!0,"请输入必要的数值"),!1;let t=parseFloat(this.coilOutter4),i=parseFloat(this.coilInner4);parseFloat(this.coilWidth4),parseFloat(this.coilWeight4);this.coilLength3=(t/2*(t/2)*Math.PI-i/2*(i/2)*Math.PI)/thick},resetLeft:function(){this.coilWidth=0,this.coilWeight=0,this.coilInner1=0},resetRight:function(){this.coilThick=0,this.coilLength=0,this.coilInner2=0},reset3:function(){this.coilOutter3=0,this.coilInner3=0,this.coilThick3=0},reset4:function(){this.coilOutter4=0,this.coilInner4=0,this.coilWeight4=0,this.coilLength4=0,this.coilWidth4=0}}},m=d,p=e("2877"),b=Object(p["a"])(m,h,u,!1,null,null,null);i["default"]=b.exports}}]);
//# sourceMappingURL=chunk-6a1f8046.025bae32.js.map