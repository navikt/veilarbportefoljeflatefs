import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endreFiltervalg, veilederSoktFraToolbar } from '../../ducks/filtrering';
import { nameToStateSliceMap } from '../../ducks/utils';
import { FiltervalgModell } from '../../model-interfaces';
import { VeiledereState } from '../../ducks/veiledere';
import { ToolbarPosisjon } from './toolbar';
import {useEffect, useState} from "react";
import DropdownNy from "../dropdown/dropdown-ny";
import classNames from "classnames";
import SokVeiledere from "../sok-veiledere/sok-veiledere";

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

function SokVeilederFilter(props: AllProps) {
    const [valgteVeileder, setValgteVeileder] = useState<string[]>(props.filtervalg.veiledere || []);

    useEffect(() => {
        setValgteVeileder(props.filtervalg.veiledere || [])
    },[props.filtervalg.veiledere]);

    if(!props.skalVises) {
        return null;
    }

    const harValg = valgteVeileder.length > 0;

    const hanterChange = (erValgt, veilederTarget) => erValgt
            ? setValgteVeileder([veilederTarget, ...valgteVeileder])
            : setValgteVeileder(valgteVeileder.filter(veileder => veileder !== veilederTarget));


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
                <>
                    <SokVeiledere
                        erValgt={ident => valgteVeileder.includes(ident)}
                        hanterVeilederValgt={hanterChange}
                    />
                    <div className="checkbox-filterform__valg-knapp knapperad blokk-xxs">
                        <button
                            onClick={()=> createHandleOnSubmit(valgteVeileder, lukkDropDown)}
                            className={classNames('knapp', 'knapp--mini', {'knapp--hoved': harValg})}
                        >
                            {harValg ? "Velg" : "Lukk"}
                        </button>
                    </div>
                </>
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

export default connect(mapStateToProps, mapDispatchToProps)(SokVeilederFilter);
