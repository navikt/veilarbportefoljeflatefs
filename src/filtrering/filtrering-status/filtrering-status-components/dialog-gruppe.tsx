import React from 'react';
import BarInputGruppe from '../../../components/barinput/barinput-gruppe';
import { BarInputRadio } from '../../../components/barinput/barinput-radio';
import { VENTER_PA_SVAR_FRA_BRUKER, VENTER_PA_SVAR_FRA_NAV } from '../../filter-konstanter';
import { FiltreringStatusGruppe } from './ufordelte-brukere';
import { useStatusTallSelector } from '../../../hooks/redux/use-statustall';

export function FiltreringStatusDialog(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();

    return (
        <BarInputGruppe>
            <BarInputRadio
                filterNavn="venterPaSvarFraNAV"
                antall={statusTall.venterPaSvarFraNAV}
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
            />
            <BarInputRadio
                filterNavn="venterPaSvarFraBruker"
                antall={statusTall.venterPaSvarFraBruker}
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
            />
        </BarInputGruppe>
    );
}
