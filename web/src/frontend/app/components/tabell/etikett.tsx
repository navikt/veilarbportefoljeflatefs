import * as React from 'react';
import Tabelletiketter, { TabelletiketterTypes } from '../tabelletiketter/tabelletiketter';

interface EtikettProps {
    type: TabelletiketterTypes;
    child: React.ReactChild;
    skalVises: boolean;
}

function Etikett({ type, child, skalVises }: EtikettProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <Tabelletiketter type={type}>
            {child}
        </Tabelletiketter>
    );
}

export default Etikett;
