<template>
  <v-app-bar
    absolute
    color="transparent"
    flat
    height="85"
  >
    <v-container>
      <v-row align="center">
        <v-toolbar-title
          class="font-weight-bold white--text"
          v-text="title"
        />

        <v-spacer />

        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          class="hidden-sm-and-down"
          min-height="48"
          text
        >
          <v-icon
            left
            size="20"
            v-text="item.icon"
          />

          <span v-text="item.text" />
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'PagesCoreAppBar',

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          text: '首页',
          to: '/'
        },
        {
          icon: 'mdi-fingerprint',
          text: '登录',
          to: '/pages/login'
        },
        {
          icon: 'mdi-account-multiple-plus',
          text: '注册',
          to: '/pages/register'
        },
      ],
      titles: {
        '/pages/lock': '锁屏',
        '/pages/login': '登录',
        '/pages/pricing': '',
        '/pages/register': '注册',
        '/pages/opti1d': '分条切割方案',
        '/pages/optiarea': '分块切割方案'
      }
    }),

    computed: {
      title() {
        return this.titles[this.$route.path]
      }
    }
  }
</script>
