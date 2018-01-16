import * as React from 'react';
import Tabelletiketter, { TabelletiketterTypes } from '../tabelletiketter/tabelletiketter';

interface EtikettProps {
    type: TabelletiketterTypes;
    children: React.ReactChild;
    skalVises: boolean;
}

function Etikett({ type, children, skalVises }: EtikettProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <Tabelletiketter type={type}>
            {children}
        </Tabelletiketter>
    );
}

export default Etikett;
