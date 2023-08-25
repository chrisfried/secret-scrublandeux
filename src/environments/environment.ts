// import { bungieDev } from './keys'

// export const environment = {
//   production: false,
//   bungie: bungieDev,
// }

export const environment = {
  production: true,
  bungie: {
    apiKey: '0450a4df81c84adeb86d9f4dcf552901',
    authUrl: 'https://www.bungie.net/en/OAuth/Authorize',
    clientId: '40469',
    redirect: 'https://localhost:4200',
  },
}
