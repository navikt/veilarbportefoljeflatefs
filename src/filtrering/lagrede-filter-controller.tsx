import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    avmarkerSisteValgtMineFilter,
    avmarkerValgtMineFilter,
    avmarkerValgtVeiledergruppe,
    markerMineFilter,
    markerValgtVeiledergruppe
} from '../ducks/lagret-filter-ui-state';
import {erObjektValuesTomt, lagretFilterValgModellErLik} from '../components/modal/mine-filter/mine-filter-utils';
import {AppState} from '../reducer';
import {OversiktType} from '../ducks/ui/listevisning';
import {veilederlisterErLik} from '../components/modal/veiledergruppe/veileder-gruppe-utils';

interface Props {
    oversiktType: OversiktType;
}

export function LagredeFilterUIController({oversiktType}: Props) {
    const dispatch = useDispatch();

    const filtreringEnhetensOversikt = useSelector((state: AppState) => state.filtreringEnhetensOversikt);
    const filtreringMinoversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const filtreringVeilederoversikt = useSelector((state: AppState) => state.filtreringVeilederoversikt);

    const lagretMineFilter = useSelector((state: AppState) => state.mineFilter.data);
    const lagretVeiledergrupper = useSelector((state: AppState) => state.veiledergrupper.data);

    useEffect(() => {
        const getFiltrering = () => {
            if (oversiktType === OversiktType.veilederOversikt) return filtreringVeilederoversikt;
            else if (oversiktType === OversiktType.minOversikt) return filtreringMinoversikt;
            else if (oversiktType === OversiktType.enhetensOversikt) return filtreringEnhetensOversikt;
        };

        const valgtMineFilter = lagretMineFilter.filter(elem =>
            lagretFilterValgModellErLik(elem.filterValg, getFiltrering())
        );
        const valgtVeiledergruppe = lagretVeiledergrupper.filter(elem =>
            veilederlisterErLik(elem.filterValg.veiledere, getFiltrering()!.veiledere)
        );

        if (erObjektValuesTomt(getFiltrering())) {
            dispatch(avmarkerSisteValgtMineFilter(oversiktType));
        }

        if (valgtMineFilter.length === 0) {
            dispatch(avmarkerValgtMineFilter(oversiktType));
        } else if (valgtMineFilter.length === 1) {
            dispatch(markerMineFilter(valgtMineFilter[0], oversiktType));
        }

        if (valgtVeiledergruppe.length === 0) {
            dispatch(avmarkerValgtVeiledergruppe(oversiktType));
        } else if (valgtVeiledergruppe.length === 1) {
            dispatch(markerValgtVeiledergruppe(valgtVeiledergruppe[0], oversiktType));
        }
    }, [
        dispatch,
        oversiktType,
        lagretMineFilter,
        lagretVeiledergrupper,
        filtreringEnhetensOversikt,
        filtreringMinoversikt,
        filtreringVeilederoversikt
    ]);

    return null;
}
