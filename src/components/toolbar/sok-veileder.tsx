import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endreFiltervalg, veilederSoktFraToolbar } from '../../ducks/filtrering';
import SokFilter from './sok-filter';
import Dropdown from '../dropdown/dropdown';
import CheckboxFilterform from './../checkbox-filterform/checkbox-filterform';
import { nameToStateSliceMap } from '../../ducks/utils';
import { FiltervalgModell } from '../../model-interfaces';
import { VeiledereState } from '../../ducks/veiledere';
import { ToolbarPosisjon } from './toolbar';

interface SokVeilederProps {
    filtervalg: FiltervalgModell;
    veiledere: VeiledereState;
    skalVises?: boolean;
    toolbarPosisjon?: ToolbarPosisjon;
}

interface DispatchProps {
    sokEtterVeileder: (filterId: string, filterverdi: string) => void;
    veilederSokt: () => void;
}

type AllProps = SokVeilederProps & DispatchProps;

function createHandleOnSubmit(props: AllProps) {
    return (filterId: string, filterverdi: string) => {
        props.sokEtterVeileder(filterId, filterverdi);
        props.veilederSokt();
    };
}

function SokVeileder(props: AllProps) {
    if (!props.skalVises) {
        return null;
    }
    return (
        <Dropdown name="Søk veileder" className="dropdown--fixed dropdown--toolbar">
            <SokFilter
                label="Velg veiledere"
                placeholder="Søk veileder"
                data={props.veiledere.data.veilederListe}
            >
                <SokVeilederRenderer filtervalg={props.filtervalg} onSubmit={createHandleOnSubmit(props)} />
            </SokFilter>
        </Dropdown>
    );
}

interface SokVeilederRendererProps {
    data?: any[];
    filtervalg: FiltervalgModell;
    onSubmit: (filterId: string, filterverdi: string) => void;
}

function SokVeilederRenderer({ data = [], filtervalg, onSubmit, ...props }: SokVeilederRendererProps) {
    const datamap = data.reduce((acc, element) => ({ ...acc, [element.ident]: { label: element.navn } }), {});
    return (
        <CheckboxFilterform
            form="veiledere"
            valg={datamap}
            filtervalg={filtervalg}
            onSubmit={onSubmit}
            {...props}
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
    sokEtterVeileder(filterId: string, filterverdi: string) {
        return endreFiltervalg(filterId, filterverdi, ownProps.filtergruppe, ownProps.veileder.ident);
    },
    veilederSokt() {
        return veilederSoktFraToolbar(ownProps.toolbarPosisjon);
    }
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SokVeileder);
