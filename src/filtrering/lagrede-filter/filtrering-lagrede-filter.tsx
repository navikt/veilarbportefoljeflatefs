import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {Normaltekst} from 'nav-frontend-typografi';
import LagredeFilterInnhold from "./lagrede-filter_innhold";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {HandlingsType} from "../../ducks/lagret-filter";
import {STATUS} from "../../ducks/utils";


function FilteringLagredeFilter() {
    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const lagretFilter = lagretFilterState.data;

    const lagretFilterOK = () => {
        return lagretFilter.length > 0
            ? <LagredeFilterInnhold filtergruppe="veileder"
                                    lagretFilter={sortertLagredeFilter}
            />
            : <div className="lagredefilter-emptystate">
                <Normaltekst className="lagredefilter-emptystate__tekst">
                    Ingen lagrede filter
                </Normaltekst>
            </div>
    }

    const lagretFilterError = () => {
        return (
            <AlertStripeFeil>
                Det oppsto en feil, og lagrede filter kunne ikke hentes fram. Prøv igjen senere.
            </AlertStripeFeil>
        )
    }

    const sortertLagredeFilter = lagretFilter.sort((forsteFilter, andreFilter) => forsteFilter.filterNavn.localeCompare(andreFilter.filterNavn));

    return (
        <>
            {!(lagretFilterState.handlingType === HandlingsType.HENTE
                && lagretFilterState.status === STATUS.ERROR)
                ? lagretFilterOK()
                : lagretFilterError()}
        </>
    );
}

export default FilteringLagredeFilter;
