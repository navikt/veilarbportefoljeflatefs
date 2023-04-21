import {useEffect} from 'react';
import {hentArbeidslisteforVeileder, hentPortefoljeForEnhet, hentPortefoljeForVeileder} from '../../ducks/portefolje';
import {useDispatch} from 'react-redux';
import {useEnhetSelector} from '../redux/use-enhet-selector';
import {usePortefoljeSelector} from '../redux/use-portefolje-selector';
import {OversiktType} from '../../ducks/ui/listevisning';
import {useSelectGjeldendeVeileder} from './use-select-gjeldende-veileder';
import {antallFilter} from '../../enhetsportefolje/enhet-side';
import {STATUS} from '../../ducks/utils';

export function useFetchPortefolje(oversiktType: OversiktType) {
    const dispatch = useDispatch();
    const enhet = useEnhetSelector();
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const {sorteringsrekkefolge, filtervalg, sorteringsfelt, portefolje} = usePortefoljeSelector(oversiktType);

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
            enhet &&
            gjeldendeVeileder &&
            portefolje.status === STATUS.OK &&
            oversiktType === OversiktType.minOversikt
        ) {
            dispatch(hentArbeidslisteforVeileder(enhet, gjeldendeVeileder));
        }
    }, [dispatch, enhet, gjeldendeVeileder, oversiktType, portefolje.status]);
}
