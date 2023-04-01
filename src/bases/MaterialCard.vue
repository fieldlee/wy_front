<template>
  <v-card
    v-bind="$attrs"
    :class="classes"
    class="v-card--material pa-3"
  >
    <div class="d-flex grow flex-wrap" >
      <v-avatar
        v-if="avatar"
        size="128"
        class="mx-auto v-card--material__avatar elevation-12"
        color="grey"
      >
        <v-img :src="avatar" />
      </v-avatar>

      <v-sheet
        v-else
        :class="{
          'pa-7': !$slots.image
        }"
        :color="color"
        :max-height="icon ? 90 : undefined"
        :width="inline || icon ? 'auto' : '100%'"
        class="text-start v-card--material__heading mb-n6"
        dark
      >
        <slot
          v-if="$slots.heading"
          name="heading"
        />

        <slot
          v-else-if="$slots.image"
          name="image"
        />

        <div
          v-else-if="title && !icon"
          class="body-2  text--primary grey--text"
          v-text="title"
        />
        <div class="text-center" v-else-if="icon">
          <v-icon
            size="32"
            v-text="icon"
          />
        </div>
        <div
          v-if="text"
          class="body-2 font-weight-bold  white--text"
          v-html="text"
        />
      </v-sheet>

      <div
        v-if="$slots['after-heading']"
        class="ml-auto"
      >
        <slot name="after-heading" />
      </div>

      <v-col
        v-if="hoverReveal"
        cols="12"
        class="text-center py-0 mt-n12"
      >
        <slot name="reveal-actions" />
      </v-col>

      <div
        v-else-if="icon && title"
        class="ml-4"
      >
      <v-subheader :class="isDesc ? 'body-2 mt-1 font-weight-bold secondary--text' : 'display-1 mt-3 white--text'">
           <div
          v-html="title"
        />
      </v-subheader>

      </div>
    </div>

    <slot />

    <template v-if="$slots.actions">
      <v-divider class="mt-2" />

      <v-card-actions class="pb-0">
        <slot name="actions" />
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
  export default {
    name: 'MaterialCard',

    props: {
      avatar: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: 'success'
      },
      hoverReveal: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: undefined
      },
      image: {
        type: Boolean,
        default: false
      },
      inline: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      isDesc: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes() {
        return {
          'v-card--material--has-heading': this.hasHeading,
          'v-card--material--hover-reveal': this.hoverReveal
        }
      },
      hasHeading() {
        return Boolean(this.$slots.heading || this.title  ||this.icon)
      },
      hasAltHeading() {
        return Boolean(this.$slots.heading || (this.title && this.icon))
      }
    }
  }
</script>

<style lang="sass">
  .v-card--material
    &__avatar
      position: relative
      top: -64px
      margin-bottom: -32px

    &__heading
      position: relative
      top: -40px
      transition: .3s ease
      z-index: 1

    &.v-card--material--hover-reveal:hover
      .v-card--material__heading
        transform: translateY(-40px)
</style>
