<template>
  <v-app>
    <pages-core-app-bar :logined="logined"/>
    <pages-core-view @func="getLoginedFromLogin"/>
    <pages-core-footer-bar />
  </v-app>
</template>

<script>
  export default {
    name: 'PagesIndex',

    components: {
      PagesCoreAppBar: () => import('../components/AppBar'),
      PagesCoreFooterBar: () => import('../components/FooterBar'),
      PagesCoreView: () => import('../components/View'),
    },
    data () {
        return {
            logined: false
        }
    },
    created() {
      this.$vuetify.theme.dark = true;
      this.getLogined();
      console.log(this.logined);
    },

    beforeDestroy() {
      this.$vuetify.theme.dark = true
    },
    methods: {
      getLoginedFromLogin(data){
        this.logined = data;
      },
      getLogined() {
        if ($cookies.get("access_token")) {
          this.logined = true;
          return;
        }
        this.logined = false;
        return;
    },
    }
  }
</script>
