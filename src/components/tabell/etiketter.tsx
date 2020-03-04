import * as React from 'react';
import Etikett from './etikett';
import { BrukerModell, EtikettType, VurderingsBehov } from '../../model-interfaces';

interface EtiketterProps {
    className?: string;
    bruker: BrukerModell;
    erVedtakStotteFeaturePa: boolean
}

function Etiketter({className, bruker, erVedtakStotteFeaturePa}: EtiketterProps) {
    return (
        <span className={className}>
            <Etikett
                type={EtikettType.DOED}
                skalVises={bruker.erDoed}
            >
                Død
            </Etikett>
            <Etikett
                type={EtikettType.SIKKERHETSTILTAK}
                skalVises={bruker.sikkerhetstiltak.length > 0}
            >
                Sikkerhetstiltak
            </Etikett>
            <Etikett
                type={EtikettType.DISKRESJONSKODE}
                skalVises={!!bruker.diskresjonskode}
            >
                {`Kode ${bruker.diskresjonskode}`}
            </Etikett>
            <Etikett
                type={EtikettType.EGEN_ANSATT}
                skalVises={bruker.egenAnsatt}
            >
               Egen ansatt
            </Etikett>
            <Etikett
                type={EtikettType.IKKE_VURDERT}
                skalVises={erVedtakStotteFeaturePa ? bruker.vurderingsBehov === VurderingsBehov.IKKE_VURDERT :  bruker.trengerVurdering && bruker.vurderingsBehov === VurderingsBehov.IKKE_VURDERT}
            >
                Trenger vurdering
            </Etikett>
            <Etikett
                type={EtikettType.BEHOV_AEV}
                skalVises={erVedtakStotteFeaturePa ? bruker.vurderingsBehov === VurderingsBehov.ARBEIDSEVNE_VURDERING :  bruker.trengerVurdering && bruker.vurderingsBehov === VurderingsBehov.ARBEIDSEVNE_VURDERING}
            >
                Behov for AEV
            </Etikett>
            <Etikett
                type={EtikettType.ER_SYKMELDT_MED_ARBEIDSGIVER}
                skalVises={bruker.erSykmeldtMedArbeidsgiver}
            >
                Sykmeldt
            </Etikett>
            <Etikett
                type={EtikettType.TRENGER_REVURDERING}
                skalVises={bruker.trengerRevurdering}
            >
                Revurdering
            </Etikett>
        </span>
    );
}

export default Etiketter;
