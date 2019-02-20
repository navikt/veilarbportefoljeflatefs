import * as React from 'react';
import { FormattedMessage } from 'react-intl';
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
                <FormattedMessage id="enhet.portefolje.tabelletikett.sikkerhetstiltak"/>
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
                <FormattedMessage id="enhet.portefolje.tabelletikett.egen.ansatt"/>
            </Etikett>
            <Etikett
                type={EtikettType.DOED}
                skalVises={bruker.erDoed}
            >
                <FormattedMessage id="enhet.portefolje.tabelletikett.dod"/>
            </Etikett>
            <Etikett
                type={EtikettType.IKKE_VURDERT}
                skalVises={bruker.trengerVurdering && bruker.vurderingsBehov === VurderingsBehov.IKKE_VURDERT}
            >
                <FormattedMessage id="enhet.portefolje.tabelletikett.ikke_vurdert"/>
            </Etikett>
            <Etikett
                type={EtikettType.BEHOV_AEV}
                skalVises={bruker.trengerVurdering && bruker.vurderingsBehov === VurderingsBehov.ARBEIDSEVNE_VURDERING}
            >
                <FormattedMessage id="enhet.portefolje.tabelletikett.behov_aev"/>
            </Etikett>
            <Etikett
                type={EtikettType.ER_SYKMELDT_MED_ARBEIDSGIVER}
                skalVises={bruker.erSykmeldtMedArbeidsgiver}
            >
                <FormattedMessage id="enhet.portefolje.tabelletikett.er_sykmeldt_med_arbeidsgiver"/>
            </Etikett>

        </span>
    );
}

export default Etiketter;
