import {useEffect} from 'react';
import {hentPortefoljeForEnhet, hentPortefoljeForVeileder} from '../../ducks/portefolje';
import {useDispatch} from 'react-redux';
import {useEnhetSelector} from '../redux/use-enhet-selector';
import {usePortefoljeSelector} from '../redux/use-portefolje-selector';
import {ListevisningType, oppdaterAlternativer} from '../../ducks/ui/listevisning';
import {useSelectGjeldendeVeileder} from './use-select-gjeldende-veileder';

export function useFetchPortefolje(filtergruppe: ListevisningType) {
    const dispatch = useDispatch();
    const enhet = useEnhetSelector();
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const {sorteringsrekkefolge, filtervalg, sorteringsfelt} = usePortefoljeSelector(filtergruppe);

    useEffect(() => {
        if (enhet && sorteringsrekkefolge && sorteringsfelt) {
            if (filtergruppe === ListevisningType.enhetensOversikt) {
                dispatch(hentPortefoljeForEnhet(enhet, sorteringsrekkefolge, sorteringsfelt, filtervalg));
            } else if (filtergruppe === ListevisningType.minOversikt && gjeldendeVeileder) {
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
    }, [dispatch, enhet, sorteringsfelt, sorteringsrekkefolge, filtervalg, gjeldendeVeileder, filtergruppe]);

    useEffect(() => {
        oppdaterAlternativer(dispatch, filtervalg, filtergruppe);
    }, [dispatch, filtervalg, filtergruppe]);
}
