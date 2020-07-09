import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {velgLagretFilter} from '../../ducks/filtrering';
import {Radio} from 'nav-frontend-skjema';
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import {
    LagretFilter_ActionReducers,
} from '../../ducks/lagret-filter_action-reducers';
import {AppState} from '../../reducer';
import {FiltervalgModell} from '../../model-interfaces';
import {lagredeFilterListerErLik} from "../../components/modal/lagrede-filter/lagrede-filter-utils";
import {finnSideNavn} from "../../middleware/metrics-middleware";
import {logEvent} from "../../utils/frontend-logger";


interface LagredeFilterInnholdProps {
    lagretFilter: LagretFilter_ActionReducers[]
    filterValg?: FiltervalgModell;
    filtergruppe?: string;
}

function LagredeFilterInnhold(props: LagredeFilterInnholdProps) {

    const [visEndreFilterModal, setVisEndreFilterModal] = useState(false);
    const [valgLagretFilter, setValgtLagretFilter] = useState<LagretFilter_ActionReducers>();

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
        filterVerdi && dispatch(velgLagretFilter(filterVerdi, props.filtergruppe));
    };

    const finnLagretFilter = (vg) => props.lagretFilter.find((elem) => elem.filterId === parseInt(vg));

    // const submitEndringer = (filterNavn: string, filterValg: FiltervalgModell) => {
    //     if (valgtFilter && enhet && harGjortEndringer(filterValg.veiledere, valgtFilter.filterValg.veiledere, valgtFilter.filterNavn, filterNavn)) {
    //         dispatch(lagreEndringer({
    //             filterId: valgtFilter.filterId,
    //             filterNavn: filterNavn,
    //             filterValg
    //         }, enhet)).then(resp => dispatch(endreFiltervalg('veiledere', resp.data.filterValg.veiledere, props.filtergruppe)));
    //     } else {
    //         dispatch(visIngenEndringerToast());
    //     }
    // };

    // const sletteKnapp = () => {
    //     valgtFilter && enhet && dispatch(slettGruppe(enhet, valgtFilter.filterId))
    //         .then(() => dispatch(endreFiltervalg('veiledere', [], 'enhet')));
    // };

    return (
        <div className="lagrede-filter__valgfelt" ref={outerDivRef}>
            {props.lagretFilter.map((filter, idx) =>
                <LagretFilterRad
                    key={idx}
                    filter={filter}
                    onClickRedigerKnapp={() => setVisEndreFilterModal(true)}
                    hanterVelgFilter={(e) => {velgFilter(e.target.value)}}
                    filterState={filterState}
                />
            )}
            {/*{valgtFilter &&*/}
            {/*<VeilederGruppeModal*/}
            {/*    initialVerdi={{*/}
            {/*        gruppeNavn: valgtFilter.filterNavn,*/}
            {/*        filterValg: valgtFilter.filterValg,*/}
            {/*        filterId: valgtFilter.filterId*/}
            {/*    }}*/}
            {/*    isOpen={visEndreFilterModal}*/}
            {/*    onSubmit={submitEndringer}*/}
            {/*    modalTittel="Rediger veiledergruppe"*/}
            {/*    lagreKnappeTekst="Lagre endringer"*/}
            {/*    onRequestClose={() => setVisEndreFilterModal(false)}*/}
            {/*    onSlett={sletteKnapp}*/}
            {/*/>}*/}
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
    const erValgt = lagredeFilterListerErLik(lagretFilterValg, filterState);

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
                onClick={onClickRedigerKnapp}
            />
        </div>
    );
}

export default LagredeFilterInnhold;
