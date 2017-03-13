import { velgEnhetForVeileder } from './ducks/enheter';
import { store } from './index';
import { hentVeiledereForEnhet } from './ducks/veiledere';
import { hentPortefoljeForEnhet } from './ducks/portefolje';
import { hentPortefoljeStorrelser } from './ducks/portefoljestorrelser';
import lagHtmlMeny from './utils/meny-utils';

const hentOgDispatchAllInformasjonOmEnhet = (enhet) => {
    store.dispatch(velgEnhetForVeileder(enhet));
    store.dispatch(hentPortefoljeForEnhet(enhet));
    store.dispatch(hentVeiledereForEnhet(enhet));
    store.dispatch(hentPortefoljeStorrelser(enhet));
};

function hentInitiellEnhetFraDekoratorOgLastApp() {
    const htmlEnhetVelger = document.getElementById('dekorator-select-enhet');
    const htmlEnhetVisning = document.getElementById('dekorator-enhet-visning');

    if (htmlEnhetVelger) {
        store.dispatch(velgEnhetForVeileder(htmlEnhetVelger.value));
    } else if (htmlEnhetVisning) {
        store.dispatch(velgEnhetForVeileder(htmlEnhetVisning.innerText.split(' ')[0]));
    } else {
        // Kan ikke hente informasjon om enhet før den er satt av dekorator.
        setTimeout(hentInitiellEnhetFraDekoratorOgLastApp, 100);
    }
}


const settMenyHtmlListener = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const hodeMeny = document.getElementById('js-dekorator-nav');
        const hodeMenyKnapp = document.getElementById('js-dekorator-toggle-meny');
        hodeMenyKnapp.addEventListener('click', () => {
            hodeMeny.innerHTML = lagHtmlMeny();
        });
    });
};

export default () => {
    document.addEventListener('dekorator-hode-velg-enhet', (event) => {
        hentOgDispatchAllInformasjonOmEnhet(event.enhet);
    });
    hentInitiellEnhetFraDekoratorOgLastApp();
    settMenyHtmlListener();
};
