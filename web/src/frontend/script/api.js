const path = require('path');
const jsonServer = require('json-server');
const api = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

api.use(middlewares);
api.use(jsonServer.rewriter({
    "/veilarbportefoljeflatefs/tjenester/tekster": "/tekster",
    "/veilarbveileder/tjenester/veileder/me": "/veileder",
    "/veilarbveileder/tjenester/veileder/enheter": "/enheter",
    "/veilarbportefolje/tjenester/veileder/:veilederident/portefolje": "/portefolje",
    "/veilarbveileder/tjenester/enhet/:enhetid/veiledere": "/veiledere"
}));
api.use(router);

const port = process.env.PORT || 3000;
api.listen(port, () => {
    console.log(`Mock-API is running on port ${port}!`)
});
