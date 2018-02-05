import * as React from 'react';
import { EtikettType } from '../../model-interfaces';
import { FormattedMessage } from 'react-intl';
import Etikett from './etikett';

interface NyBrukerEtikettProps {
    className?: string;
    nyBruker: boolean;
    skalVises: boolean;
}

function NyBruker({ nyBruker, skalVises, className }: NyBrukerEtikettProps) {
    if (!skalVises) {
        return(null);
    }

    return (
        <div className={ className }>
            <Etikett
                type={ EtikettType.NYBRUKER }
                skalVises={ nyBruker }
            >
                <FormattedMessage id="enhet.portefolje.tabelletikett.ny.bruker"/>
            </Etikett>
        </div>
    );
}

export default NyBruker;
