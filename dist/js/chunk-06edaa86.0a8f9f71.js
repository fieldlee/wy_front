(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06edaa86"],{"0fd9":function(t,n,e){"use strict";e("4b85");var a=e("2b0e"),s=e("d9f7"),r=e("80d2");const i=["sm","md","lg","xl"],l=["start","end","center"];function o(t,n){return i.reduce((e,a)=>(e[t+Object(r["E"])(a)]=n(),e),{})}const c=t=>[...l,"baseline","stretch"].includes(t),d=o("align",()=>({type:String,default:null,validator:c})),u=t=>[...l,"space-between","space-around"].includes(t),f=o("justify",()=>({type:String,default:null,validator:u})),p=t=>[...l,"space-between","space-around","stretch"].includes(t),g=o("alignContent",()=>({type:String,default:null,validator:p})),y={align:Object.keys(d),justify:Object.keys(f),alignContent:Object.keys(g)},v={align:"align",justify:"justify",alignContent:"align-content"};function b(t,n,e){let a=v[t];if(null!=e){if(n){const e=n.replace(t,"");a+="-"+e}return a+="-"+e,a.toLowerCase()}}const j=new Map;n["a"]=a["a"].extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...d,justify:{type:String,default:null,validator:u},...f,alignContent:{type:String,default:null,validator:p},...g},render(t,{props:n,data:e,children:a}){let r="";for(const s in n)r+=String(n[s]);let i=j.get(r);if(!i){let t;for(t in i=[],y)y[t].forEach(e=>{const a=n[e],s=b(t,e,a);s&&i.push(s)});i.push({"no-gutters":n.noGutters,"row--dense":n.dense,["align-"+n.align]:n.align,["justify-"+n.justify]:n.justify,["align-content-"+n.alignContent]:n.alignContent}),j.set(r,i)}return t(n.tag,Object(s["a"])(e,{staticClass:"row",class:i}),a)}})},1151:function(t,n,e){"use strict";e.r(n);var a=e("8336"),s=e("62ad"),r=e("a523"),i=e("0fd9"),l=function(){var t=this,n=t._self._c;return n(r["a"],{staticClass:"error-page",attrs:{"fill-height":"",tag:"section"}},[n(i["a"],{staticClass:"text-center",attrs:{justify:"center"}},[n(s["a"],{attrs:{cols:"auto"}},[n("h1",{staticClass:"title font-weight-black"},[t._v("\n        404\n      ")]),n("div",{staticClass:"display-3 mb-5 mt-10"},[t._v("\n        网页丢失 :(\n      ")]),n(a["a"],{attrs:{depressed:"",to:"/"}},[t._v("\n        返回首页\n      ")])],1)],1)],1)},o=[],c={name:"PagesError"},d=c,u=(e("4e45"),e("2877")),f=Object(u["a"])(d,l,o,!1,null,null,null);n["default"]=f.exports},"4e45":function(t,n,e){"use strict";e("a00c")},a00c:function(t,n,e){},a523:function(t,n,e){"use strict";e("20f6"),e("4b85");var a=e("2b0e");function s(t){return a["a"].extend({name:"v-"+t,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(n,{props:e,data:a,children:s}){a.staticClass=`${t} ${a.staticClass||""}`.trim();const{attrs:r}=a;if(r){a.attrs={};const t=Object.keys(r).filter(t=>{if("slot"===t)return!1;const n=r[t];return t.startsWith("data-")?(a.attrs[t]=n,!1):n||"string"===typeof n});t.length&&(a.staticClass+=" "+t.join(" "))}return e.id&&(a.domProps=a.domProps||{},a.domProps.id=e.id),n(e.tag,a,s)}})}var r=e("d9f7");n["a"]=s("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:n,data:e,children:a}){let s;const{attrs:i}=e;return i&&(e.attrs={},s=Object.keys(i).filter(t=>{if("slot"===t)return!1;const n=i[t];return t.startsWith("data-")?(e.attrs[t]=n,!1):n||"string"===typeof n})),n.id&&(e.domProps=e.domProps||{},e.domProps.id=n.id),t(n.tag,Object(r["a"])(e,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(s||[])}),a)}})}}]);
//# sourceMappingURL=chunk-06edaa86.0a8f9f71.js.map