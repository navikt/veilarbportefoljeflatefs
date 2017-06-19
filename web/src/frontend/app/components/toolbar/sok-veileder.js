import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endreFiltervalg } from './../../ducks/filtrering';
import SokFilter from './sok-filter';
import Dropdown from './../dropdown/dropdown';
import CheckboxFilterform from './../checkbox-filterform/checkbox-filterform';


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

function SokVeilederRenderer({ data, filtervalg, onSubmit, ...props}) {
    const datamap = data.reduce((acc, element) => ({ ...acc, [element.ident]: { label: element.navn }}), {});
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

const mapStateToProps = ({ veiledere, filtrering, enheter }, ownProps) => ({
    veiledere,
    filtervalg: filtrering,
    veileder: ownProps.veileder || enheter.valgtVeileder
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    sokEtterVeileder(...args) {
        console.log('ownProps', args);
        console.log('ownProps', ownProps);
        return endreFiltervalg(...args, ownProps.filtergruppe, ownProps.veileder)
    }
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SokVeileder);
