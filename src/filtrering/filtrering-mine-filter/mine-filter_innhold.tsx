import React, {useEffect, useRef} from 'react';
import {MineFilter} from '../../ducks/mine-filter';
import './mine-filter_innhold.less'
import {PopoverOrientering} from "nav-frontend-popover";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import hiddenIf from "../../components/hidden-if/hidden-if";
import {Normaltekst} from "nav-frontend-typografi";
import MineFilterRad from "./mine-filter-rad";
import {useFeatureSelector} from "../../hooks/redux/use-feature-selector";
import {REDESIGN} from "../../konstanter";
import {useWindowWidth} from "../../hooks/use-window-width";

interface MineFilterInnholdProps {
    mineFilter: MineFilter[];
    filtergruppe: string;
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function MineFilterInnhold(props: MineFilterInnholdProps) {
    const erPaMinOversikt = props.filtergruppe === 'minOversikt';
    const erPaEnhetensOversikt = props.filtergruppe === 'enhetensOversikt';
    const erRedesignFeatureTogglePa = useFeatureSelector()(REDESIGN);

    const fjernUtilgjengeligeFilter = (elem) => {
        const arbeidsliste = elem.filterValg.ferdigfilterListe.includes("MIN_ARBEIDSLISTE");
        const arbeidslisteKategori = elem.filterValg.arbeidslisteKategori.length > 0;
        const veiledergrupper = elem.filterValg.veiledere.length > 0;
        const nyeBrukere = elem.filterValg.ferdigfilterListe.includes("NYE_BRUKERE_FOR_VEILEDER");
        const ufordelteBrukere = elem.filterValg.ferdigfilterListe.includes("UFORDELTE_BRUKERE");

        return !((erPaEnhetensOversikt && (arbeidsliste || arbeidslisteKategori || nyeBrukere)) ||
            (erPaMinOversikt && (veiledergrupper || ufordelteBrukere)));

    }

    const HiddenHjelpetekst = hiddenIf(Hjelpetekst)

    const outerDivRef = useRef<HTMLDivElement>(null);
    const filtrertListe = () => {
        return props.mineFilter.filter(elem => fjernUtilgjengeligeFilter(elem))
    }

    useEffect(() => {
        if (outerDivRef.current && isOverflown(outerDivRef.current)) {
            outerDivRef.current.style.borderTop = '1px solid #888888';
            outerDivRef.current.style.borderBottom = '1px solid #888888';
        }
    });

    const hentFiltrertListeinnhold = () => {
        return (
            <div className='mine-filter__valgfelt' ref={outerDivRef}>
                {filtrertListe().map((filter, idx) =>
                    <MineFilterRad
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
            <div className="mine-filter-emptystate">
                <Normaltekst className="mine-filter-emptystate__tekst">
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
            <HiddenHjelpetekst
                type={useWindowWidth() < 1200 ? PopoverOrientering.Venstre : PopoverOrientering.Over}
                hidden={filtrertListe().length === props.mineFilter.length}
                className={erRedesignFeatureTogglePa ? 'ny__hjelpetekst' : 'gammelt__hjelpetekst'}>
                {erPaMinOversikt && "Filter som inneholder Veiledergrupper og Ufordelte brukere er ikke tilgjengelig i Min oversikt."}
                {erPaEnhetensOversikt && "Filter som inneholder Arbeidslisten og Nye brukere er ikke tilgjengelig i Enhetens oversikt."}
            </HiddenHjelpetekst>
            {hentInnhold()}
        </>
    )
}


export default MineFilterInnhold;
