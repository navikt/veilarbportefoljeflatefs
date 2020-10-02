import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {finnSideNavn, mapVeilederIdentTilNonsens} from "../../middleware/metrics-middleware";
import {logEvent} from "../../utils/frontend-logger";
import {velgLagretFilter} from "../../ducks/filtrering";
import {apneMineFilterModal, markerValgtFilter} from "../../ducks/mine-filter-ui";
import {Radio} from "nav-frontend-skjema";
import RedigerKnapp from "../../components/knapper/rediger-knapp";
import React from "react";
import './ny_mine-filter-innhold.less'
import {ListevisningType} from "../../ducks/ui/listevisning";
import {LagretFilter} from "../../ducks/lagretFilter";

interface LagretFilterRadProps {
    filter: LagretFilter;
    filtergruppe: ListevisningType;
}

function NyMineFilterRad({filter, filtergruppe}: LagretFilterRadProps) {
    const dispatch = useDispatch();

    const valgtMittFilter = useSelector((state: AppState) => filtergruppe === ListevisningType.minOversikt
        ? state.lagretFilterMinOversikt.valgtFilter
        : state.lagretFilterEnhetensOversikt.valgtFilter);
    const veilederIdent = useSelector((state: AppState) => state.inloggetVeileder.data!);
    const veilederIdentTilNonsens = mapVeilederIdentTilNonsens(veilederIdent.ident);

    function velgFilter() {
        logEvent('portefolje.metrikker.lagredefilter.valgt-lagret-filter',
            {}, {filterId: filter.filterId, sideNavn: finnSideNavn(), id: veilederIdentTilNonsens});
        dispatch(velgLagretFilter(filter, filtergruppe))
        dispatch(markerValgtFilter(filter, filtergruppe));
    }

    function onClickRedigerKnapp() {
        dispatch(apneMineFilterModal(filtergruppe))
    }

    return (
        <div className="ny__mine-filter__rad">
            <Radio
                className="ny__mine-filter__filternavn"
                key={filter.filterId}
                name="mineFilter"
                label={filter.filterNavn}
                value={filter.filterId}
                onChange={() => velgFilter()}
                checked={valgtMittFilter?.filterId === filter.filterId}
            />
            <RedigerKnapp
                hidden={valgtMittFilter?.filterId !== filter.filterId}
                aria="Rediger mitt filter"
                onClick={onClickRedigerKnapp}
            />
        </div>
    );
}

export default NyMineFilterRad;
