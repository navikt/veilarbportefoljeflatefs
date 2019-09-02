import React from 'react';
import { FiltreringStatusGruppe } from './ufordelte-brukere';
import { BarInputRadio } from '../../../components/barinput/barinput-radio';
import BarInputGruppe from '../../../components/barinput/barinput-gruppe';
import { INAKTIVE_BRUKERE } from '../../filter-konstanter';
import { useStatusTallSelector } from '../../../hooks/redux/use-statustall';

export function FiltreringStatusInavtiveBrukere(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();

    return (
        <BarInputGruppe>
            <BarInputRadio
                filterNavn="inaktiveBrukere"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                antall={statusTall.inaktiveBrukere}
                checked={props.ferdigfilterListe.includes(INAKTIVE_BRUKERE)}
            />
        </BarInputGruppe>
    );
}
