import React, {useRef} from 'react';
import {Radio} from 'nav-frontend-skjema'
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import './ny_lagrede-filter-innhold.less'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {logEvent} from "../../utils/frontend-logger";
import {finnSideNavn, mapVeilederIdentTilNonsens} from "../../middleware/metrics-middleware";
import {velgLagretFilter} from "../../ducks/filtrering";
import '../../components/sidebar/sidebar.less'
import Hjelpetekst from "nav-frontend-hjelpetekst";
import {PopoverOrientering} from "nav-frontend-popover";
import {LagretFilter} from "../../ducks/lagret-filter";
import {apenLagreFilterModal} from "../../ducks/lagret-filter-ui";

interface LagredeFilterInnholdProps {
    lagretFilter: LagretFilter[];
    filtergruppe: string;
}

function NyLagredeFilterInnhold(props: LagredeFilterInnholdProps) {
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

    const outerDivRef = useRef<HTMLDivElement>(null);
    const filtrertListe = () => {
        return props.lagretFilter.filter(elem => fjernUtilgjengeligeFilter(elem))
    }
    return (
        <>
            <Hjelpetekst type={PopoverOrientering.Venstre}>
                {erPaMinOversikt && "Filter som inneholder Veiledergrupper og “Ufordelte brukere” er ikke tilgjengelig i Min oversikt."}
                {erPaEnhetensOversikt && "Filter som inneholder Arbeidslisten og “Nye brukere” er ikke tilgjengelig i Enhetens oversikt."}
            </Hjelpetekst>

            <div className='ny__lagrede-filter__valgfelt' ref={outerDivRef}>
                {filtrertListe().map((filter, idx) =>
                    <LagretFilterRad
                        key={idx}
                        filter={filter}
                        filtergruppe={props.filtergruppe}
                    />
                )}
            </div>
        </>
    );
}

interface LagretFilterRadProps {
    filter: LagretFilter;
    filtergruppe: string;
}

function LagretFilterRad({filter, filtergruppe}: LagretFilterRadProps) {
    const dispatch = useDispatch();

    const valgtLagretFilter = useSelector((state: AppState) => filtergruppe === "veileder"
        ? state.lagretFilterMinOversikt.valgtLagretFilter
        : state.lagretFilterEnhetensOversikt.valgtLagretFilter);
    const veilederIdent = useSelector((state: AppState) => state.inloggetVeileder.data!);
    const veilederIdentTilNonsens = mapVeilederIdentTilNonsens(veilederIdent.ident);

    function velgFilter(event) {
        logEvent('portefolje.metrikker.lagredefilter.valgt-lagret-filter',
            {}, {filterId: filter.filterId, sideNavn: finnSideNavn(), id: veilederIdentTilNonsens});
        dispatch(velgLagretFilter(filter, filtergruppe))
    }

    function onClickRedigerKnapp() {
        dispatch(apenLagreFilterModal(filtergruppe))
    }

    return (
        <div className="ny__lagrede-filter__rad">
            <Radio
                className="ny__lagrede-filter__filternavn"
                key={filter.filterId}
                name="lagretFilter"
                label={filter.filterNavn}
                value={filter.filterId}
                onChange={(event) => velgFilter(event)}
                checked={valgtLagretFilter?.filterId === filter.filterId}
            />
            <RedigerKnapp
                hidden={valgtLagretFilter?.filterId !== filter.filterId}
                aria="Rediger lagret filter"
                onClick={onClickRedigerKnapp}
            />
        </div>
    );
}

export default NyLagredeFilterInnhold;
