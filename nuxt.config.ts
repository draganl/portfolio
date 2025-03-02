export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss', // Ensure this line is included
  ],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
    app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100&family=Roboto&display=swap' }
      ]
    }
  },
  nitro: {
    preset: 'netlify'
  },
    ssr: true,
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
})
