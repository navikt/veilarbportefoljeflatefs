import React from 'react';
import { PERMITTERTE_ETTER_NIENDE_MARS } from '../../filter-konstanter';
import { useStatusTallSelector } from '../../../hooks/redux/use-statustall';
import BarInputCheckbox from '../../../components/barinput/barinput-checkbox';

export interface FiltreringStatusGruppe {
    ferdigfilterListe: string[];
    handleChange: (e: any) => void;
}

function FiltreringStatusPermitterteEtterNiendeBrukere(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();
    return (
        <BarInputCheckbox
            filterNavn="permitterteEtterNiendeMars"
            antall={statusTall.permitterteEtterNiendeMars}
            handleChange={props.handleChange}
            checked={props.ferdigfilterListe.includes(PERMITTERTE_ETTER_NIENDE_MARS)}
            max={statusTall.totalt}
        />
    );
}

export default FiltreringStatusPermitterteEtterNiendeBrukere;
