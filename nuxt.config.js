import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s - escarq',
    title: 'escarq',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },

  css: ['~/assets/main.scss'],

  plugins: ['~/plugins/helpers.js'],

  components: true,

  buildModules: ['@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios'],

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: "#064663",
          accent: colors.grey.darken3,
          secondary: "#ededed",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3001'
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_BASE_URL
    }
  },

  build: {}
}
