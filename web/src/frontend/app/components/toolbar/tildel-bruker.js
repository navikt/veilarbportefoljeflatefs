import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import SokFilter from './sok-filter';
import Dropdown from './../dropdown/dropdown';
import RadioFilterform from './../radio-filterform/radio-filterform';
import { tildelVeileder } from './../../ducks/portefolje';

function TildelBruker({ skalSkjules, tildelTilVeileder, veiledere, brukere }) {
    if (skalSkjules) {
        return null;
    }

    const valgteBrukere = brukere.filter((bruker) => bruker.markert === true);
    const aktiv = valgteBrukere.length > 0;

    const onSubmit = (_, ident) => {
        const tilordninger = valgteBrukere
            .map((bruker) => ({
                fraVeilederId: bruker.veilederId,
                tilVeilederId: ident,
                brukerFnr: bruker.fnr
            }));

        tildelTilVeileder(tilordninger, ident);
    };

    return (
        <Dropdown name="Tildel bruker" className="dropdown--fixed dropdown--toolbar" disabled={!aktiv}>
            <SokFilter
                label="Tildel brukere"
                placeholder="Tildel brukere"
                data={veiledere.data.veilederListe}
            >
                <TildelBrukerRenderer onSubmit={onSubmit} />
            </SokFilter>
        </Dropdown>
    );
}

TildelBruker.propTypes = {
    skalSkjules: PT.bool.isRequired,
    tildelTilVeileder: PT.func.isRequired,
    veiledere: PT.object.isRequired,
    brukere: PT.array.isRequired
};

function TildelBrukerRenderer({ onSubmit, data, ...props }) {
    const datamap = data.reduce((acc, element) => ({ ...acc, [element.ident]: { label: element.navn } }), {});
    return (
        <RadioFilterform
            form="veiledertildeling"
            valg={datamap}
            filtervalg={{ veiledervisning: undefined }}
            onSubmit={onSubmit}
            {...props}
        />
    );
}

TildelBrukerRenderer.propTypes = {
    onSubmit: PT.func.isRequired,
    data: PT.array
};

const mapStateToProps = ({ veiledere, enheter, portefolje, ui }) => ({
    veiledere,
    brukere: portefolje.data.brukere,
    veileder: enheter.valgtVeileder,
    skalSkjules: ui.side.side === 'veiledere'
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    tildelTilVeileder: (...args) => dispatch(tildelVeileder(...args, ownProps.filtergruppe, ownProps.veileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(TildelBruker);
