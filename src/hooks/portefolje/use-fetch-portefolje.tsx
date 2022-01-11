import {useEffect} from 'react';
import {hentArbeidslisteforVeileder, hentPortefoljeForEnhet, hentPortefoljeForVeileder} from '../../ducks/portefolje';
import {useDispatch} from 'react-redux';
import {useEnhetSelector} from '../redux/use-enhet-selector';
import {usePortefoljeSelector} from '../redux/use-portefolje-selector';
import {OversiktType, oppdaterAlternativer} from '../../ducks/ui/listevisning';
import {useSelectGjeldendeVeileder} from './use-select-gjeldende-veileder';
import {antallFilter} from '../../enhetsportefolje/enhet-side';
import {MIN_ARBEIDSLISTE} from '../../filtrering/filter-konstanter';

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
                fetchPortefoljeVeileder();
            }
        }
    }, [dispatch, enhet, sorteringsfelt, sorteringsrekkefolge, filtervalg, gjeldendeVeileder, oversiktType]);

    const fetchPortefoljeVeileder = async () => {
        await dispatch(
            hentPortefoljeForVeileder(enhet, gjeldendeVeileder, sorteringsrekkefolge, sorteringsfelt, filtervalg)
        );
        if (filtervalg.ferdigfilterListe?.includes(MIN_ARBEIDSLISTE)) {
            await dispatch(hentArbeidslisteforVeileder(enhet, gjeldendeVeileder));
        }
    };

    useEffect(() => {
        oppdaterAlternativer(dispatch, filtervalg, oversiktType);
    }, [dispatch, filtervalg, oversiktType]);
}
