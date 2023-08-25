// import { bungieDev } from './keys'

// export const environment = {
//   production: false,
//   bungie: bungieDev,
// }

export const environment = {
  production: true,
  bungie: {
    apiKey: 'cd01c0cb258c48228cdbc0f468674257',
    authUrl: 'https://www.bungie.net/en/OAuth/Authorize',
    clientId: '36111',
    redirect: 'https://chrisfried.github.io/secret-scrublandeux/auth',
  },
}
