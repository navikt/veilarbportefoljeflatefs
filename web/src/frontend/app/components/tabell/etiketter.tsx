import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Etikett from './etikett';
import { BrukerModell } from '../../model-interfaces';

const fm = (id) => <FormattedMessage id={id} />;

interface EtiketterProps {
    bruker: BrukerModell;
}

function Etiketter({ bruker }: EtiketterProps) {
    return (
        <div className="etiketter__wrapper">
            <Etikett
                type="sikkerhetstiltak"
                child={fm('enhet.portefolje.tabelletikett.sikkerhetstiltak')}
                skalVises={bruker.sikkerhetstiltak.length > 0}
            />
            <Etikett
                type="diskresjonskode"
                child={<span>{`Kode ${bruker.diskresjonskode}`}</span>}
                skalVises={bruker.diskresjonskode !== null}
            />
            <Etikett
                type="egen-ansatt"
                child={fm('enhet.portefolje.tabelletikett.egen.ansatt')}
                skalVises={bruker.egenAnsatt === true}
            />
            <Etikett
                type="doed"
                child={fm('enhet.portefolje.tabelletikett.dod')}
                skalVises={bruker.erDoed === true}
            />

        </div>
    );
}

export default Etiketter;
