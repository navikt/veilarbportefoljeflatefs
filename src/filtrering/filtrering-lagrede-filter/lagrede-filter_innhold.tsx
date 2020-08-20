import React, {useRef} from 'react';
import {Radio} from 'nav-frontend-skjema'
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import {apenLagreFilterModal, LagretFilter} from '../../ducks/lagret-filter';
import './lagrede-filter_innhold.less'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {velgLagretFilter} from "../../ducks/filtrering";
import {logEvent} from "../../utils/frontend-logger";
import {finnSideNavn, mapVeilederIdentTilNonsens} from "../../middleware/metrics-middleware";
import {AlertStripeInfo} from "nav-frontend-alertstriper";
import hiddenIf from "../../components/hidden-if/hidden-if";

interface LagredeFilterInnholdProps {
    lagretFilter: LagretFilter[];
    filtergruppe: string;
}

const HiddenAlertStripe = hiddenIf(AlertStripeInfo)

function LagredeFilterInnhold(props: LagredeFilterInnholdProps) {
    const outerDivRef = useRef<HTMLDivElement>(null);
    const className = (props.lagretFilter.length >= 7) ? 'lagrede-filter__valgfelt__lang' : 'lagrede-filter__valgfelt'

    const erPaMinOversikt = props.filtergruppe === "veileder";
    const erPaEnhetensOversikt = props.filtergruppe === "enhet";

    const leavePossibleFilters = (elem) => {
        const arbeidsliste = elem.filterValg.ferdigfilterListe.includes("MIN_ARBEIDSLISTE");
        const arbeidslisteKategori = elem.filterValg.arbeidslisteKategori.length > 0;
        const veiledergrupper = elem.filterValg.veiledere.length > 0;
        const nyeBrukere = elem.filterValg.ferdigfilterListe.includes("NYE_BRUKERE_FOR_VEILEDER");
        const ufordelteBrukere = elem.filterValg.ferdigfilterListe.includes("UFORDELTE_BRUKERE");

        if (erPaEnhetensOversikt && (arbeidsliste || arbeidslisteKategori || nyeBrukere)) {
            return false;
        }
        else if (erPaMinOversikt && (veiledergrupper || ufordelteBrukere)) {
            return false;
        }
        return true;
    }

    return (
        <>
            <HiddenAlertStripe hidden={false}>
                {erPaMinOversikt && "Filter som inneholder Veiledergrupper og “Ufordelte brukere” er ikke tilgjengelig"}
                {erPaEnhetensOversikt && "Filter som inneholder Arbeidslisten og “Nye brukere” er ikke tilgjengelig"}
            </HiddenAlertStripe>
            <div className={className} ref={outerDivRef}>
                {props.lagretFilter.filter(elem => leavePossibleFilters(elem))
                    .map((filter, idx) =>
                        <LagretFilterRad
                            key={idx}
                            filter={filter}
                            filtergruppe={props.filtergruppe}
                        />
                    )}
            </div>
        </>
    )
        ;
}

interface LagretFilterRadProps {
    filter: LagretFilter;
    filtergruppe: string;
}

function LagretFilterRad({filter, filtergruppe}: LagretFilterRadProps) {
    const dispatch = useDispatch();

    const valgtLagretFilter = useSelector((state: AppState) => filtergruppe === "enhet" ? state.lagretFilterEnhetensOversikt.valgtLagretFilter : state.lagretFilterMinOversikt.valgtLagretFilter);
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
        <div className="lagrede-filter__rad">
            <Radio
                className="lagrede-filter__filternavn"
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

export default LagredeFilterInnhold;
