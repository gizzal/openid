const Provider = require('oidc-provider');
const configuration = {
  // ... see available options /docs/configuration.md
};
const clients = [{
  client_id: 'foo',
  client_secret: 'bar',
  redirect_uris: ['http://lvh.me:8080/cb'],
  // + other client properties
}];
 
const oidc = new Provider('http://localhost:3000', configuration);
 
let server;
(async () => {
  await oidc.initialize({ clients });
  // express/nodejs style application callback (req, res, next) for use with express apps, see /examples/express.js
  oidc.callback
 
  // koa application for use with koa apps, see /examples/koa.js
  oidc.app
 
  // or just expose a server standalone, see /examples/standalone.js
  server = oidc.listen(3000, () => {
    console.log('oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration');
  });
})().catch((err) => {
  if (server && server.listening) server.close();
  console.error(err);
  process.exitCode = 1;
});