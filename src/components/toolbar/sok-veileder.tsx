import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endreFiltervalg, veilederSoktFraToolbar } from '../../ducks/filtrering';
import { nameToStateSliceMap } from '../../ducks/utils';
import { FiltervalgModell } from '../../model-interfaces';
import { VeiledereState } from '../../ducks/veiledere';
import { useEffect, useState } from 'react';
import SokVeiledere from '../sok-veiledere/sok-veiledere';
import './toolbar.less';

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

    const hanterChange = (erValgt, veilederTarget) => erValgt
        ? setValgteVeileder([veilederTarget, ...valgteVeileder])
        : setValgteVeileder(valgteVeileder.filter(veileder => veileder !== veilederTarget));

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
            erValgt={ident => valgteVeileder.includes(ident)}
            hanterVeilederValgt={hanterChange}
            btnOnClick={() => createHandleOnSubmit(valgteVeileder)}
            harValg={harValg}
        />
    );
}

const mapStateToProps = (state, ownProps) => {
    const stateSlice = nameToStateSliceMap[ownProps.filtergruppe] || 'filtrering';
    return ({
        veiledere: state.veiledere,
        filtervalg: state[stateSlice],
        veileder: ownProps.veileder || state.enheter.valgtVeileder
    });
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    sokEtterVeileder(filterId: string, filterverdi: string[]) {
        return endreFiltervalg(filterId, filterverdi, ownProps.filtergruppe);
    },
    veilederSokt() {
        return veilederSoktFraToolbar();
    }
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SokVeilederFilter);
