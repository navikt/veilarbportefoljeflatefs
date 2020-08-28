import React from 'react';
import {
    ER_SYKMELDT_MED_ARBEIDSGIVER,
    TRENGER_VURDERING,
    UNDER_VURDERING
} from '../../filter-konstanter';
import {FiltreringStatusGruppe} from './ufordelte-brukere';
import {useStatusTallSelector} from '../../../hooks/redux/use-statustall';
import {useSelector} from 'react-redux';
import {sjekkFeature} from '../../../ducks/features';
import {AppState} from '../../../reducer';
import {VEDTAKSTOTTE} from '../../../konstanter';
import {HiddenIfNyBarInputRadio, NyBarInputRadio} from "../../../components/barinput/ny_bar_input_radio";

export function NyFiltreringStatusBehovsVurdering(props: FiltreringStatusGruppe) {
    const vedtakkStotteFeature = useSelector((state: AppState) => sjekkFeature(state, VEDTAKSTOTTE));
    const statusTall = useStatusTallSelector();

    return (
        <>
            <NyBarInputRadio
                filterNavn="trengerVurdering"
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(TRENGER_VURDERING)}
                antall={statusTall.trengerVurdering}
            />
            <HiddenIfNyBarInputRadio
                filterNavn="erSykmeldtMedArbeidsgiver"
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(ER_SYKMELDT_MED_ARBEIDSGIVER)}
                antall={statusTall.erSykmeldtMedArbeidsgiver}
            />
            <HiddenIfNyBarInputRadio
                filterNavn="underVurdering"
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(UNDER_VURDERING)}
                antall={statusTall.underVurdering}
                hidden={!vedtakkStotteFeature}
            />
        </>
    );
}
