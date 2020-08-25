import React from 'react';
import {I_AVTALT_AKTIVITET, IKKE_I_AVTALT_AKTIVITET, UTLOPTE_AKTIVITETER} from '../../filter-konstanter';
import BarInputGruppe from '../../../components/barinput/barinput-gruppe';
import {useStatusTallSelector} from '../../../hooks/redux/use-statustall';
import {NyBarInputRadio} from "../../../components/barinput/ny_bar_input_radio";

interface FiltreringStatusAktivitetProps {
    ferdigfilterListe: string[];
    handleChange: (e: any) => void;
}

export function NyFiltreringStatusAktiviteter(props: FiltreringStatusAktivitetProps) {
    const statusTall = useStatusTallSelector();
    return (
        <BarInputGruppe>
            <NyBarInputRadio
                filterNavn="utlopteAktiviteter"
                antall={statusTall.utlopteAktiviteter}
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
            />
            <NyBarInputRadio
                filterNavn="ikkeIavtaltAktivitet"
                antall={statusTall.ikkeIavtaltAktivitet}
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(IKKE_I_AVTALT_AKTIVITET)}
            />
            <NyBarInputRadio
                filterNavn="iavtaltAktivitet"
                antall={statusTall.iavtaltAktivitet}
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(I_AVTALT_AKTIVITET)}
            />
        </BarInputGruppe>
    );
}
