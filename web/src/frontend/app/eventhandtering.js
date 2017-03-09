import { velgEnhetForVeileder } from './ducks/enheter';
import { store } from './index';
import { hentVeiledereForEnhet } from './ducks/veiledere';
import { hentPortefoljeForEnhet } from './ducks/portefolje';

export const initialiserEventhandtering = () => {

    document.addEventListener('dekorator-hode-velg-enhet', (event) => {
        store.dispatch(velgEnhetForVeileder( event.enhet));
        store.dispatch(hentPortefoljeForEnhet(event.enhet));
        store.dispatch(hentVeiledereForEnhet(event.enhet));
    })
};
