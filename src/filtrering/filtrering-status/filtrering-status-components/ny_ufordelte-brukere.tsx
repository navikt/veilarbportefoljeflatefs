import React from 'react';
import {UFORDELTE_BRUKERE} from '../../filter-konstanter';
import hiddenIf from '../../../components/hidden-if/hidden-if';
import {useStatusTallSelector} from '../../../hooks/redux/use-statustall';
import NyBarInputCheckbox from "../../../components/barinput/ny_barinput-checkbox";

export interface FiltreringStatusGruppe {
    ferdigfilterListe: string[];
    handleChange: (e: any) => void;
}

function NyFiltreringStatusUfordelteBrukere(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();

    return (
        <NyBarInputCheckbox
            filterNavn="ufordeltebruker"
            antall={statusTall.ufordelteBrukere}
            handleChange={props.handleChange}
            checked={props.ferdigfilterListe.includes(UFORDELTE_BRUKERE)}
        />
    );
}

export default hiddenIf(NyFiltreringStatusUfordelteBrukere);
