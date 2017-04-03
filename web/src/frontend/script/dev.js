const path = require('path');
const fs = require('fs');
const proxy = require('http-proxy-middleware');
const express = require('express');
const devserver = express();


const webappDir = path.resolve(__dirname, '../../main/webapp/');
const port = process.env.PORT || 3001;

devserver.use('/veilarbportefoljeflatefs/', express.static(webappDir));

devserver.get('/', (req, res) => {
    res.redirect('/veilarbportefoljeflatefs/')
});

devserver.get('/veilarbportefoljeflatefs/tjenester/tekster', (req, res) => {
    return res.send("This is a response from devserver. No texts found.");
});

const proxyPaths = [
    '/veilarbveileder',
    '/veilarbportefolje',
    '/veilarbsituasjon'
];

const proxyOptions = {
    target: 'https://api.dev/',
    logLevel: 'debug',
    secure: true,
    onProxyReq: onProxyReq,
    onProxyRes: onProxyRes,
    router: {
        'https:/portefolje.dev/': 'https://api.dev/'
    }
};

function onProxyReq(proxyReq, req, res) {
    console.log("-----onProxyReq----");
    console.log("-----onProxyReq----");
    console.log("-----onProxyReq----");
    console.log("-----onProxyReq----");
    console.log("-----onProxyReq----");
    console.log("-----onProxyReq----");
    console.log("-----onProxyReq----");
    console.log("-----onProxyReq----");
    console.log(proxyReq.body);
    console.log("--------------req-------------------");
    console.log("--------------req-------------------");
    console.log("--------------req-------------------");
    console.log("--------------req-------------------");
    console.log("--------------req-------------------");
    console.log("--------------req-------------------");
    console.log("--------------req-------------------");
    console.log("--------------req-------------------");
    console.log(req.body);
    console.log("----------------res-----------------");
    console.log("----------------res-----------------");
    console.log("----------------res-----------------");
    console.log("----------------res-----------------");
    console.log("----------------res-----------------");
    console.log("----------------res-----------------");
    console.log("----------------res-----------------");
    console.log("----------------res-----------------");
    console.log("----------------res-----------------");
    console.log(res.body);
    console.log("---------------------------------");
    console.log("---------------------------------");
    console.log("---------------------------------");
    console.log("---------------------------------");
    console.log("---------------------------------");
    console.log("---------------------------------");
}

function onProxyRes(proxyRes, req, res) {
    console.log("-----onProxyRes----");
    console.log(`proxyRes ${proxyRes}`);
    console.log(`request: ${req}`);
    console.log(`response: ${res}`);
}

devProxy = proxy(proxyPaths, proxyOptions);
devserver.use('/veilarbveileder', devProxy);
devserver.listen(port, () => {
    console.log(`Serving static files on port ${port}`);
});
