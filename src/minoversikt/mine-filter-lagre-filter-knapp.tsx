import * as React from 'react';
import {useEffect, useState} from 'react';
import {erObjektValuesTomt, lagretFilterValgModellErLik} from '../components/modal/mine-filter/mine-filter-utils';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../reducer';
import {apneMineFilterModal} from '../ducks/lagret-filter-ui-state';
import {OversiktType} from '../ducks/ui/listevisning';
import {Button} from '@navikt/ds-react';

export function MineFilterLagreFilterKnapp(props: {oversiktType: string}) {
    const [erLagreKnappSkjult, setErLagreKnappSkjult] = useState(true);
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const filtreringEnhetensOversikt = useSelector((state: AppState) => state.filtreringEnhetensOversikt);

    const erPaMinOversikt = props.oversiktType === OversiktType.minOversikt;
    const erPaEnhetensOversikt = props.oversiktType === OversiktType.enhetensOversikt;

    const filtrering = useSelector((state: AppState) =>
        erPaMinOversikt ? state.filtreringMinoversikt : state.filtreringEnhetensOversikt
    );
    const mineFilterList = useSelector((state: AppState) => state.mineFilter.data);
    const valgtMineFilter = !mineFilterList.find(elem => lagretFilterValgModellErLik(elem.filterValg, filtrering));

    const dispatch = useDispatch();

    function lagreFilterModal(event) {
        event.preventDefault();
        dispatch(apneMineFilterModal(props.oversiktType));
    }

    useEffect(() => {
        const ingenFilterValgt = erPaMinOversikt
            ? erObjektValuesTomt(filtreringMinOversikt)
            : erObjektValuesTomt(filtreringEnhetensOversikt);

        if (
            (erPaMinOversikt && valgtMineFilter && !ingenFilterValgt) ||
            (erPaEnhetensOversikt && valgtMineFilter && !ingenFilterValgt)
        ) {
            setErLagreKnappSkjult(false);
        } else {
            setErLagreKnappSkjult(true);
        }
    }, [
        filtreringMinOversikt,
        filtreringEnhetensOversikt,
        erPaMinOversikt,
        erPaEnhetensOversikt,
        erLagreKnappSkjult,
        valgtMineFilter
    ]);

    return (
        <Button
            variant="secondary"
            className="lagre-filter-knapp"
            hidden={erLagreKnappSkjult}
            data-testid="lagre-filter_knapp"
            onClick={event => lagreFilterModal(event)}
        >
            Lagre filter
        </Button>
    );
}
