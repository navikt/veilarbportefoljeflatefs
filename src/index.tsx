import ReactDOM from 'react-dom';
// import {initializeFaro, WebVitalsInstrumentation} from '@grafana/faro-web-sdk';
import Application from './application';
import {DeploymentEnvironment} from './utils/url-utils';
import env from './utils/environment';
import '@navikt/ds-css';
import './style.css';
import {leggTilUmamiScript} from './umami/umami';

if (window.localStorage.getItem('filterVersjon') !== 'v1') {
    localStorage.setItem('filterVersjon', 'v1');
    localStorage.removeItem('veilederState');
    localStorage.removeItem('enhetsState');
}

const renderApp = () => ReactDOM.render(<Application />, document.getElementById('mainapp'));

if (env.isDemo) {
    // eslint-disable-next-line no-console
    console.log('==========================');
    // eslint-disable-next-line no-console
    console.log('======== MED MOCK ========');
    // eslint-disable-next-line no-console
    console.log('==========================');

    import('./mocks/index').then(({worker}) =>
        worker
            .start({
                serviceWorker: {url: `${import.meta.env.BASE_URL}mockServiceWorker.js`},
                onUnhandledRequest(req, print) {
                    if (req.url.startsWith('wss://modiacontextholder.intern.dev.nav.no/ws')) {
                        return; // ignore websocket handshake warnings
                    }
                    print.warning();
                }
            })
            .then(() => renderApp())
    );
} else {
    leggTilUmamiScript();
    renderApp();
}

function hentMetrikkEndepunkt(env: DeploymentEnvironment) {
    switch (env) {
        case 'production':
            return 'https://telemetry.nav.no/collect';
        case 'development':
            return 'https://telemetry.ekstern.dev.nav.no/collect';
        case 'local':
            return 'http://localhost:12347/collect';
        default:
            return null;
    }
}

// function settOppCoreWebVitalsMetrikkRapportering() {
//     const metrikkEndepunkt = hentMetrikkEndepunkt(process.env.REACT_APP_DEPLOYMENT_ENV as DeploymentEnvironment);

//     if (metrikkEndepunkt) {
//         initializeFaro({
//             instrumentations: [new WebVitalsInstrumentation()],
//             url: metrikkEndepunkt,
//             app: {name: 'veilarbportefoljeflatefs', version: '0.0.1'}
//         });
//     } else {
//         // eslint-disable-next-line no-console
//         console.warn(
//             'Klarte ikke å hente metrikkendepunkt, initialiserer ikke Core Web Vitals metrikk rapportering. Dersom du kjører appen lokalt og ønsker å teste mot tracing-demo bruk heller "npm run start:metrics".'
//         );
//     }
// }

// Ved treghet/problemer relatert til rapportering av web vitals metrikker: fjern denne linjen og deploy på nytt
//settOppCoreWebVitalsMetrikkRapportering();
