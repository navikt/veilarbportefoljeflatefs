import {LagretFilter} from "../../ducks/lagret-filter";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {finnSideNavn, mapVeilederIdentTilNonsens} from "../../middleware/metrics-middleware";
import {logEvent} from "../../utils/frontend-logger";
import {velgLagretFilter} from "../../ducks/filtrering";
import {apenLagreFilterModal} from "../../ducks/lagret-filter-ui";
import {Radio} from "nav-frontend-skjema";
import RedigerKnapp from "../../components/knapper/rediger-knapp";
import React, {RefObject, useRef} from "react";

interface LagretFilterRadProps {
    filter: LagretFilter;
    filtergruppe: string;
    parentDiv: RefObject<HTMLDivElement>
}

function LagretFilterRad({filter, filtergruppe, parentDiv}: LagretFilterRadProps) {
    const dispatch = useDispatch();
    const checkboxRef = useRef<HTMLDivElement>(null);

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

    function scrollAndSelect(){
        if (parentDiv.current != null && checkboxRef.current && valgtLagretFilter && valgtLagretFilter?.filterId === filter.filterId){
            parentDiv.current.scrollTo(
                {
                    top: checkboxRef.current.offsetTop-parentDiv.current.offsetTop,
                    left: 0,
                    behavior: 'smooth'
                }
            )
        }
        return valgtLagretFilter?.filterId === filter.filterId
    }

    return (
        <div className="lagrede-filter__rad" ref={checkboxRef}>
            <Radio
                className="lagrede-filter__filternavn"
                key={filter.filterId}
                name="lagretFilter"
                label={filter.filterNavn}
                value={filter.filterId}
                onChange={(event) => velgFilter(event)}
                checked={scrollAndSelect()}
            />
            <RedigerKnapp
                hidden={valgtLagretFilter?.filterId !== filter.filterId}
                aria="Rediger lagret filter"
                onClick={onClickRedigerKnapp}
            />
        </div>
    );
}

export default LagretFilterRad;
