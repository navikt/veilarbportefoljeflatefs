import * as React from 'react';
import { connect } from 'react-redux';
import { tildelVeileder } from '../../ducks/portefolje';
import { VeiledereState } from '../../ducks/veiledere';
import {BrukerModell, VeilederModell} from '../../model-interfaces';
import { AppState } from '../../reducer';
import { ToolbarPosisjon } from './toolbar';
import DropdownNy from "../dropdown/dropdown-ny";
import SokFilterNy from "./sok-filter-ny";
import { useState } from "react";
import { Radio } from "nav-frontend-skjema";

interface TildelVeilederProps {
    skalVises: boolean;
    tildelTilVeileder: (tilordninger: any[], ident: string) => void;
    veiledere: VeiledereState;
    brukere: BrukerModell[];
    filtergruppe?: string;
    toolbarPosisjon?: ToolbarPosisjon;
}

function TildelVeileder({ skalVises, tildelTilVeileder, veiledere, brukere }: TildelVeilederProps) {
    const [ident, setIdent] = useState("");

    if (!skalVises) {
        return null;
    }

    const valgteBrukere = brukere.filter((bruker) => bruker.markert === true);
    const aktiv = valgteBrukere.length > 0;



    const onSubmit = (lukkDropdown) => {
        const tilordninger = valgteBrukere
            .map((bruker) => ({
                fraVeilederId: bruker.veilederId,
                tilVeilederId: ident,
                brukerFnr: bruker.fnr
            }));

        tildelTilVeileder(tilordninger, ident);
        lukkDropdown();
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
                    {data =>
                        <TildelVeilederRenderer
                            ident={ident}
                            onChange={setIdent}
                            data={data}
                            onSubmit={()=> onSubmit(lukkDropdown)}
                        />
                    }
                </SokFilterNy>
            }
        />
    );
}

interface TildelVeilederRendererProps {
    onSubmit: ()=> void;
    data: VeilederModell[];
    ident: string;
    onChange: (ident: string) => void;
}

function TildelVeilederRenderer({data, onSubmit, ident, onChange}: TildelVeilederRendererProps) {

    return (
        <form className="skjema radio-filterform" onSubmit={onSubmit}>
            <div className="radio-filterform__valg">
                {data.map(veileder =>
                    <Radio
                        name="veileder"
                        key={veileder.ident}
                        label={`${veileder.etternavn}, ${veileder.fornavn}`}
                        value={veileder.ident}
                        checked={veileder.ident === ident}
                        onChange={e => onChange(e.target.value)}
                    />
                )}
            </div>
        </form>
    )
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
