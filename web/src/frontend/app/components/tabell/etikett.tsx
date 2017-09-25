import * as React from 'react';
import Tabelletiketter from '../tabelletiketter/tabelletiketter';
import {EtikettType} from '../../model-interfaces';

interface EtikettProps {
    type: EtikettType;
    child: React.ReactChild;
    skalVises: boolean;
}

export function Etikett({ type, child, skalVises }: EtikettProps) {
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
