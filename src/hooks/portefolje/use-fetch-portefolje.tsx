import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hentPortefoljeForEnhet, hentPortefoljeForVeileder} from '../../ducks/portefolje';
import {useEnhetSelector} from '../redux/use-enhet-selector';
import {usePortefoljeSelector} from '../redux/use-portefolje-selector';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import {useSelectGjeldendeVeileder} from './use-select-gjeldende-veileder';
import {antallFilter} from '../../enhetsportefolje/enhet-side';
import {AppState} from '../../reducer';
import {initialState as filtreringsInitialState} from '../../ducks/filtrering';
import {lagretFilterValgModellErLik} from '../../components/modal/mine-filter/mine-filter-utils';

export function useFetchPortefolje(oversiktType: OversiktType) {
    const dispatch = useDispatch();
    const enhet = useEnhetSelector();
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const {sorteringsrekkefolge, filtervalg, sorteringsfelt} = usePortefoljeSelector(oversiktType);
    const filtreringMinoversikt = useSelector((state: AppState) => state.filtreringMinoversikt);

    useEffect(() => {
        if (enhet && sorteringsrekkefolge && sorteringsfelt) {
            if (oversiktType === OversiktType.enhetensOversikt && antallFilter(filtervalg)) {
                dispatch(hentPortefoljeForEnhet(enhet, sorteringsrekkefolge, sorteringsfelt, filtervalg));
            } else if (oversiktType === OversiktType.minOversikt && gjeldendeVeileder) {
                dispatch(
                    hentPortefoljeForVeileder(
                        enhet,
                        gjeldendeVeileder,
                        sorteringsrekkefolge,
                        sorteringsfelt,
                        filtervalg
                    )
                );
            }
        }
    }, [dispatch, enhet, sorteringsfelt, sorteringsrekkefolge, filtervalg, gjeldendeVeileder, oversiktType]);

    useEffect(() => {
        if (
            oversiktType === OversiktType.minOversikt &&
            lagretFilterValgModellErLik(filtreringMinoversikt, filtreringsInitialState)
        ) {
            oppdaterKolonneAlternativer(dispatch, filtervalg, oversiktType);
        }
    }, [oversiktType, filtreringMinoversikt, filtervalg, dispatch]);
}
