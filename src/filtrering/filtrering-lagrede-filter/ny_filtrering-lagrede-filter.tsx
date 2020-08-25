import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {HandlingsType, LagretFilter} from "../../ducks/lagret-filter";
import {STATUS} from "../../ducks/utils";
import './ny_lagrede-filter-innhold.less'
import NyLagredeFilterInnhold from "./ny_lagrede-filter_innhold";

function NyFiltreringLagredeFilter(props: { filtergruppe: string, fjernUtilgjengeligeFilter: (elem: LagretFilter) => void, sortertLagredeFilter }) {
    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);

    return (
        <>
            {(lagretFilterState.handlingType === HandlingsType.HENTE
                && lagretFilterState.status === STATUS.ERROR)
                ? <AlertStripeFeil>
                    Det oppsto en feil, og mine filter kunne ikke hentes fram. Prøv igjen senere.
                </AlertStripeFeil>
                : <NyLagredeFilterInnhold lagretFilter={props.sortertLagredeFilter}
                                          filtergruppe={props.filtergruppe}
                                          fjernUtilgjengeligeFilter={props.fjernUtilgjengeligeFilter}/>}
        </>
    );
}

export default NyFiltreringLagredeFilter;
