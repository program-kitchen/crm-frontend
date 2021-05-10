export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "crm-frontend",
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
  router: {
    middleware: ["auth"]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/style.css", "@/assets/css/users.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vue-pagenate.js",
    "~/plugins/axios.js",
    "~/plugins/vee-validate"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"]
  },
  auth: {
    redirect: {
      login: "/login", // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
      logout: "/login", // ログアウト時のリダイレクトURL
      callback: false, // Oauth認証等で必要となる コールバックルート
      home: "/" // ログイン後のリダイレクトURL
    },
    strategies: {
      laravelJWT: {
        provider: "laravel/jwt",
        url: "http://localhost:8000",
        endpoints: {
          login: { url: "/api/login", method: "post", propertyName: "token" },
          logout: { url: "/api/logout", method: "post" },
          user: { url: "/api/user/index", method: "get", propertyName: "user" }
        }
      }
    }
  }
};
