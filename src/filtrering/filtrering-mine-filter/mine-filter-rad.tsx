import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {finnSideNavn, mapVeilederIdentTilNonsens} from '../../middleware/metrics-middleware';
import {logEvent} from '../../utils/frontend-logger';
import {velgLagretFilter} from '../../ducks/filtrering';
import {apneLagreFilterModal, markerValgtLagretFilter} from '../../ducks/lagret-filter-ui-state';
import {Radio} from 'nav-frontend-skjema';
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import React, {RefObject, useRef} from 'react';
import {antallFilter} from '../../components/modal/mine-filter/mine-filter-utils';
import {ListevisningType} from '../../ducks/ui/listevisning';
import {LagretFilter} from "../../ducks/lagretFilter";

interface LagretFilterRadProps {
    lagretFilter: LagretFilter;
    filtergruppe: ListevisningType;
    parentDiv: RefObject<HTMLDivElement>;
}

function MineFilterRad({lagretFilter, filtergruppe, parentDiv}: LagretFilterRadProps) {
    const dispatch = useDispatch();
    const checkboxRef = useRef<HTMLDivElement>(null);

    const valgtLagretFilter = useSelector((state: AppState) =>
        filtergruppe === ListevisningType.minOversikt
            ? state.mineFilterMinOversikt.valgtLagretFilter
            : state.mineFilterEnhetensOversikt.valgtLagretFilter
    );
    const veilederIdent = useSelector((state: AppState) => state.inloggetVeileder.data!);
    const veilederIdentTilNonsens = mapVeilederIdentTilNonsens(veilederIdent.ident);

    function velgFilter() {
        logEvent(
            'portefolje.metrikker.lagredefilter.valgt-lagret-filter',
            {antallFilter: antallFilter(lagretFilter.filterValg)},
            {
                filterId: lagretFilter.filterId,
                sideNavn: finnSideNavn(),
                id: veilederIdentTilNonsens
            }
        );
        dispatch(velgLagretFilter(lagretFilter, filtergruppe));
        dispatch(markerValgtLagretFilter(lagretFilter, filtergruppe));
    }

    function onClickRedigerKnapp() {
        dispatch(apneLagreFilterModal(filtergruppe));
    }

    function scrollAndSelect() {
        if (
            parentDiv.current != null &&
            checkboxRef.current &&
            valgtLagretFilter &&
            valgtLagretFilter?.filterId === lagretFilter.filterId
        ) {
            if (
                parentDiv.current.offsetTop + parentDiv.current.scrollTop > checkboxRef.current.offsetTop ||
                checkboxRef.current.offsetTop > parentDiv.current.offsetTop + parentDiv.current.clientHeight
            ) {
                parentDiv.current.scrollTo({
                    top: checkboxRef.current.offsetTop - parentDiv.current.offsetTop,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
        return valgtLagretFilter?.filterId === lagretFilter.filterId;
    }

    return (
        <div className="mine-filter__rad" ref={checkboxRef}>
            <Radio
                className="mine-filter__filternavn"
                key={lagretFilter.filterId}
                name="mineFilter"
                label={lagretFilter.filterNavn}
                value={lagretFilter.filterId}
                onChange={() => velgFilter()}
                checked={scrollAndSelect()}
            />
            <RedigerKnapp
                hidden={valgtLagretFilter?.filterId !== lagretFilter.filterId}
                aria="Rediger lagret filter"
                onClick={onClickRedigerKnapp}
            />
        </div>
    );
}

export default MineFilterRad;
