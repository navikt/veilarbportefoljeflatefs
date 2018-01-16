import * as React from 'react';
import {EtikettType} from '../../model-interfaces';
import {FormattedMessage} from 'react-intl';
import Etikett from './etikett';

interface NyBrukerEtikettProps {
    className?: string;
    nyBruker: boolean;
    skalVises: boolean;
}

const fm = (id) => <FormattedMessage id={id}
/>;

function NyBruker({nyBruker, skalVises, className}: NyBrukerEtikettProps) {
    return (
        skalVises ?
            <div className={className}>
                <Etikett
                    type={EtikettType.NYBRUKER}
                    child={fm('enhet.portefolje.tabelletikett.ny.bruker')}
                    skalVises={nyBruker}
                />
            </div> :
            null
    )
}

export default NyBruker;
