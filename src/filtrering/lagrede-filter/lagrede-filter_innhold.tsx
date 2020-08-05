import React, {useRef, useState} from 'react';
import {Radio} from 'nav-frontend-skjema'
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import {LagretFilter} from '../../ducks/lagret-filter';
import {LagreFilterModal, Visningstype} from "../../components/modal/lagrede-filter/lagre-filter-modal";
import './lagrede-filter_innhold.less'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {velgLagretFilter} from "../../ducks/filtrering";

interface LagredeFilterInnholdProps {
    lagretFilter: LagretFilter[]
}

function LagredeFilterInnhold(props: LagredeFilterInnholdProps) {
    const outerDivRef = useRef<HTMLDivElement>(null);
    const className = (props.lagretFilter.length >= 18) ? 'lagrede-filter__valgfelt__lang' : 'lagrede-filter__valgfelt'
    const [visEndreFilterModal, setVisEndreFilterModal] = useState(false);


    return (
        <div className={className} ref={outerDivRef}>
            {props.lagretFilter.map((filter, idx) =>
                <LagretFilterRad
                    key={idx}
                    filter={filter}
                    onClickRedigerKnapp={() => setVisEndreFilterModal(true)}
                />
            )}
            <LagreFilterModal
                velgVisningstype={Visningstype.OPPDATER}
                isOpen={visEndreFilterModal}
                onRequestClose={() => setVisEndreFilterModal(false)}/>
        </div>
    );
}

interface LagretFilterRadProps {
    filter: LagretFilter;
    onClickRedigerKnapp: () => void;
}

function LagretFilterRad({filter, onClickRedigerKnapp}: LagretFilterRadProps) {
    const dispatch = useDispatch();

    const valgtLagretFilter = useSelector((state: AppState) => state.lagretFilter.valgtLagretFilter);

    function velgFilter(event) {
        dispatch(velgLagretFilter(filter))
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
