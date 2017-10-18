import getStore from './store';
import { oppdaterAktivEnhet } from './components/enhet-context/context-api';
import { visFeilmodal } from './components/enhet-context/context-reducer';

/* eslint-disable no-undef */
const handlePersonsokSubmit = (fnr) => {
    window.location.pathname = `veilarbpersonflatefs/${fnr}`;
};

const handleChangeEnhet = (enhet, type) => {
    const onSuccess = () => window.location.search = (`?enhet=${enhet}&clean`);
    const onError = () => getStore().dispatch(visFeilmodal());

    if (type !== 'init') {
        oppdaterAktivEnhet(enhet).then(onSuccess, onError);
    }
};

function finnMiljoStreng() {
    const host = window.location.host;
    const bindestrekIndex = host.indexOf('-');
    if (bindestrekIndex === -1) {
        return '';
    }
    const dotIndex = host.indexOf('.');
    return host.substring(bindestrekIndex + 1, dotIndex);
}

export function erstattMiljoPlaceholder(lenke) {
    const miljoStreng = finnMiljoStreng();
    if (miljoStreng) {
        return lenke.replace('{{miljoStreng}}', `-${miljoStreng}`);
    }
    return lenke.replace('{{miljoStreng}}', miljoStreng);
}

const getConfig = (initiellEnhet = undefined) => {
    const modiaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/modiabrukerdialog');
    const miaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/mia');

    const lenker = {
        lenker: [
            [miaUrl, 'Arbeidsmarkedet'],
            [`/veilarbportefoljeflatefs/enhet?enhet=${initiellEnhet}&clean`, 'Enhetens oversikt'],
            [`/veilarbportefoljeflatefs/portefolje?enhet=${initiellEnhet}&clean`, 'Min oversikt'],
            [modiaUrl, 'Modia']
        ],
        tittel: ''
    };

    const config = {
        config: {
            dataSources: {
                veileder: '/veilarbveileder/tjenester/veileder/me',
                enheter: '/veilarbveileder/tjenester/veileder/enheter'
            },
            toggles: {
                visEnhet: false,
                visEnhetVelger: true,
                visSokefelt: true,
                visVeileder: true
            },
            handleChangeEnhet,
            handlePersonsokSubmit,
            initiellEnhet,
            egendefinerteLenker: lenker,
            applicationName: 'Arbeidsrettet oppfølging'
        }
    };
    return config;
};

export default () => {
    if ((window as any).renderDecoratorHead) {
        (window as any).renderDecoratorHead(getConfig());
    } else {
        window.location.href = 'feilsider/500.html';
    }
};

export const settEnhetIDekorator = (initiellEnhet) => {
    (window as any).renderDecoratorHead(getConfig(initiellEnhet));
};
