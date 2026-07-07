import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {hentEnhetTiltak, hentTiltakstyperForEnhet} from '../../ducks/enhettiltak';
import {AppState} from '../../reducer';
import {useEnhetSelector} from '../redux/use-enhet-selector';
import {hentPortefoljeStorrelser} from '../../ducks/portefoljestorrelser';
import {hentVeiledereForEnhet} from '../../ducks/veiledere';
import {hentLagretFilterForEnhet} from '../../ducks/veiledergrupper_filter';
import {hentGeografiskBosted} from '../../ducks/geografiskBosted';
import {hentFoedelandList} from '../../ducks/foedeland';
import {hentTolkebehovSpraak} from '../../ducks/tolkebehov';

import {useAppDispatch} from '../redux/use-app-dispatch';
import {useFeatureSelector} from '../redux/use-feature-selector';
import {BRUK_TILTAKSAKTIVITET_FRA_AKTIVITETSPLAN} from '../../konstanter';

export function useFetchPortefoljeData() {
    const dispatch = useAppDispatch();
    const enhet = useEnhetSelector();
    const hentTiltakstyperFraNyKilde = useFeatureSelector()(BRUK_TILTAKSAKTIVITET_FRA_AKTIVITETSPLAN);
    const enhettiltak = useSelector((state: AppState) => state.enhettiltak);
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);
    const veiledere = useSelector((state: AppState) => state.veiledere);

    useEffect(() => {
        if (enhet) {
            dispatch(hentPortefoljeStorrelser(enhet));
            dispatch(hentVeiledereForEnhet(enhet));
            hentTiltakstyperFraNyKilde ? dispatch(hentTiltakstyperForEnhet(enhet)) : dispatch(hentEnhetTiltak(enhet));
            dispatch(hentLagretFilterForEnhet(enhet));
            dispatch(hentFoedelandList(enhet));
            dispatch(hentTolkebehovSpraak(enhet));
            dispatch(hentGeografiskBosted(enhet));
        }
    }, [enhet, dispatch]);

    return {enhettiltak, portefoljestorrelser, veiledere};
}
