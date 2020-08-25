import React from 'react';
import {FiltreringStatusGruppe} from './ufordelte-brukere';
import {NYE_BRUKERE_FOR_VEILEDER} from '../../filter-konstanter';
import hiddenIf from '../../../components/hidden-if/hidden-if';
import {useStatusTallSelector} from '../../../hooks/redux/use-statustall';
import NyBarInputCheckbox from "../../../components/barinput/ny_barinput-checkbox";

function NyFiltreringStatusNyeBrukere(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();

    return (
        <NyBarInputCheckbox
            filterNavn="nyeBrukere"
            antall={statusTall.nyeBrukereForVeileder}
            handleChange={props.handleChange}
            checked={props.ferdigfilterListe.includes(NYE_BRUKERE_FOR_VEILEDER)}
        />
    );
}

export default hiddenIf(NyFiltreringStatusNyeBrukere);
