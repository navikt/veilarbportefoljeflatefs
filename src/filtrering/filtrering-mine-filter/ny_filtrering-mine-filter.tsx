import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {HandlingsType, MineFilter} from "../../ducks/mine-filter";
import {STATUS} from "../../ducks/utils";
import './ny_mine-filter-innhold.less'
import NyttMineFilterInnhold from "./ny_mine-filter_innhold";

function NyFiltreringMineFilter(props: { filtergruppe: string, fjernUtilgjengeligeFilter: (elem: MineFilter) => void, sortertMineFilter }) {
    const mineFilterState = useSelector((state: AppState) => state.mineFilter);

    return (
        <>
            {(mineFilterState.handlingType === HandlingsType.HENTE
                && mineFilterState.status === STATUS.ERROR)
                ? <AlertStripeFeil>
                    Det oppsto en feil, og mine filter kunne ikke hentes fram. Prøv igjen senere.
                </AlertStripeFeil>
                : <NyttMineFilterInnhold lagretFilter={props.sortertMineFilter}
                                         filtergruppe={props.filtergruppe}
                                         fjernUtilgjengeligeFilter={props.fjernUtilgjengeligeFilter}/>}
        </>
    );
}

export default NyFiltreringMineFilter;
