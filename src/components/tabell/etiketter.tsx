import * as React from 'react';
import {BrukerModell, VurderingsBehov} from '../../model-interfaces';
import {Advarsel, Bas, Fokus, Info} from "./etikett";

interface EtiketterProps {
    className?: string;
    bruker: BrukerModell;
    erVedtakStotteFeaturePa: boolean;
}

function Etiketter({className, bruker, erVedtakStotteFeaturePa}: EtiketterProps) {

    return (
        <span className={className}>
            <Bas
                type="info"
                className="etikett--doed"
                hidden={!bruker.erDoed}
                typo="undertekst"
            >
                Død
            </Bas>
            <Advarsel
                hidden={bruker.sikkerhetstiltak.length === 0}
                typo="undertekst"
            >
                Sikkerhetstiltak
            </Advarsel>
            <Fokus
                hidden={!bruker.diskresjonskode}
                typo="undertekst"
            >
                {`Kode ${bruker.diskresjonskode}`}
            </Fokus>
            <Fokus
                hidden={!bruker.egenAnsatt}
                typo="undertekst"
            >
               Egen ansatt
            </Fokus>
            <Info
                hidden={erVedtakStotteFeaturePa ? bruker.vurderingsBehov !== VurderingsBehov.IKKE_VURDERT : !bruker.trengerVurdering || bruker.vurderingsBehov !== VurderingsBehov.IKKE_VURDERT}
                typo="undertekst"
            >
                Trenger vurdering
            </Info>
            <Info
                hidden={erVedtakStotteFeaturePa ? bruker.vurderingsBehov !== VurderingsBehov.ARBEIDSEVNE_VURDERING : !bruker.trengerVurdering || bruker.vurderingsBehov !== VurderingsBehov.ARBEIDSEVNE_VURDERING}
                typo="undertekst"
            >
                Behov for AEV
            </Info>
            <Info
                hidden={!erVedtakStotteFeaturePa || !bruker.trengerVurdering || bruker.vurderingsBehov !== VurderingsBehov.OPPGITT_HINDRINGER}
                typo="undertekst"
            >
               Oppgitt hindringer
            </Info>
            <Info
                hidden={!erVedtakStotteFeaturePa || !bruker.trengerVurdering || bruker.vurderingsBehov !== VurderingsBehov.ANTATT_GODE_MULIGHETER}
                typo="undertekst"
            >
               Antatt gode muligheter
            </Info>
            <Info
                hidden={!erVedtakStotteFeaturePa || !bruker.trengerVurdering || bruker.vurderingsBehov !== VurderingsBehov.ANTATT_BEHOV_FOR_VEILEDNING}
                typo="undertekst"
            >
                Antatt behov for veiledning
            </Info>
            <Info
                hidden={!bruker.erSykmeldtMedArbeidsgiver}
                typo="undertekst"
            >
                Sykmeldt
            </Info>
            <Info
                hidden={!bruker.trengerRevurdering}
                typo="undertekst"
            >
                Revurdering
            </Info>
        </span>
    );
}

export default Etiketter;
