import React, {useEffect, useRef} from 'react';
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

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function NyLagredeFilterInnhold(props: LagredeFilterInnholdProps) {
    const outerDivRef = useRef<HTMLDivElement>(null);
    const filtrertListe = () => {
        return props.lagretFilter.filter(elem => props.fjernUtilgjengeligeFilter(elem))
    }

    useEffect(() => {
        if (outerDivRef.current && isOverflown(outerDivRef.current)) {
            outerDivRef.current.style.borderTop = '1px solid #888888';
            outerDivRef.current.style.borderBottom = '1px solid #888888';
        }
    });

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
