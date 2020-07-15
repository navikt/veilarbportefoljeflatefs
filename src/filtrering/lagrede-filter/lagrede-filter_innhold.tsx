import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Radio} from 'nav-frontend-skjema'
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import {LagretFilter_ActionReducers, velgLagretFilter,} from '../../ducks/lagret-filter_action-reducers';
import {AppState} from '../../reducer';
import {FiltervalgModell} from '../../model-interfaces';
import {lagredeFilterListerErLik} from "../../components/modal/lagrede-filter/lagrede-filter-utils";
import {finnSideNavn} from "../../middleware/metrics-middleware";
import {logEvent} from "../../utils/frontend-logger";
import {LagreFilterModal, Visningstype} from "../../components/modal/lagrede-filter/lagre-filter-modal";
import './lagrede-filter_innhold.less'

interface LagredeFilterInnholdProps {
    lagretFilter: LagretFilter_ActionReducers[]
    filterValg?: FiltervalgModell;
    filtergruppe: string;
}

function LagredeFilterInnhold(props: LagredeFilterInnholdProps) {

    const [visEndreFilterModal, setVisEndreFilterModal] = useState(false);
    const [,setValgtLagretFilter] = useState<LagretFilter_ActionReducers>();

    const filtreringMinOversikt = (state: AppState) => state.filtreringMinoversikt;
    const filtreringEnhetensOversikt = (state: AppState) => state.filtrering;

    const selector = props.filtergruppe === 'veileder' ? filtreringMinOversikt : filtreringEnhetensOversikt;

    const filterState = useSelector(selector);

    useEffect(() => {
        const valgtFilter = props.lagretFilter.find(elem => lagredeFilterListerErLik(elem.filterValg, filterState));
        if (valgtFilter) {
            setValgtLagretFilter(valgtFilter);
        }
    }, [filterState, setValgtLagretFilter, props.lagretFilter]);

    const outerDivRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const velgFilter = (filterId: string) => {
        logEvent('portefolje.metrikker.lagredefilter.velg-gruppe',
            {}, {filterId: filterId, sideNavn: finnSideNavn()});
        const filterVerdi = finnLagretFilter(filterId);
        setValgtLagretFilter(filterVerdi);
        filterVerdi && dispatch(velgLagretFilter(filterVerdi));
        console.log("VELG FILTER TO", filterId)
    };

    const finnLagretFilter = (vg) => props.lagretFilter.find((elem) => elem.filterId === parseInt(vg));

    const className  = (props.lagretFilter.length >= 18) ? 'lagrede-filter__valgfelt__lang' : 'lagrede-filter__valgfelt'

    return (
        <div className={className} ref={outerDivRef}>
            {props.lagretFilter.map((filter, idx) =>
                <LagretFilterRad
                    key={idx}
                    filter={filter}
                    onClickRedigerKnapp={() => setVisEndreFilterModal(true)}
                    hanterVelgFilter={(e) => {velgFilter(e.target.value)}}
                    filterState={filterState}
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
    hanterVelgFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filter: LagretFilter_ActionReducers;
    filterState: FiltervalgModell;
    onClickRedigerKnapp: () => void;
}

function LagretFilterRad({filter, hanterVelgFilter, onClickRedigerKnapp, filterState}: LagretFilterRadProps) {
    const lagretFilterValg = filter.filterValg;
    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const erValgt = lagretFilterState.valgtLagretFilter != null && lagredeFilterListerErLik(lagretFilterValg, filterState);

    return (
        <div className="lagrede-filter__rad">
            <Radio
                className="lagrede-filter__filternavn"
                key={filter.filterId}
                name="lagretFilter"
                label={filter.filterNavn}
                value={filter.filterId}
                onChange={hanterVelgFilter}
                checked={erValgt}
            />
            <RedigerKnapp
                hidden={!erValgt}
                aria="Rediger lagret filter"
                onClick={onClickRedigerKnapp}
            />
        </div>
    );
}

export default LagredeFilterInnhold;
