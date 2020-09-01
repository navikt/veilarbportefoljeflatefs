import React, {useEffect, useRef} from 'react';
import './ny_mine-filter-innhold.less'
import '../../components/sidebar/sidebar.less'
import {MineFilter} from "../../ducks/mine-filter";
import {Normaltekst} from "nav-frontend-typografi";
import NyMineFilterRad from "./ny_mine-filter-rad";

interface MineFilterInnholdProps {
    lagretFilter: MineFilter[];
    filtergruppe: string;
    fjernUtilgjengeligeFilter: (elem: MineFilter) => void;
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function NyMineFilterInnhold(props: MineFilterInnholdProps) {
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
            <div className="ny__mine-filter__valgfelt" ref={outerDivRef}>
                {filtrertListe().map((filter, idx) =>
                    <NyMineFilterRad
                        key={idx}
                        filter={filter}
                        filtergruppe={props.filtergruppe}
                    />
                )}
            </div>)
    }

    const getEmptyState = () => {
        return (
            <div className="mine-filter-emptystate">
                <Normaltekst className="mine-filter-emptystate__tekst">
                    Ingen lagrede filter
                </Normaltekst>
            </div>
        )
    }

    return (
        filtrertListe().length > 0 ? hentFiltrertListeinnhold() : getEmptyState()
    )
}

export default NyMineFilterInnhold;
