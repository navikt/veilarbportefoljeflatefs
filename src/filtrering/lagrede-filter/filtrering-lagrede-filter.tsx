import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {Normaltekst} from 'nav-frontend-typografi';
import LagredeFilterInnhold from "./lagrede-filter_innhold";
import {AlertStripeFeil} from "nav-frontend-alertstriper";


interface FilteringLagredeFilterProps {
    filtergruppe?: string;
}

function FilteringLagredeFilter({filtergruppe}: FilteringLagredeFilterProps) {
    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const lagretFilter = lagretFilterState.data;

    const lagretFilterOK = () => {
        return lagretFilter.length > 0
            ? <LagredeFilterInnhold
                lagretFilter={sortertLagredeFilter}
                filtergruppe={filtergruppe}
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

    // const dispatch = useDispatch();
    // const enhet = useEnhetSelector();

    // const submitEndringer = (gruppeNavn: string, filterValg: FiltervalgModell) => {
    //     enhet && dispatch(lageNyGruppe({
    //         filterNavn: gruppeNavn,
    //         filterValg
    //     }, enhet)).then(resp => dispatch(endreFiltervalg('veiledere', resp.data.filterValg.veiledere, filtergruppe)));
    // };
    const sortertLagredeFilter = lagretFilter.sort((forsteFilter, andreFilter) => forsteFilter.filterNavn.localeCompare(andreFilter.filterNavn));

    return (
        <>
            {
                !lagretFilterState.error ? lagretFilterOK() : lagretFilterError()
            }
        </>
    );
}

export default FilteringLagredeFilter;
