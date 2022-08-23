import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {endreFiltervalg, veilederSoktFraToolbar} from '../../ducks/filtrering';
import {nameToStateSliceMap} from '../../ducks/utils';
import {FiltervalgModell} from '../../model-interfaces';
import {VeiledereState} from '../../ducks/veiledere';
import {useEffect, useState} from 'react';
import SokVeiledere from '../sok-veiledere/sok-veiledere';
import './toolbar.css';
import {OversiktType} from '../../ducks/ui/listevisning';

interface SokVeilederProps {
    filtervalg: FiltervalgModell;
    veiledere: VeiledereState;
    skalVises?: boolean;
    onClick: () => void;
}

interface DispatchProps {
    sokEtterVeileder: (filterId: string, filterverdi: string[]) => void;
    veilederSokt: () => void;
}

type AllProps = SokVeilederProps & DispatchProps;

function SokVeilederFilter(props: AllProps) {
    const [valgteVeileder, setValgteVeileder] = useState<string[]>(props.filtervalg.veiledere || []);

    useEffect(() => {
        setValgteVeileder(props.filtervalg.veiledere || []);
    }, [props.filtervalg.veiledere]);

    if (!props.skalVises) {
        return null;
    }

    const harValg = valgteVeileder.length > 0;

    const createHandleOnSubmit = (filterverdi: string[]) => {
        props.onClick();
        if (harValg) {
            props.sokEtterVeileder('veiledere', filterverdi);
            props.veilederSokt();
            setValgteVeileder([]);
        }
    };

    return (
        <SokVeiledere
            handterVeiledereValgt={setValgteVeileder}
            btnOnClick={() => createHandleOnSubmit(valgteVeileder)}
            harValg={harValg}
            valgteVeiledere={valgteVeileder}
        />
    );
}

const mapStateToProps = (state, ownProps) => {
    const stateSlice =
        nameToStateSliceMap[ownProps.oversiktType] ||
        (ownProps.oversiktType === OversiktType.enhetensOversikt
            ? 'filtreringEnhetensOversikt'
            : 'filtreringMinoversikt');
    return {
        veiledere: state.veiledere,
        filtervalg: state[stateSlice],
        veileder: ownProps.veileder || state.enheter.valgtVeileder
    };
};

const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators(
        {
            sokEtterVeileder(filterId: string, filterverdi: string[]) {
                return endreFiltervalg(filterId, filterverdi, ownProps.oversiktType);
            },
            veilederSokt() {
                return veilederSoktFraToolbar();
            }
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SokVeilederFilter);
