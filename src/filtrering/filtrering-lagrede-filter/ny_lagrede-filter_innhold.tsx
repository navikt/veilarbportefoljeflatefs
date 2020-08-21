import React, {useRef} from 'react';
import './ny_lagrede-filter-innhold.less'
import '../../components/sidebar/sidebar.less'
import {LagretFilter} from "../../ducks/lagret-filter";
import {Normaltekst} from "nav-frontend-typografi";
import NyLagretFilterRad from "./ny_lagret-filter-rad";

interface LagredeFilterInnholdProps {
    lagretFilter: LagretFilter[];
    filtergruppe: string;
    fjernUtilgjengeligeFilter: (elem: LagretFilter) => void;
}

function NyLagredeFilterInnhold(props: LagredeFilterInnholdProps) {
    const outerDivRef = useRef<HTMLDivElement>(null);
    const filtrertListe = () => {
        return props.lagretFilter.filter(elem => props.fjernUtilgjengeligeFilter(elem))
    }

    const hentFiltrertListeinnhold = () => {
        return (
            <div className="ny__lagrede-filter__valgfelt" ref={outerDivRef}>
                {filtrertListe().map((filter, idx) =>
                    <NyLagretFilterRad
                        key={idx}
                        filter={filter}
                        filtergruppe={props.filtergruppe}
                    />
                )}
            </div>)
    }

    const getEmptyState = () => {
        return (
            <div className="lagredefilter-emptystate">
                <Normaltekst className="lagredefilter-emptystate__tekst">
                    Ingen lagrede filter
                </Normaltekst>
            </div>
        )
    }

    return (
        filtrertListe().length > 0 ? hentFiltrertListeinnhold() : getEmptyState()
    )
}

export default NyLagredeFilterInnhold;
