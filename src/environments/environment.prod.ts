import { env } from 'process'

export const environment = {
  production: true,
  bungie: {
    apiKey: env.apiKey,
    authUrl: env.authUrl,
    clientId: env.clientId,
    clientSecret: env.clientSecret,
    redirect: env.redirect,
  },
}
