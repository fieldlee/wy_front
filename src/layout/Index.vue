<template>
  <v-app>
    <pages-core-app-bar />
    <pages-core-view />
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

    created() {
      this.$vuetify.theme.dark = true
    },

    beforeDestroy() {
      this.$vuetify.theme.dark = true
    }
  }
</script>
