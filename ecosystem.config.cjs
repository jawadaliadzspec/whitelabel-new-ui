module.exports = {
  apps: [
    {
      name: 'whitelabel-nuxt',
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: 'mysql://prisma_user:Abac(123)df@127.0.0.1:3306/referral_db'
      }
    }
  ]
}
