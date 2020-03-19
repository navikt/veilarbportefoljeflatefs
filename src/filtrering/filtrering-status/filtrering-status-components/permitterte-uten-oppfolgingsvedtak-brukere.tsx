import React from 'react';
import BarInputCheckbox from '../../../components/barinput/barinput-checkbox';
import { PERMITTERTE_UTEN_OPPFOLGINGSVEDTAK } from '../../filter-konstanter';
import { useStatusTallSelector } from '../../../hooks/redux/use-statustall';
import { FiltreringStatusGruppe } from './ufordelte-brukere';

function FiltreringStatusPermitterteUtenOppfolgingsvedtak(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();

    return (
        <BarInputCheckbox
            filterNavn="permitterteUtenOppfolgingsvedtak"
            max={statusTall.totalt}
            antall={statusTall.permitterteUtenOppfolgingsvedtak}
            handleChange={props.handleChange}
            checked={props.ferdigfilterListe.includes(PERMITTERTE_UTEN_OPPFOLGINGSVEDTAK)}
        />
    );
}

export default FiltreringStatusPermitterteUtenOppfolgingsvedtak;
