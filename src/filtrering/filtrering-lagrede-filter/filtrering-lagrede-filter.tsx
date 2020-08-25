import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import LagredeFilterInnhold from "./lagrede-filter_innhold";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {HandlingsType} from "../../ducks/lagret-filter";
import {STATUS} from "../../ducks/utils";

function FiltreringLagredeFilter(props: { filtergruppe: string }) {
    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const lagretFilter = lagretFilterState.data;
    const sortertLagredeFilter = lagretFilter.sort((a, b) => (a.filterNavn.toLowerCase() < b.filterNavn.toLowerCase() ? -1 : (a.filterNavn.toLowerCase() > b.filterNavn.toLowerCase() ? 1 : 0)));

    return (
        <>
            {(lagretFilterState.handlingType === HandlingsType.HENTE
                && lagretFilterState.status === STATUS.ERROR)
                ? <AlertStripeFeil>
                    Det oppsto en feil, og mine filter kunne ikke hentes fram. Prøv igjen senere.
                </AlertStripeFeil>
                : <LagredeFilterInnhold lagretFilter={sortertLagredeFilter}
                                        filtergruppe={props.filtergruppe}/>}
        </>
    );
}

export default FiltreringLagredeFilter;
