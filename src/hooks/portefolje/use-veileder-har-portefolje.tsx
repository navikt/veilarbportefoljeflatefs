import {useSelector} from 'react-redux';
import {useIdentSelector} from '../redux/use-innlogget-ident';
import {AppState} from '../../reducer';

export function useVeilederHarPortefolje() {
    const innloggetVeileder = useIdentSelector();
    const identId = innloggetVeileder?.ident;

    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser.data.facetResults);
    const veilederPortefolje = portefoljestorrelser.find(v => v.value === identId);

    return veilederPortefolje ? veilederPortefolje.count > 0 : false;
}
