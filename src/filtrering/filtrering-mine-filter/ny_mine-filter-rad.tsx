import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {finnSideNavn, mapVeilederIdentTilNonsens} from '../../middleware/metrics-middleware';
import {logEvent} from '../../utils/frontend-logger';
import {velgMineFilter} from '../../ducks/filtrering';
import {apneMineFilterModal, markerMineFilter} from '../../ducks/lagret-filter-ui-state';
import {Radio} from 'nav-frontend-skjema';
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import React from 'react';
import './ny_mine-filter-innhold.less';
import {ListevisningType} from '../../ducks/ui/listevisning';
import {LagretFilter} from '../../ducks/lagretFilter';

interface NyMineFilterRadProps {
    mineFilter: LagretFilter;
    filtergruppe: ListevisningType;
}

function NyMineFilterRad({mineFilter, filtergruppe}: NyMineFilterRadProps) {
    const dispatch = useDispatch();

    const valgtMineFilter = useSelector((state: AppState) =>
        filtergruppe === ListevisningType.minOversikt
            ? state.mineFilterMinOversikt.valgtMineFilter
            : state.mineFilterEnhetensOversikt.valgtMineFilter
    );
    const veilederIdent = useSelector((state: AppState) => state.inloggetVeileder.data!);
    const veilederIdentTilNonsens = mapVeilederIdentTilNonsens(veilederIdent.ident);

    function velgFilter() {
        logEvent(
            'portefolje.metrikker.lagredefilter.valgt-lagret-filter',
            {},
            {filterId: mineFilter.filterId, sideNavn: finnSideNavn(), id: veilederIdentTilNonsens}
        );
        dispatch(velgMineFilter(mineFilter, filtergruppe));
        dispatch(markerMineFilter(mineFilter, filtergruppe));
    }

    function onClickRedigerKnapp() {
        dispatch(apneMineFilterModal(filtergruppe));
    }

    return (
        <div className="ny__mine-filter__rad">
            <Radio
                className="ny__mine-filter__filternavn"
                key={mineFilter.filterId}
                name="mineFilter"
                label={mineFilter.filterNavn}
                value={mineFilter.filterId}
                onChange={() => velgFilter()}
                checked={valgtMineFilter?.filterId === mineFilter.filterId}
            />
            <RedigerKnapp
                hidden={valgtMineFilter?.filterId !== mineFilter.filterId}
                aria="Rediger mitt filter"
                onClick={onClickRedigerKnapp}
            />
        </div>
    );
}

export default NyMineFilterRad;
