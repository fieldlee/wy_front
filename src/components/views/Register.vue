<template>
  <v-container
    id="register"
    fill-height
    tag="section"
  >
    <v-row justify="center">
      <v-col cols="9">
        <v-slide-y-transition appear>
          <v-card
            class="pa-3 pa-md-5 mx-auto"
            light
          >
            <pages-heading class="text-center display-3">
              注册账号
            </pages-heading>

            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-row no-gutters>
                  <v-col
                    v-for="(section, i) in sections"
                    :key="i"
                    cols="12"
                  >
                    <v-list-item three-line>
                      <v-list-item-icon class="mr-4 mt-5 mt-md-4">
                        <v-icon
                          :large="$vuetify.breakpoint.mdAndUp"
                          :color="section.iconColor"
                          v-text="section.icon"
                        />
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          class="font-weight-light mb-4 mt-3"
                          v-text="section.title"
                        />

                        <v-list-item-subtitle v-text="section.text" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <div class="text-center">
                  <v-btn
                    v-for="(social, i) in socials"
                    :key="i"
                    :color="social.iconColor"
                    class="my-2 mr-1"
                    dark
                    depressed
                    fab
                    small
                  >
                    <v-icon v-text="social.icon" />
                  </v-btn>

                  <div class="my-2" />

                  <v-text-field
                    color="secondary"
                    label="用户名..."
                    prepend-icon="mdi-account"
                  />

                  <v-text-field
                    color="secondary"
                    label="邮箱..."
                    prepend-icon="mdi-email"
                  />

                  <v-text-field
                    class="mb-8"
                    color="secondary"
                    label="密码..."
                    prepend-icon="mdi-lock-outline"
                  />
                  <pages-btn color="success">
                    注册
                  </pages-btn>
                  <br/>
                  <v-btn
                    class="mb-8"
                    color="#F48FB1"
                    dark
                    text
                    @click="gotoLogin()"
                  >
                    已有账号了，请登录
                  </v-btn>

                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'PagesRegister',

    components: {
      PagesBtn: () => import('../elements/Btn'),
      PagesHeading: () => import('../elements/Heading')
    },

    data: () => ({
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
    methods: {
      gotoLogin: function () {
        this.$router.replace('/pages/login');
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
