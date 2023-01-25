import * as React from 'react';
import {BrukerModell, VurderingsBehov} from '../../model-interfaces';
import hiddenIf from '../hidden-if/hidden-if';
import {Tag} from '@navikt/ds-react';
import {hentSkjermetTil} from '../../utils/dato-utils';

interface EtiketterProps {
    bruker: BrukerModell;
    erVedtakStotteFeatureTogglePa: boolean;
}

function Etiketter({bruker, erVedtakStotteFeatureTogglePa}: EtiketterProps) {
    const HiddenEtikett = hiddenIf(Tag);
    const skjermetTil = hentSkjermetTil(bruker.skjermetTil);
    return (
        <>
            <HiddenEtikett variant="info" size="small" hidden={!bruker.erDoed} className="tabell-etikett etikett--doed">
                Død
            </HiddenEtikett>
            <HiddenEtikett
                variant="warning"
                size="small"
                hidden={!bruker.sikkerhetstiltak || bruker.sikkerhetstiltak.length === 0}
                className="tabell-etikett"
            >
                Sikkerhetstiltak
            </HiddenEtikett>
            <HiddenEtikett variant="warning" size="small" hidden={!bruker.diskresjonskode} className="tabell-etikett">
                {`Kode ${bruker.diskresjonskode}`}
            </HiddenEtikett>
            <HiddenEtikett variant="warning" size="small" hidden={!bruker.egenAnsatt || !!bruker.skjermetTil} className="tabell-etikett">
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
                className="tabell-etikett"
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
                className="tabell-etikett"
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
                className="tabell-etikett"
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
                className="tabell-etikett"
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
                className="tabell-etikett"
            >
                Antatt behov for veiledning
            </HiddenEtikett>
            <HiddenEtikett
                variant="info"
                size="small"
                hidden={!bruker.erSykmeldtMedArbeidsgiver}
                className="tabell-etikett"
            >
                Sykmeldt
            </HiddenEtikett>
            <HiddenEtikett variant="info" size="small" hidden={!bruker.trengerRevurdering} className="tabell-etikett">
                Revurdering
            </HiddenEtikett>
            <HiddenEtikett
                variant={skjermetTil.type}
                size="small"
                hidden={!skjermetTil.tittel}
            >{`${skjermetTil.tittel}`}</HiddenEtikett>
        </>
    );
}

export default Etiketter;
