import * as React from 'react';
import {BrukerModell, VurderingsBehov} from '../../model-interfaces';
import hiddenIf from '../hidden-if/hidden-if';
import {Tag} from '@navikt/ds-react';

interface EtiketterProps {
    bruker: BrukerModell;
    erVedtakStotteFeatureTogglePa: boolean;
}

function Etiketter({bruker, erVedtakStotteFeatureTogglePa}: EtiketterProps) {
    const HiddenEtikett = hiddenIf(Tag);
    return (
        <>
            <HiddenEtikett variant="info" size="small" hidden={!bruker.erDoed} className="etikett--doed">
                Død
            </HiddenEtikett>
            <HiddenEtikett
                variant="warning"
                size="small"
                hidden={!bruker.sikkerhetstiltak || bruker.sikkerhetstiltak.length === 0}
            >
                Sikkerhetstiltak
            </HiddenEtikett>
            <HiddenEtikett
                variant="warning"
                size="small"
                hidden={!bruker.diskresjonskode}
            >{`Kode ${bruker.diskresjonskode}`}</HiddenEtikett>
            <HiddenEtikett variant="warning" size="small" hidden={!bruker.egenAnsatt}>
                Skjermet
            </HiddenEtikett>
            <HiddenEtikett
                variant="info"
                size="small"
                hidden={
                    erVedtakStotteFeatureTogglePa
                        ? bruker.vurderingsBehov !== VurderingsBehov.IKKE_VURDERT
                        : !bruker.trengerVurdering || bruker.vurderingsBehov !== VurderingsBehov.IKKE_VURDERT
                }
            >
                Trenger vurdering
            </HiddenEtikett>
            <HiddenEtikett
                variant="info"
                size="small"
                hidden={
                    erVedtakStotteFeatureTogglePa
                        ? bruker.vurderingsBehov !== VurderingsBehov.ARBEIDSEVNE_VURDERING
                        : !bruker.trengerVurdering || bruker.vurderingsBehov !== VurderingsBehov.ARBEIDSEVNE_VURDERING
                }
            >
                Behov for AEV
            </HiddenEtikett>
            <HiddenEtikett
                variant="info"
                size="small"
                hidden={
                    !erVedtakStotteFeatureTogglePa ||
                    !bruker.trengerVurdering ||
                    bruker.vurderingsBehov !== VurderingsBehov.OPPGITT_HINDRINGER
                }
            >
                Oppgitt hindringer
            </HiddenEtikett>
            <HiddenEtikett
                variant="info"
                size="small"
                hidden={
                    !erVedtakStotteFeatureTogglePa ||
                    !bruker.trengerVurdering ||
                    bruker.vurderingsBehov !== VurderingsBehov.ANTATT_GODE_MULIGHETER
                }
            >
                Antatt gode muligheter
            </HiddenEtikett>
            <HiddenEtikett
                variant="info"
                size="small"
                hidden={
                    !erVedtakStotteFeatureTogglePa ||
                    !bruker.trengerVurdering ||
                    bruker.vurderingsBehov !== VurderingsBehov.ANTATT_BEHOV_FOR_VEILEDNING
                }
            >
                Antatt behov for veiledning
            </HiddenEtikett>
            <HiddenEtikett variant="info" size="small" hidden={!bruker.erSykmeldtMedArbeidsgiver}>
                Sykmeldt
            </HiddenEtikett>
            <HiddenEtikett variant="info" size="small" hidden={!bruker.trengerRevurdering}>
                Revurdering
            </HiddenEtikett>
        </>
    );
}

export default Etiketter;
