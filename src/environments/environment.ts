
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  bungie: {
    apiKey: '9b0fbe5ec42d4121b9e255528f9ad2d9',
    authUrl: 'https://www.bungie.net/en/OAuth/Authorize',
    clientId: '24112',
    redirect: 'https://localhost:4200',
  },
}
