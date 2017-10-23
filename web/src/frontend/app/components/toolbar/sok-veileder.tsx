import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endreFiltervalg } from '../../ducks/filtrering';
import SokFilter from './sok-filter';
import Dropdown from './../dropdown/dropdown';
import CheckboxFilterform from './../checkbox-filterform/checkbox-filterform';
import { nameToStateSliceMap } from '../../ducks/utils';
import { FiltervalgModell } from '../../model-interfaces';
import { VeiledereState } from '../../ducks/veiledere';

interface SokVeilederProps {
    filtervalg: FiltervalgModell;
    veiledere: VeiledereState;
    sokEtterVeileder: (filterId: string, filterverdi: string) => void;
    skalVises?: boolean;
}

function SokVeileder({ filtervalg, veiledere, sokEtterVeileder, skalVises }: SokVeilederProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <Dropdown name="Søk veileder" className="dropdown--fixed dropdown--toolbar">
            <SokFilter
                label="Velg veiledere"
                placeholder="Søk veileder"
                data={veiledere.data.veilederListe}
            >
                <SokVeilederRenderer filtervalg={filtervalg} onSubmit={sokEtterVeileder} />
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
        return endreFiltervalg(filterId, filterverdi, ownProps.filtergruppe, ownProps.veileder);
    }
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SokVeileder);
