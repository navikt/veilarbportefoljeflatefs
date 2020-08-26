import React from 'react';
import {PERMITTERTE_ETTER_NIENDE_MARS} from '../../filter-konstanter';
import {useStatusTallSelector} from '../../../hooks/redux/use-statustall';
import NyBarInputCheckbox from "../../../components/barinput/ny_barinput-checkbox";

export interface FiltreringStatusGruppe {
    ferdigfilterListe: string[];
    handleChange: (e: any) => void;
}

function NyFiltreringStatusPermitterteEtterNiendeBrukere(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();
    return (
        <NyBarInputCheckbox
            filterNavn="permitterteEtterNiendeMars"
            antall={statusTall.permitterteEtterNiendeMars}
            handleChange={props.handleChange}
            checked={props.ferdigfilterListe.includes(PERMITTERTE_ETTER_NIENDE_MARS)}
        />
    );
}

export default NyFiltreringStatusPermitterteEtterNiendeBrukere;
