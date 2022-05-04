import colors from 'vuetify/es5/util/colors'


export default {
  // server: {
  //   port: 8880,
  //   host: 'vivi--shop.com',
  //   timing: false
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'vivishop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Mua sắm trực tuyến hàng triệu sản phẩm thời trang nam nữ, đồ điện tử, gia dụng...Giá tốt; nhiều ưu đãi. Mua và bán online trong 30 giây. Vivishop đảm bảo nhận hàng hoặc hoàn tiền. Vivishop Đảm Bảo | Miễn Phí Vận Chuyển | Gợi Ý Hôm Nay' },
      { hid: "og:title", property: 'og:title', content: "Vivishop" },
      { hid: "og:description", property: 'og:description', content: "Mua sắm trực tuyến hàng triệu sản phẩm thời trang nam nữ, đồ điện tử, gia dụng...Giá tốt; nhiều ưu đãi. Mua và bán online trong 30 giây. Vivishop đảm bảo nhận hàng hoặc hoàn tiền. Vivishop Đảm Bảo | Miễn Phí Vận Chuyển | Gợi Ý Hôm Nay" },
      { hid: "og:image", property: 'og:image', content: "http://localhost:3000/img/daidien.jpg" },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css",
        type: "text/css",
        integrity:
          "sha512-1xoFisiGdy9nvho8EgXuXvnpR5GAMSjFwp40gSRE3NwdUdIMIKuPa7bqoUhLD0O/5tPNhteAsE5XyyMi5reQVA==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
      },
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.js",
        type: "text/javascript",
        integrity:
          "sha512-SeiQaaDh73yrb56sTW/RgVdi/mMqNeM2oBwubFHagc5BkixSpP1fvqF47mKzPGWYSSy4RwbBunrJBQ4Co8fRWA==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
        defer: true,
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/esri-leaflet/3.0.2/esri-leaflet.min.js",
        type: "text/javascript",
        integrity:
          "sha512-gIH+jRsDGsufpY/g9qnzPNG9gHLSAcoDwFYf6q9i5VAmI8HqjZpwIq9zfY3zlMm7fZy5RpXSF34eedTCZnPxVw==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
        defer: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'vi'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: { variations: false },
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // loading
  loading: {
    color: '#3880ff',
    height: '2px',
    throttle: 0
  },

  // Server Middleware
  serverMiddleware: {
    '/api': '~/api/',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    optimizeCSS: true,
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        preserveLineBreaks: false,
        collapseWhitespace: true
      }
    },
    loaders: {
      cssModules: {
        modules: {
          localIdentName: "[hash:base64:10]",
        }
      }
    },
  },
}
