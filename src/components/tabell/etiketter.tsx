import * as React from 'react';
import {BrukerModell, VurderingsBehov} from '../../model-interfaces';
import hiddenIf from '../hidden-if/hidden-if';
import {Tag} from '@navikt/ds-react';
import {hentSkjermetInfo} from '../../utils/dato-utils';

interface EtiketterProps {
    bruker: BrukerModell;
    visInnholdForNyVedtakslosning14a: boolean;
}

function Etiketter({bruker, visInnholdForNyVedtakslosning14a}: EtiketterProps) {
    const HiddenEtikett = hiddenIf(Tag);
    const skjermetInfo = hentSkjermetInfo(bruker.egenAnsatt, bruker.skjermetTil);

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
            <HiddenEtikett
                variant={skjermetInfo.type}
                size="small"
                hidden={skjermetInfo.hidden}
            >{`${skjermetInfo.tittel}`}</HiddenEtikett>
            <HiddenEtikett
                variant="info"
                size="small"
                hidden={
                    visInnholdForNyVedtakslosning14a
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
                    visInnholdForNyVedtakslosning14a
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
                    !visInnholdForNyVedtakslosning14a ||
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
                    !visInnholdForNyVedtakslosning14a ||
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
                    !visInnholdForNyVedtakslosning14a ||
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
        </>
    );
}

export default Etiketter;
