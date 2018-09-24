import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Etikett from './etikett';
import { BrukerModell, EtikettType, VurderingsBehov } from '../../model-interfaces';

interface EtiketterProps {
    className?: string;
    bruker: BrukerModell;
    erVurderingFeaturePa: boolean;
}

function Etiketter({className, bruker, erVurderingFeaturePa}: EtiketterProps) {
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
                skalVises={bruker.diskresjonskode !== null}
            >
                <span>{`Kode ${bruker.diskresjonskode}`}</span>
            </Etikett>
            <Etikett
                type={EtikettType.EGEN_ANSATT}
                skalVises={bruker.egenAnsatt === true}
            >
                <FormattedMessage id="enhet.portefolje.tabelletikett.egen.ansatt"/>
            </Etikett>
            <Etikett
                type={EtikettType.DOED}
                skalVises={bruker.erDoed === true}
            >
                <FormattedMessage id="enhet.portefolje.tabelletikett.dod"/>
            </Etikett>
            <Etikett
                type={EtikettType.IKKE_VURDERT}
                skalVises={erVurderingFeaturePa && bruker.trengerVurdering === true && bruker.vurderingsBehov === VurderingsBehov.IKKE_VURDERT}
            >
                <FormattedMessage id="enhet.portefolje.tabelletikett.ikke.vurdert"/>
            </Etikett>
            <Etikett
                type={EtikettType.BEHOV_AEV}
                skalVises={erVurderingFeaturePa && bruker.trengerVurdering === true && bruker.vurderingsBehov === VurderingsBehov.ARBEIDSEVNE_VURDERING}
            >
                <FormattedMessage id="enhet.portefolje.tabelletikett.behov.aev_nb"/>
            </Etikett>
        </span>
    );
}

export default Etiketter;
