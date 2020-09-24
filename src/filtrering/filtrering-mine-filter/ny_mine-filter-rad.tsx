import {MineFilter} from "../../ducks/mine-filter";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {finnSideNavn, mapVeilederIdentTilNonsens} from "../../middleware/metrics-middleware";
import {logEvent} from "../../utils/frontend-logger";
import {velgLagretFilter} from "../../ducks/filtrering";
import {apneMineFilterModal} from "../../ducks/mine-filter-ui";
import {Radio} from "nav-frontend-skjema";
import RedigerKnapp from "../../components/knapper/rediger-knapp";
import React from "react";
import './ny_mine-filter-innhold.less'
import {ListevisningType} from "../../ducks/ui/listevisning";

interface LagretFilterRadProps {
    filter: MineFilter;
    filtergruppe: string;
    dataTestid?: string;
}

function NyMineFilterRad({filter, filtergruppe, dataTestid}: LagretFilterRadProps) {
    const dispatch = useDispatch();

    const valgtMittFilter = useSelector((state: AppState) => filtergruppe === ListevisningType.minOversikt
        ? state.mineFilterMinOversikt.valgtMineFilter
        : state.mineFilterEnhetensOversikt.valgtMineFilter);
    const veilederIdent = useSelector((state: AppState) => state.inloggetVeileder.data!);
    const veilederIdentTilNonsens = mapVeilederIdentTilNonsens(veilederIdent.ident);

    function velgFilter() {
        logEvent('portefolje.metrikker.lagredefilter.valgt-lagret-filter',
            {}, {filterId: filter.filterId, sideNavn: finnSideNavn(), id: veilederIdentTilNonsens});
        dispatch(velgLagretFilter(filter, filtergruppe))
    }

    function onClickRedigerKnapp() {
        dispatch(apneMineFilterModal(filtergruppe))
    }

    return (
        <div className="ny__mine-filter__rad"
             data-testid='mine-filter-rad-wrapper'>
            <Radio
                className="ny__mine-filter__filternavn"
                key={filter.filterId}
                name="mineFilter"
                label={filter.filterNavn}
                value={filter.filterId}
                onChange={() => velgFilter()}
                checked={valgtMittFilter?.filterId === filter.filterId}
                data-testid={`mine-filter-rad_${filter.filterNavn}`}
            />
            <RedigerKnapp
                hidden={valgtMittFilter?.filterId !== filter.filterId}
                aria="Rediger mitt filter"
                onClick={onClickRedigerKnapp}
                dataTestid={`rediger-filter-knapp_${filter.filterNavn}`}
            />
        </div>
    );
}

export default NyMineFilterRad;
