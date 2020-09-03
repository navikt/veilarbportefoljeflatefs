import {MineFilter} from "../../ducks/mine-filter";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {finnSideNavn, mapVeilederIdentTilNonsens} from "../../middleware/metrics-middleware";
import {logEvent} from "../../utils/frontend-logger";
import {velgLagretFilter} from "../../ducks/filtrering";
import {apneMineFilterModal} from "../../ducks/mine-filter-ui";
import {Radio} from "nav-frontend-skjema";
import RedigerKnapp from "../../components/knapper/rediger-knapp";
import React, {RefObject, useRef} from "react";
import {antallFilter} from "../../components/modal/mine-filter/mine-filter-utils";
import {ListevisningType} from "../../ducks/ui/listevisning";

interface LagretFilterRadProps {
    filter: MineFilter;
    filtergruppe: string;
    parentDiv: RefObject<HTMLDivElement>
}

function MineFilterRad({filter, filtergruppe, parentDiv}: LagretFilterRadProps) {
    const dispatch = useDispatch();
    const checkboxRef = useRef<HTMLDivElement>(null);

    const valgtLagretFilter = useSelector((state: AppState) => filtergruppe === ListevisningType.minOversikt
        ? state.mineFilterMinOversikt.valgtMineFilter
        : state.mineFilterEnhetensOversikt.valgtMineFilter);
    const veilederIdent = useSelector((state: AppState) => state.inloggetVeileder.data!);
    const veilederIdentTilNonsens = mapVeilederIdentTilNonsens(veilederIdent.ident);

    function velgFilter() {
        logEvent('portefolje.metrikker.lagredefilter.valgt-lagret-filter',
            {antallFilter: antallFilter(filter.filterValg)}, {filterId: filter.filterId, sideNavn: finnSideNavn(), id: veilederIdentTilNonsens});
        dispatch(velgLagretFilter(filter, filtergruppe))
    }

    function onClickRedigerKnapp() {
        dispatch(apneMineFilterModal(filtergruppe))
    }

    function scrollAndSelect(){
        if (parentDiv.current != null && checkboxRef.current && valgtLagretFilter && valgtLagretFilter?.filterId === filter.filterId){
            if (parentDiv.current.offsetTop + parentDiv.current.scrollTop  > checkboxRef.current.offsetTop || checkboxRef.current.offsetTop > parentDiv.current.offsetTop + parentDiv.current.clientHeight){
                parentDiv.current.scrollTo(
                   {
                       top: checkboxRef.current.offsetTop-parentDiv.current.offsetTop,
                       left: 0,
                       behavior: 'smooth'
                   }
               )
            }
        }
        return valgtLagretFilter?.filterId === filter.filterId
    }

    return (
        <div className="mine-filter__rad" ref={checkboxRef}>
            <Radio
                className="mine-filter__filternavn"
                key={filter.filterId}
                name="mineFilter"
                label={filter.filterNavn}
                value={filter.filterId}
                onChange={() => velgFilter()}
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

export default MineFilterRad;
