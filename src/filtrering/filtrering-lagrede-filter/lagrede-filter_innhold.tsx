import React, {useEffect, useRef} from 'react';
import {LagretFilter} from '../../ducks/lagret-filter';
import './lagrede-filter_innhold.less'
import {PopoverOrientering} from "nav-frontend-popover";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import hiddenIf from "../../components/hidden-if/hidden-if";
import {Normaltekst} from "nav-frontend-typografi";
import LagretFilterRad from "./lagret-filter-rad";

interface LagredeFilterInnholdProps {
    lagretFilter: LagretFilter[];
    filtergruppe: string;
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function LagredeFilterInnhold(props: LagredeFilterInnholdProps) {
    const erPaMinOversikt = props.filtergruppe === "veileder";
    const erPaEnhetensOversikt = props.filtergruppe === "enhet";

    const fjernUtilgjengeligeFilter = (elem) => {
        const arbeidsliste = elem.filterValg.ferdigfilterListe.includes("MIN_ARBEIDSLISTE");
        const arbeidslisteKategori = elem.filterValg.arbeidslisteKategori.length > 0;
        const veiledergrupper = elem.filterValg.veiledere.length > 0;
        const nyeBrukere = elem.filterValg.ferdigfilterListe.includes("NYE_BRUKERE_FOR_VEILEDER");
        const ufordelteBrukere = elem.filterValg.ferdigfilterListe.includes("UFORDELTE_BRUKERE");

        if ((erPaEnhetensOversikt && (arbeidsliste || arbeidslisteKategori || nyeBrukere)) ||
            (erPaMinOversikt && (veiledergrupper || ufordelteBrukere))) {
            return false;
        }
        return true;
    }

    const HiddenHjelpetekst = hiddenIf(Hjelpetekst)

    const outerDivRef = useRef<HTMLDivElement>(null);
    const filtrertListe = () => {
        return props.lagretFilter.filter(elem => fjernUtilgjengeligeFilter(elem))
    }

    useEffect(() => {
        if (outerDivRef.current && isOverflown(outerDivRef.current)) {
            outerDivRef.current.style.borderTop = '1px solid #888888';
            outerDivRef.current.style.borderBottom = '1px solid #888888';
        }
    });

    const hentFiltrertListeinnhold = () => {
        return (
            <div className='lagrede-filter__valgfelt' ref={outerDivRef}>
                {filtrertListe().map((filter, idx) =>
                    <LagretFilterRad
                        key={idx}
                        filter={filter}
                        filtergruppe={props.filtergruppe}
                        parentDiv={outerDivRef}
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

    const hentInnhold = () => {
        return filtrertListe().length > 0 ? hentFiltrertListeinnhold() : getEmptyState()
    }

    return (
        <>
            <div className="hjelpetekst__wrapper">
                <HiddenHjelpetekst type={PopoverOrientering.Over}
                                   hidden={filtrertListe().length === props.lagretFilter.length}>
                    {erPaMinOversikt && "Filter som inneholder Veiledergrupper og Ufordelte brukere er ikke tilgjengelig i Min oversikt."}
                    {erPaEnhetensOversikt && "Filter som inneholder Arbeidslisten og Nye brukere er ikke tilgjengelig i Enhetens oversikt."}
                </HiddenHjelpetekst>
            </div>
            {hentInnhold()}
        </>
    )
}


export default LagredeFilterInnhold;
