import { env } from 'process'

export const environment = {
  production: true,
  bungie: {
    apiKey: env.BAK,
    authUrl: env.BAU,
    clientId: env.BCI,
    clientSecret: env.BCS,
    redirect: env.BR,
  },
}
