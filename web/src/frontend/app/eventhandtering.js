 import { velgEnhetForVeileder } from './ducks/enheter';
import { store } from './index';
import { hentVeiledereForEnhet } from './ducks/veiledere';
import { hentPortefoljeForEnhet } from './ducks/portefolje';
import { hentPortefoljeStorrelser } from './ducks/portefoljestorrelser';

const hentOgDispatchAllInformasjonOmEnhet = (enhet) => {
    store.dispatch(velgEnhetForVeileder({ enhetId: enhet }));
    store.dispatch(hentPortefoljeForEnhet(enhet));
    store.dispatch(hentVeiledereForEnhet(enhet));
    store.dispatch(hentPortefoljeStorrelser(enhet));
};

const handlePersonsokSubmit = (fnr) => {
    window.location.pathname = `veilarbpersonflatefs/${fnr}`;
};

const handleChangeEnhet = (enhet) => {
    hentOgDispatchAllInformasjonOmEnhet(enhet);
};

const getConfig = (initiellEnhet = undefined) => {
    const lenker =
        {
            lenker: [
                ['/mia', 'Arbeidsmarkedet'],
                ['/veilarbportefoljeflatefs/enhet/', 'Enhetsportefolje'],
                ['/veilarbportefoljeflatefs/portefolje', 'Veilederportefølje'],
                ['/modiabrukerdialog', 'Modia']
            ],
            tittel: ''
        };

    const config = {
        config: {
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
            applicationName: 'Oppfølging'
        }
    };
    return config;
};

export default () => {
    if (window.renderDecoratorHead) {
        window.renderDecoratorHead(getConfig());
    } else {
        window.location.href = 'feilsider/500.html';
    }
};


export const settEnhetIDekorator = (initiellEnhet) => {
    window.renderDecoratorHead(getConfig(initiellEnhet));
};
