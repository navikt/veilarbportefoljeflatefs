import React from 'react';
import BarInputCheckbox from '../../../components/barinput/barinput-checkbox';
import { UFORDELTE_BRUKERE } from '../../filter-konstanter';
import hiddenIf from '../../../components/hidden-if/hidden-if';
import { useStatusTallSelector } from '../../../hooks/redux/use-statustall';

export interface FiltreringStatusGruppe {
    ferdigfilterListe: string[];
    handleChange: (e: any) => void;
}

function FiltreringStatusUfordelteBrukere(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();

    return (
        <BarInputCheckbox
            filterNavn="ufordeltebruker"
            antall={statusTall.ufordelteBrukere}
            handleChange={props.handleChange}
            checked={props.ferdigfilterListe.includes(UFORDELTE_BRUKERE)}
        />
    );
}

export default hiddenIf(FiltreringStatusUfordelteBrukere);
