import * as React from 'react';
import {BrukerModell, VurderingsBehov} from '../../model-interfaces';
import {Tag} from '@navikt/ds-react';

interface EtiketterProps {
    className?: string;
    bruker: BrukerModell;
    erVedtakStotteFeatureTogglePa: boolean;
}

function Etiketter({className, bruker, erVedtakStotteFeatureTogglePa}: EtiketterProps) {
    return (
        <span className={className}>
            {bruker.erDoed && (
                <Tag variant="info" className="etikett--doed">
                    Død
                </Tag>
            )}
            {bruker.sikkerhetstiltak.length !== 0 && <Tag variant={'warning'}>Sikkerhetstiltak</Tag>}

            {bruker.diskresjonskode && <Tag variant="warning">{`Kode ${bruker.diskresjonskode}`}</Tag>}
            {bruker.egenAnsatt && <Tag variant="warning">Egen ansatt</Tag>}
            {erVedtakStotteFeatureTogglePa
                ? bruker.vurderingsBehov === VurderingsBehov.IKKE_VURDERT
                : (bruker.trengerVurdering || bruker.vurderingsBehov === VurderingsBehov.IKKE_VURDERT) && (
                      <Tag variant="info">Trenger vurdering</Tag>
                  )}

            {erVedtakStotteFeatureTogglePa
                ? bruker.vurderingsBehov === VurderingsBehov.ARBEIDSEVNE_VURDERING
                : (bruker.trengerVurdering || bruker.vurderingsBehov === VurderingsBehov.ARBEIDSEVNE_VURDERING) && (
                      <Tag variant="info">Behov for AEV</Tag>
                  )}
            {erVedtakStotteFeatureTogglePa &&
                (bruker.trengerVurdering || bruker.vurderingsBehov === VurderingsBehov.OPPGITT_HINDRINGER) && (
                    <Tag variant="info">Oppgitt hindringer</Tag>
                )}
            {erVedtakStotteFeatureTogglePa &&
                (bruker.trengerVurdering || bruker.vurderingsBehov === VurderingsBehov.ANTATT_GODE_MULIGHETER) && (
                    <Tag variant="info">Antatt gode muligheter</Tag>
                )}
            {erVedtakStotteFeatureTogglePa &&
                (bruker.trengerVurdering || bruker.vurderingsBehov === VurderingsBehov.ANTATT_BEHOV_FOR_VEILEDNING) && (
                    <Tag variant="info">Antatt behov for veiledning</Tag>
                )}
            {bruker.erSykmeldtMedArbeidsgiver && <Tag variant="info">Sykmeldt</Tag>}
            {bruker.trengerRevurdering && <Tag variant="info">Revurdering</Tag>}
        </span>
    );
}

export default Etiketter;
