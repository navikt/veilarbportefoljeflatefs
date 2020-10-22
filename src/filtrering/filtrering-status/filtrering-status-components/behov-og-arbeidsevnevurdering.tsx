import React from 'react';
import {ER_SYKMELDT_MED_ARBEIDSGIVER, TRENGER_VURDERING, UNDER_VURDERING} from '../../filter-konstanter';
import {FiltreringStatusGruppe} from './ufordelte-brukere';
import {useStatusTallSelector} from '../../../hooks/redux/use-statustall';
import {VEDTAKSTOTTE} from '../../../konstanter';
import {HiddenIfBarInputRadio, BarInputRadio} from '../../../components/barinput/barinput-radio';
import {useFeatureSelector} from '../../../hooks/redux/use-feature-selector';

export function FiltreringStatusBehovsVurdering(props: FiltreringStatusGruppe) {
    const erVedtaksStotteFeatureTogglePa = useFeatureSelector()(VEDTAKSTOTTE);
    const statusTall = useStatusTallSelector();

    return (
        <>
            <BarInputRadio
                filterNavn="trengerVurdering"
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(TRENGER_VURDERING)}
                antall={statusTall.trengerVurdering}
            />
            <HiddenIfBarInputRadio
                filterNavn="erSykmeldtMedArbeidsgiver"
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(ER_SYKMELDT_MED_ARBEIDSGIVER)}
                antall={statusTall.erSykmeldtMedArbeidsgiver}
            />
            <HiddenIfBarInputRadio
                filterNavn="underVurdering"
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(UNDER_VURDERING)}
                antall={statusTall.underVurdering}
                hidden={!erVedtaksStotteFeatureTogglePa}
            />
        </>
    );
}
