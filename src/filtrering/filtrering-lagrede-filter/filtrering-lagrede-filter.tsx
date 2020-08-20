import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {Normaltekst} from 'nav-frontend-typografi';
import LagredeFilterInnhold from "./lagrede-filter_innhold";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {HandlingsType} from "../../ducks/lagret-filter";
import {STATUS} from "../../ducks/utils";

function FiltreringLagredeFilter() {
    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const lagretFilter = lagretFilterState.data;
    const sortertLagredeFilter = lagretFilter.sort((a, b) => (a.filterNavn.toLowerCase() < b.filterNavn.toLowerCase() ? -1 : (a.filterNavn.toLowerCase() > b.filterNavn.toLowerCase() ? 1 : 0)));

    const lagretFilterOK = () => {
        return lagretFilter.length > 0
            ? <LagredeFilterInnhold lagretFilter={sortertLagredeFilter}/>
            : <div className="lagredefilter-emptystate">
                <Normaltekst className="lagredefilter-emptystate__tekst">
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

export default FiltreringLagredeFilter;
