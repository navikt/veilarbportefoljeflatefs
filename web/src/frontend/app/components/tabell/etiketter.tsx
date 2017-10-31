import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Etikett from './etikett';
import { BrukerModell, EtikettType } from '../../model-interfaces';

const fm = (id) => <FormattedMessage id={id} />;

interface EtiketterProps {
    className?: string;
    bruker: BrukerModell;
}

function Etiketter({ className, bruker }: EtiketterProps) {
    return (
        <span className={className}>
            <Etikett
                type={ EtikettType.SIKKERHETSTILTAK}
                child={fm('enhet.portefolje.tabelletikett.sikkerhetstiltak')}
                skalVises={bruker.sikkerhetstiltak.length > 0}
            />
            <Etikett
                type={EtikettType.DISKRESJONSKODE}
                child={<span>{`Kode ${bruker.diskresjonskode}`}</span>}
                skalVises={bruker.diskresjonskode !== null}
            />
            <Etikett
                type={EtikettType.EGEN_ANSATT}
                child={fm('enhet.portefolje.tabelletikett.egen.ansatt')}
                skalVises={bruker.egenAnsatt === true}
            />
            <Etikett
                type={EtikettType.DOED}
                child={fm('enhet.portefolje.tabelletikett.dod')}
                skalVises={bruker.erDoed === true}
            />
        </span>
    );
}

export default Etiketter;
