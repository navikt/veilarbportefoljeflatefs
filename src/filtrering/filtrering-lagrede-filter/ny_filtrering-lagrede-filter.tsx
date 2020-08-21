import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {Normaltekst} from 'nav-frontend-typografi';
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {HandlingsType, LagretFilter} from "../../ducks/lagret-filter";
import {STATUS} from "../../ducks/utils";
import NyLagredeFilterInnhold from "./ny_lagrede-filter_innhold";
import './ny_lagrede-filter-innhold.less'

function NyFiltreringLagredeFilter(props: { filtergruppe: string, fjernUtilgjengeligeFilter: (elem: LagretFilter) => void, sortertLagredeFilter }) {
    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const lagretFilter = lagretFilterState.data;

    const lagretFilterOK = () => {
        return lagretFilter.length > 0
            ? <NyLagredeFilterInnhold lagretFilter={props.sortertLagredeFilter} filtergruppe={props.filtergruppe}
                                      fjernUtilgjengeligeFilter={props.fjernUtilgjengeligeFilter}/>
            : <div className="ny__lagredefilter-emptystate">
                <Normaltekst className="ny__lagredefilter-emptystate__tekst">
                    Ingen lagrede filter
                </Normaltekst>
            </div>
    }

    const lagretFilterError = () => {
        return (
            <AlertStripeFeil>
                Det oppsto en feil, og mine filter kunne ikke hentes fram. Prøv igjen senere.
            </AlertStripeFeil>
        )
    }

    return (
        <>
            {(lagretFilterState.handlingType === HandlingsType.HENTE
                && lagretFilterState.status === STATUS.ERROR)
                ? lagretFilterError()
                : lagretFilterOK()}
        </>
    );
}

export default NyFiltreringLagredeFilter;
