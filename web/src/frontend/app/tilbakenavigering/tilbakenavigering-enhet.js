import history from '../history';
import { store } from '../index';
import { settFiltervalg } from '../ducks/filtrering';
import { velgEnhetForVeileder } from '../ducks/enheter';
import { settValgtVeilederIKonstruktor } from '../ducks/utils';

const settValgtEnhet = (enhetId) => {
    settValgtVeilederIKonstruktor(enhetId);
    store.dispatch(velgEnhetForVeileder(enhetId));
};

function TilbakenavigeringEnhet() {
    const lagretState = JSON.parse(localStorage.previousEnhetState);

    if (lagretState.path === '/veilarbportefoljeflatefs/veiledere') {
        settValgtEnhet(lagretState.enheter.valgtEnhet.enhet.enhetId);
        history.replace('/veiledere');
    } else if (lagretState.path === '/veilarbportefoljeflatefs/enhet') {
        settValgtEnhet(lagretState.enheter.valgtEnhet.enhet.enhetId);
        store.dispatch(settFiltervalg(lagretState.filtrering.filtervalg));
        history.replace('/enhet');
    }

    return null;
}

export default TilbakenavigeringEnhet;
