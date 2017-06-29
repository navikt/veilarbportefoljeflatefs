import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import Etikett from './etikett';

const fm = (id) => <FormattedMessage id={id} />;

function Etiketter({ bruker }) {
    return (
        <div className="etiketter__wrapper">
            <Etikett
                type="sikkerhetstiltak"
                child={fm('enhet.portefolje.tabelletikett.sikkerhetstiltak')}
                skalVises={bruker.sikkerhetstiltak.length > 0}
            />
            <Etikett
                type="diskresjonskode"
                child={<span>`Kode ${bruker.diskresjonskode}`</span>}
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

Etiketter.propTypes = {
    bruker: PT.object.isRequired
};

export default Etiketter;
