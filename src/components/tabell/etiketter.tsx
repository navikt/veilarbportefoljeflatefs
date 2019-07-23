import * as React from 'react';
import Etikett from './etikett';
import { BrukerModell, EtikettType, VurderingsBehov } from '../../model-interfaces';

interface EtiketterProps {
    className?: string;
    bruker: BrukerModell;
}

function Etiketter({ className, bruker }: EtiketterProps) {
    return (
        <span className={className}>
            <Etikett
                type={EtikettType.SIKKERHETSTILTAK}
                skalVises={bruker.sikkerhetstiltak.length > 0}
            >
                <span>Sikkerhetstiltak</span>
            </Etikett>
            <Etikett
                type={EtikettType.DISKRESJONSKODE}
                skalVises={!!bruker.diskresjonskode}
            >
                <span>{`Kode ${bruker.diskresjonskode}`}</span>
            </Etikett>
            <Etikett
                type={EtikettType.EGEN_ANSATT}
                skalVises={bruker.egenAnsatt}
            >
                <span>Egen ansatt</span>
            </Etikett>
            <Etikett
                type={EtikettType.DOED}
                skalVises={bruker.erDoed}
            >
                <span>Død</span>
            </Etikett>
            <Etikett
                type={EtikettType.IKKE_VURDERT}
                skalVises={bruker.trengerVurdering && bruker.vurderingsBehov === VurderingsBehov.IKKE_VURDERT}
            >
                <span>Trenger vurdering</span>
            </Etikett>
            <Etikett
                type={EtikettType.BEHOV_AEV}
                skalVises={bruker.trengerVurdering && bruker.vurderingsBehov === VurderingsBehov.ARBEIDSEVNE_VURDERING}
            >
                <span>Behov for AEV</span>
            </Etikett>
            <Etikett
                type={EtikettType.ER_SYKMELDT_MED_ARBEIDSGIVER}
                skalVises={bruker.erSykmeldtMedArbeidsgiver}
            >
                <span>Sykmeldt</span>
            </Etikett>

        </span>
    );
}

export default Etiketter;
