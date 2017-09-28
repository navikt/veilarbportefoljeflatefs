import * as React from 'react';
import { connect } from 'react-redux';
import SokFilter from './sok-filter';
import Dropdown from './../dropdown/dropdown';
import RadioFilterform from './../radio-filterform/radio-filterform';
import { tildelVeileder } from './../../ducks/portefolje';
import {VeiledereState} from '../../ducks/veiledere';
import {BrukerModell} from '../../model-interfaces';
import {AppState} from '../../reducer';

interface TildelBrukerProps {
    skalSkjules: boolean;
    tildelTilVeileder: (tilordninger: any[], ident: string) => void;
    veiledere: VeiledereState;
    brukere: BrukerModell[];
}

function TildelBruker({ skalSkjules, tildelTilVeileder, veiledere, brukere }: TildelBrukerProps) {
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
        <Dropdown name="Tildel veileder" className="dropdown--fixed dropdown--toolbar" disabled={!aktiv}>
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

interface TildelBrukerRendererProps {
    onSubmit: (_: any, ident: string) => void;
    data?: any[];
}

function TildelBrukerRenderer({ onSubmit, data, ...props }: TildelBrukerRendererProps) {
    const datamap = data!.reduce((acc, element) => ({ ...acc, [element.ident]: { label: element.navn } }), {});
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

const mapStateToProps = ({ veiledere, enheter, portefolje, ui }: AppState) => ({
    veiledere,
    brukere: portefolje.data.brukere,
    veileder: enheter.valgtVeileder,
    skalSkjules: ui.side.side === 'veiledere'
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    tildelTilVeileder: (tilordninger, tilVeileder) => dispatch(tildelVeileder(tilordninger, tilVeileder, ownProps.filtergruppe, ownProps.veileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(TildelBruker);
