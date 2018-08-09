import * as React from 'react';
import Tabelletiketter from '../tabelletiketter/tabelletiketter';
import { EtikettType } from '../../model-interfaces';

interface EtikettProps {
    type: EtikettType;
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
