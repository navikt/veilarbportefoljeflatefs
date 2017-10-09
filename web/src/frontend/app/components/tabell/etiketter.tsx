import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Etikett from './etikett';
import {BrukerModell, EtikettType} from '../../model-interfaces';

const fm = (id) => <FormattedMessage id={id} />;

interface EtiketterProps {
    bruker: BrukerModell;
}

function Etiketter({ bruker }: EtiketterProps) {
    return (
        <div className="etiketter__wrapper col col-xs-3">
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
            <Etikett
                type={EtikettType.NYBRUKER}
                child={fm('enhet.portefolje.tabelletikett.ny.bruker')}
                skalVises={bruker.veilederId === null}
            />
        </div>
    );
}

export default Etiketter;
