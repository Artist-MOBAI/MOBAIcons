// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: 'latest',
  preset: 'cloudflare-module',
  serverAssets: [{
    baseName: 'icons',
    dir: '../../icons',
  }],
  cloudflare: {
    deployConfig: true,
    nodeCompat: true,
    wrangler: {
      name: 'mobaicons-function',
    },
  },
})
