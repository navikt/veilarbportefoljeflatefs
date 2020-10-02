import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {finnSideNavn, mapVeilederIdentTilNonsens} from "../../middleware/metrics-middleware";
import {logEvent} from "../../utils/frontend-logger";
import {velgMineFilter} from "../../ducks/filtrering";
import {apneMineFilterModal, markerMineFilter} from "../../ducks/lagret-filter-ui-state";
import {Radio} from "nav-frontend-skjema";
import RedigerKnapp from "../../components/knapper/rediger-knapp";
import React from "react";
import './ny_mine-filter-innhold.less'
import {ListevisningType} from "../../ducks/ui/listevisning";
import {LagretFilter} from "../../ducks/lagretFilter";

interface NyMineFilterRadProps {
    lagretFilter: LagretFilter;
    filtergruppe: ListevisningType;
}

function NyMineFilterRad({lagretFilter, filtergruppe}: NyMineFilterRadProps) {
    const dispatch = useDispatch();

    const valgtLagretFilter = useSelector((state: AppState) => filtergruppe === ListevisningType.minOversikt
        ? state.mineFilterMinOversikt.valgtMineFilter
        : state.mineFilterEnhetensOversikt.valgtMineFilter);
    const veilederIdent = useSelector((state: AppState) => state.inloggetVeileder.data!);
    const veilederIdentTilNonsens = mapVeilederIdentTilNonsens(veilederIdent.ident);

    function velgFilter() {
        logEvent('portefolje.metrikker.lagredefilter.valgt-lagret-filter',
            {}, {filterId: lagretFilter.filterId, sideNavn: finnSideNavn(), id: veilederIdentTilNonsens});
        dispatch(velgMineFilter(lagretFilter, filtergruppe))
        dispatch(markerMineFilter(lagretFilter, filtergruppe));
    }

    function onClickRedigerKnapp() {
        dispatch(apneMineFilterModal(filtergruppe))
    }

    return (
        <div className="ny__mine-filter__rad">
            <Radio
                className="ny__mine-filter__filternavn"
                key={lagretFilter.filterId}
                name="mineFilter"
                label={lagretFilter.filterNavn}
                value={lagretFilter.filterId}
                onChange={() => velgFilter()}
                checked={valgtLagretFilter?.filterId === lagretFilter.filterId}
            />
            <RedigerKnapp
                hidden={valgtLagretFilter?.filterId !== lagretFilter.filterId}
                aria="Rediger mitt filter"
                onClick={onClickRedigerKnapp}
            />
        </div>
    );
}

export default NyMineFilterRad;
