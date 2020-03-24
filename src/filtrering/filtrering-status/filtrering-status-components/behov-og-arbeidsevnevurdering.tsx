import React from 'react';
import {
    ER_SYKMELDT_MED_ARBEIDSGIVER, PERMITTERTE_UTEN_OPPFOLGINGSVEDTAK,
    TRENGER_VURDERING,
    UNDER_VURDERING
} from '../../filter-konstanter';
import { BarInputRadio } from '../../../components/barinput/barinput-radio';
import { HiddenIfBarInputRadio } from '../../../components/barinput/barinput-radio';
import { FiltreringStatusGruppe } from './ufordelte-brukere';
import { useStatusTallSelector } from '../../../hooks/redux/use-statustall';
import { useSelector } from 'react-redux';
import { sjekkFeature } from '../../../ducks/features';
import { AppState } from '../../../reducer';
import { VEDTAKSTOTTE } from '../../../konstanter';

export function FiltreringStatusBehovsVurdering(props: FiltreringStatusGruppe) {
    const vedtakkStotteFeature = useSelector((state: AppState) => sjekkFeature(state, VEDTAKSTOTTE));
    const statusTall = useStatusTallSelector();

    return (
        <>
            <BarInputRadio
                filterNavn="trengerVurdering"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                checked={props.ferdigfilterListe.includes(TRENGER_VURDERING)}
                antall={statusTall.trengerVurdering}
            />
            <BarInputRadio
                filterNavn="erPermittertUtenOppfolgingdVedtak"
                max={statusTall.totalt}
                antall={statusTall.erPermittertUtenOppfolgingdVedtak}
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(PERMITTERTE_UTEN_OPPFOLGINGSVEDTAK)}
            />
            <HiddenIfBarInputRadio
                filterNavn="erSykmeldtMedArbeidsgiver"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                checked={props.ferdigfilterListe.includes(ER_SYKMELDT_MED_ARBEIDSGIVER)}
                antall={statusTall.erSykmeldtMedArbeidsgiver}
                hidden={vedtakkStotteFeature}
            />
            <HiddenIfBarInputRadio
                filterNavn="underVurdering"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                checked={props.ferdigfilterListe.includes(UNDER_VURDERING)}
                antall={statusTall.underVurdering}
                hidden={!vedtakkStotteFeature}
            />
        </>
    );
}
