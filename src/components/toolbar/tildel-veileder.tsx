import * as React from 'react';
import { connect } from 'react-redux';
import RadioFilterform from './../radio-filterform/radio-filterform';
import { tildelVeileder } from '../../ducks/portefolje';
import { VeiledereState } from '../../ducks/veiledere';
import { BrukerModell } from '../../model-interfaces';
import { AppState } from '../../reducer';
import { ToolbarPosisjon } from './toolbar';
import DropdownNy from "../dropdown/dropdown-ny";
import SokFilterNy from "./sok-filter-ny";

interface TildelVeilederProps {
    skalVises: boolean;
    tildelTilVeileder: (tilordninger: any[], ident: string) => void;
    veiledere: VeiledereState;
    brukere: BrukerModell[];
    filtergruppe?: string;
    toolbarPosisjon?: ToolbarPosisjon;
}

function TildelVeileder({ skalVises, tildelTilVeileder, veiledere, brukere }: TildelVeilederProps) {
    if (!skalVises) {
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
        <DropdownNy
            name="Tildel veileder"
            className="dropdown--fixed dropdown--toolbar"
            disabled={!aktiv}
            render={lukkDropdown =>
                <SokFilterNy
                    label="Tildel veileder"
                    placeholder="Tildel veileder"
                    data={veiledere.data.veilederListe}
                >
                    {data => <TildelVeilederRenderer onSubmit={onSubmit} /> }
                </SokFilterNy>
            }
        />
    );
}

interface TildelVeilederRendererProps {
    onSubmit: (_: any, ident: string) => void;
    data?: any[];
}

function TildelVeilederRenderer({ onSubmit, data, ...props }: TildelVeilederRendererProps) {
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
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    tildelTilVeileder: (tilordninger, tilVeileder) => {
        return dispatch(tildelVeileder(tilordninger, tilVeileder, ownProps.filtergruppe,
            ownProps.gjeldendeVeileder, ownProps.toolbarPosisjon));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TildelVeileder);
