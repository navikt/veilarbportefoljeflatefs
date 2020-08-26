import React from 'react';
import BarInputGruppe from '../../../components/barinput/barinput-gruppe';
import {VENTER_PA_SVAR_FRA_BRUKER, VENTER_PA_SVAR_FRA_NAV} from '../../filter-konstanter';
import {FiltreringStatusGruppe} from './ufordelte-brukere';
import {useStatusTallSelector} from '../../../hooks/redux/use-statustall';
import {NyBarInputRadio} from "../../../components/barinput/ny_bar_input_radio";

export function NyFiltreringStatusDialog(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();

    return (
        <BarInputGruppe>
            <NyBarInputRadio
                filterNavn="venterPaSvarFraNAV"
                antall={statusTall.venterPaSvarFraNAV}
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
            />
            <NyBarInputRadio
                filterNavn="venterPaSvarFraBruker"
                antall={statusTall.venterPaSvarFraBruker}
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
            />
        </BarInputGruppe>
    );
}
