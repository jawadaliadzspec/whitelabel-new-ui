// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: { baseURL: '/app/' },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME || 'Veckans R',
    },
    companyId: process.env.COMPANY_ID,
  },
  // nitro: {
  //   preset: 'node-server',
  //   externals: {
  //     // Don’t bundle Prisma – resolve at runtime
  //     external: ['@prisma/client', 'prisma', '.prisma/client']
  //   },
  //   moduleSideEffects: ['@prisma/client'],
  //   // Hard stop Rollup from touching ".prisma/*" (Windows fix)
  //   rollupConfig: {
  //     plugins: [
  //       {
  //         name: 'externalize-dot-prisma',
  //         resolveId(source: string) {
  //           if (source === '.prisma' || source.startsWith('.prisma/')) {
  //             // Mark as external so Rollup won’t try to resolve/package it
  //             return { id: source, external: true }
  //           }
  //           return null
  //         }
  //       }
  //     ]
  //   }
  // }
})
