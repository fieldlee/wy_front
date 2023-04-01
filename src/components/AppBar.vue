<template>
  <v-app-bar absolute color="transparent" flat height="85">
    <v-container>
      <v-row align="center">
        <v-toolbar-title class="font-weight-bold white--text" v-text="title" />

        <v-spacer />
        <v-btn v-for="(item, i) in items" :key="i" :to="item.to" class="hidden-sm-and-down" min-height="48" text>
          <v-icon left size="20" v-text="item.icon" />

          <span v-text="item.text" />
        </v-btn>
      </v-row>
    </v-container>
    <v-menu bottom left min-width="200" offset-y origin="top right" transition="scale-transition" v-if="logined == true">
      <template v-slot:activator="{ attrs, on }">
        <v-btn min-width="0" text v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list :tile="false" flat nav>
        <template v-for="(p, i) in profile">
          <v-divider v-if="p.divider" :key="`divider-${i}`" class="mb-2 mt-2" />

          <app-bar-item v-else :key="`item-${i}`" to="/" >
            <v-list-item-title v-text="p.title" @click="logout" />
          </app-bar-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from 'vuetify/lib'
export default {
  name: 'PagesCoreAppBar',
  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => h(VListItem, {
              attrs: this.$attrs,
              class: {
                'primary--text': !hover,
                'white--text secondary elevation-12': hover
              },
              props: {
                activeClass: '',
                dark: hover,
                link: true,
                ...this.$attrs
              }
            }, this.$slots.default)
          }
        })
      }
    }
  },
  props: { logined: Boolean },
  watch: {
      logined(newVal, oldVal) {
        // 值类型，可正常拿到
        console.log('watch logined', newVal, oldVal)
        this.logined = newVal;
        this.resetItems();
      },
  },
  created() {
    console.log("appbar========",this.logined);
    this.resetItems();
  },
  data: () => ({
    items: [
      {
        to: "/",
        icon: "mdi-view-dashboard",
        text: "首页"
      },
      {
        to: "/pages/opti1d",
        icon: "mdi-format-line-weight",
        text: "分条"
      },
      {
        to: "/pages/optiarea",
        icon: "mdi-land-plots",
        text: "分块"
      },
      {
        to: "/pages/login",
        icon: "mdi-fingerprint",
        text: "登录"
      },
      {
        to: "/pages/register",
        icon: "mdi-account-multiple-plus",
        text: "注册"
      }
    ],
    titles: {
      '/pages/lock': '锁屏',
      '/pages/login': '登录',
      '/pages/pricing': '',
      '/pages/register': '注册',
      '/pages/forget': '忘记密码',
      '/pages/opti1d': '分条切割方案',
      '/pages/optiarea': '分块切割方案'
    },
    profile: [
      { divider: true },
      { title: '退出系统' }
    ]
  }),
  computed: {
    title() {
      return this.titles[this.$route.path]
    }
  },
  methods: {
    logout: function() {
      this.logined = false;
      $cookies.remove("access_token");
      this.$router.replace('/pages/login');
      return;
    },
    resetItems:function() {
      if (this.logined == true) {
      this.items = [
            {
              to: "/",
              icon: "mdi-view-dashboard",
              text: "首页"
            },
            {
              to: "/pages/opti1d",
              icon: "mdi-format-line-weight",
              text: "分条"
            },
            {
              to: "/pages/optiarea",
              icon: "mdi-land-plots",
              text: "分块"
            }];
    }
    if (this.logined == false) {
        this.items = [
      {
        to: "/",
        icon: "mdi-view-dashboard",
        text: "首页"
      },
      {
        to: "/pages/opti1d",
        icon: "mdi-format-line-weight",
        text: "分条"
      },
      {
        to: "/pages/optiarea",
        icon: "mdi-land-plots",
        text: "分块"
      },
      {
        to: "/pages/login",
        icon: "mdi-fingerprint",
        text: "登录"
      },
      {
        to: "/pages/register",
        icon: "mdi-account-multiple-plus",
        text: "注册"
      }
    ];
    }
    }
  }

}
</script>
