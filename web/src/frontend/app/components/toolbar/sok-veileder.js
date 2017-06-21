import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endreFiltervalg } from './../../ducks/filtrering';
import SokFilter from './sok-filter';
import Dropdown from './../dropdown/dropdown';
import CheckboxFilterform from './../checkbox-filterform/checkbox-filterform';
import { nameToStateSliceMap } from './../../reducer';

function SokVeileder({ filtervalg, veiledere, sokEtterVeileder }) {
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

SokVeileder.propTypes = {
    filtervalg: PT.object.isRequired,
    veiledere: PT.object.isRequired,
    sokEtterVeileder: PT.func.isRequired
};

function SokVeilederRenderer({ data, filtervalg, onSubmit, ...props }) {
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

SokVeilederRenderer.propTypes = {
    data: PT.array,
    filtervalg: PT.object.isRequired,
    onSubmit: PT.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const stateSlice = nameToStateSliceMap[ownProps.filtergruppe];

    return ({
        veiledere: state.veiledere,
        filtervalg: state[stateSlice],
        veileder: ownProps.veileder || state.enheter.valgtVeileder
    });
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    sokEtterVeileder(...args) {
        return endreFiltervalg(...args, ownProps.filtergruppe, ownProps.veileder);
    }
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SokVeileder);
