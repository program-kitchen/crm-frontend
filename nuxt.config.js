export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "COACHTECH CRM",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/style.css",
    "@/assets/css/users.css",
    "@/assets/css/cource.css",
    "@/assets/css/list.css",
    "@/assets/css/term.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vue-pagenate.js",
    "~/plugins/axios.js",
    "~/plugins/localStorage.js",
    "@plugins/vee-validate",
    "@/plugins/dragDrop.js",
    "@/plugins/commonUtillity.js",
    "~/plugins/const.js",
    "~/plugins/messages.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-client-init-module",
    "@nuxtjs/auth-next"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "https://api.coachtech-crm.com"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"]
  },
  auth: {
    cookie: false,
    redirect: {
      login: "/login",
      logout: "/login",
      callback: false,
      home: "/"
    },
    strategies: {
      laravelJWT: {
        provider: "laravel/jwt",
        url: "https://api.coachtech-crm.com",
        endpoints: {
          login: { url: "/api/login", method: "post", propertyName: "token" },
          logout: { url: "/api/logout", method: "post" },
          refresh: { url: "/api/refresh", method: "post" },
          user: {
            url: "/api/user-profile",
            method: "get",
            propertyName: "user"
          }
        },
        token: {
          property: "access_token",
          maxAge: 60 * 60
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
          maxAge: 60 * 60 * 24 * 30
        }
      }
    }
  },
  router: {
    middleware: ["auth"]
  },
  loading: {
    color: 'blue',
    height: '5px'
  }
};
