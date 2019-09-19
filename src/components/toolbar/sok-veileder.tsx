import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endreFiltervalg, veilederSoktFraToolbar } from '../../ducks/filtrering';
import { nameToStateSliceMap } from '../../ducks/utils';
import { FiltervalgModell } from '../../model-interfaces';
import { VeiledereState } from '../../ducks/veiledere';
import { ToolbarPosisjon } from './toolbar';
import {useEffect, useState} from "react";
import SokFilterNy from "./sok-filter-ny";
import DropdownNy from "../dropdown/dropdown-ny";
import VeilederCheckboxes from "./veileder-checkboxes";

interface SokVeilederProps {
    filtervalg: FiltervalgModell;
    veiledere: VeiledereState;
    skalVises?: boolean;
    toolbarPosisjon?: ToolbarPosisjon;
}

interface DispatchProps {
    sokEtterVeileder: (filterId: string, filterverdi: string[]) => void;
    veilederSokt: () => void;
}

type AllProps = SokVeilederProps & DispatchProps;

function SokVeileder(props: AllProps) {
    const [valgteVeileder, setValgteVeileder] = useState<string[]>(props.filtervalg.veiledere || []);

    useEffect(() => {
        setValgteVeileder(props.filtervalg.veiledere || [])
    },[props.filtervalg.veiledere]);

    if(!props.skalVises) {
        return null;
    }

    const harValg = valgteVeileder.length > 0;

    const hanterChange = (event) => {
        const veilederTarget = event.target.value;
        event.target.checked
            ? setValgteVeileder([veilederTarget, ...valgteVeileder])
            : setValgteVeileder(valgteVeileder.filter(veileder => veileder !== veilederTarget))
    };

    const createHandleOnSubmit = (filterverdi: string[], lukkDropDown: () => void) => {
        lukkDropDown();
        if(harValg) {
            props.sokEtterVeileder('veiledere', filterverdi);
            props.veilederSokt();
            setValgteVeileder([]);
        }
    };

    return (
        <DropdownNy
            name="Søk veileder"
            className="dropdown--fixed dropdown--toolbar"
            render={ lukkDropDown =>
                <SokFilterNy
                    label="Velg veiledere"
                    placeholder="Søk veileder"
                    data={props.veiledere.data.veilederListe}
                >
                    {liste =>
                        <VeilederCheckboxes
                            veilederData = {liste}
                            onSubmit={() => createHandleOnSubmit(valgteVeileder, lukkDropDown)}
                            valgteVeileder={valgteVeileder}
                            onVeilederValgt={hanterChange}
                        />
                    }
                </SokFilterNy>
            }
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
        return endreFiltervalg(filterId, filterverdi, ownProps.filtergruppe, ownProps.veileder.ident);
    },
    veilederSokt() {
        return veilederSoktFraToolbar(ownProps.toolbarPosisjon);
    }
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SokVeileder);
