<template>
  <v-card
    :color="!plan.best ? 'transparent elevation-0' : undefined"
    :light="plan.best"
    class="v-card--plan mx-auto pt-3 pb-4 px-2 text-center"
    max-width="100%"
    min-width="80%"
  >
    <div
      class="body-1 grey--text font-weight-bold"
      v-text="plan.heading"
    />

    <v-avatar
      size="60"
    >
      <v-icon
        :color="!plan.best ? undefined : 'success'"
        size="32"
        v-text="plan.icon"
      />
    </v-avatar>

    <v-row align="center">

      <v-col >
        <v-icon
        :color="!plan.best ? undefined : 'success'"
        class="ml-2 mr-1"
        size="24"
      >mdi-currency-cny</v-icon>

    <span
      class="display-2 font-weight-bold"
      v-text="plan.title"
    />
      </v-col>

    </v-row>


    <v-card-text
      class="body-1 font-weight-bold pa-1"
      v-text="plan.text"
    />

    <pages-btn :color="!plan.best ? 'info' : 'success'" min-width="100">
      {{ '选择我做会员' }}
    </pages-btn>
  </v-card>
</template>

<script>
  export default {
    name: 'PagesPlanCard',

    components: {
      PagesBtn: () => import('./Btn.vue')
    },

    props: {
      plan: {
        type: Object,
        default: () => ({
          best: false,
          value: undefined,
          heading: undefined,
          icon: undefined,
          title: undefined,
          text: undefined
        })
      }
    }
  }
</script>

<style lang="sass">
  .v-card--plan
    .v-avatar
      border-radius: 50%
      border: 1px solid #E5E5E5
</style>
