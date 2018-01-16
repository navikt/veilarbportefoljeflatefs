import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import Etikett from './etikett';
import {BrukerModell, EtikettType} from '../../model-interfaces';

interface EtiketterProps {
    className?: string;
    bruker: BrukerModell;
}

function Etiketter({className, bruker}: EtiketterProps) {
    return (
        <span className={className}>
            <Etikett
                type={EtikettType.SIKKERHETSTILTAK}
                skalVises={bruker.sikkerhetstiltak.length > 0}
            >
                <FormattedMessage id='enhet.portefolje.tabelletikett.sikkerhetstiltak'/>
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
                <FormattedMessage id='enhet.portefolje.tabelletikett.egen.ansatt'/>
            </Etikett>
            <Etikett
                type={EtikettType.DOED}
                skalVises={bruker.erDoed === true}
            >
                <FormattedMessage id='enhet.portefolje.tabelletikett.dod'/>
            </Etikett>
        </span>
    );
}

export default Etiketter;
