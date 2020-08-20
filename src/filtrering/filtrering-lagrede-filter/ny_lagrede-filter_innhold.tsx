import React, {useRef} from 'react';
import {Radio} from 'nav-frontend-skjema'
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import {apenLagreFilterModal, LagretFilter} from '../../ducks/lagret-filter';
import './ny_lagrede-filter-innhold.less'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {logEvent} from "../../utils/frontend-logger";
import {finnSideNavn} from "../../middleware/metrics-middleware";
import {velgLagretFilter} from "../../ducks/filtrering";
import '../../components/sidebar/sidebar.less'

interface LagredeFilterInnholdProps {
    lagretFilter: LagretFilter[];
    filtergruppe: string;
}

function NyLagredeFilterInnhold(props: LagredeFilterInnholdProps) {
    const outerDivRef = useRef<HTMLDivElement>(null);
    return (
        <div className='ny__lagrede-filter__valgfelt' ref={outerDivRef}>
            {props.lagretFilter.map((filter, idx) =>
                <LagretFilterRad
                    key={idx}
                    filter={filter}
                    filtergruppe={props.filtergruppe}
                />
            )}
        </div>
    );
}

interface LagretFilterRadProps {
    filter: LagretFilter;
    filtergruppe: string;
}

function LagretFilterRad({filter, filtergruppe}: LagretFilterRadProps) {
    const dispatch = useDispatch();

    const valgtLagretFilter = useSelector((state: AppState) => state.lagretFilter.valgtLagretFilter);

    function velgFilter(event) {
        logEvent('portefolje.metrikker.lagredefilter.valgt-lagret-filter',
            {}, {filterId: filter.filterId, sideNavn: finnSideNavn()});
        dispatch(velgLagretFilter(filter))
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
