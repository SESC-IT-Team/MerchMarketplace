import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const paymentProviders: Array<Record<string, unknown>> = []
const notificationProviders: Array<Record<string, unknown>> = []

if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM) {
  notificationProviders.push({
    resolve: "@medusajs/medusa/notification-sendgrid",
    id: "sendgrid",
    options: {
      api_key: process.env.SENDGRID_API_KEY,
      from: process.env.SENDGRID_FROM,
    },
  })
}

if (process.env.TBANK_TERMINAL_KEY && process.env.TBANK_PASSWORD) {
  paymentProviders.push({
    resolve: "./src/modules/tbank-payment",
    id: "tbank",
    options: {
      terminalKey: process.env.TBANK_TERMINAL_KEY,
      password: process.env.TBANK_PASSWORD,
      apiUrl: process.env.TBANK_API_URL,
      notificationUrl: process.env.TBANK_NOTIFICATION_URL,
    },
  })
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
      authVerificationsPerActor: {
        customer: [{ entity_type: "email", auth_provider: "emailpass" }],
      },
    }
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: paymentProviders,
      },
    },
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: notificationProviders,
      },
    },
  ],
})
