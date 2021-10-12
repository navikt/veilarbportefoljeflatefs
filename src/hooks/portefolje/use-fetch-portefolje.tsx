import {useEffect} from 'react';
import {hentPortefoljeForEnhet, hentPortefoljeForVeileder} from '../../ducks/portefolje';
import {useDispatch} from 'react-redux';
import {useEnhetSelector} from '../redux/use-enhet-selector';
import {usePortefoljeSelector} from '../redux/use-portefolje-selector';
import {OversiktType, oppdaterAlternativer} from '../../ducks/ui/listevisning';
import {useSelectGjeldendeVeileder} from './use-select-gjeldende-veileder';
import {antallFilter} from '../../enhetsportefolje/enhet-side';

export function useFetchPortefolje(oversiktType: OversiktType) {
    const dispatch = useDispatch();
    const enhet = useEnhetSelector();
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const {sorteringsrekkefolge, filtervalg, sorteringsfelt} = usePortefoljeSelector(oversiktType);

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
        oppdaterAlternativer(dispatch, filtervalg, oversiktType);
    }, [dispatch, filtervalg, oversiktType]);
}
