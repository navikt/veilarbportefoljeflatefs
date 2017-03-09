import { velgEnhetForVeileder } from './ducks/enheter';
import { store } from './index';
import { hentVeiledereForEnhet } from './ducks/veiledere';
import { hentPortefoljeForEnhet } from './ducks/portefolje';
import { hentPortefoljeStorrelser } from './ducks/portefoljestorrelser';
import queryString from 'query-string';

export const initialiserEventhandtering = () => {
    const enhet = queryString.parse(location.search).enhet;
    document.addEventListener('dekorator-hode-velg-enhet', (event) => {

        hentOgDispatchAllInformasjonOmEnhet(event.enhet);
    });
    hentOgDispatchAllInformasjonOmEnhet(enhet);
};

const hentOgDispatchAllInformasjonOmEnhet = (enhet) => {
    store.dispatch(velgEnhetForVeileder(enhet));
    store.dispatch(hentPortefoljeForEnhet(enhet));
    store.dispatch(hentVeiledereForEnhet(enhet));
    store.dispatch(hentPortefoljeStorrelser(enhet));
};
