import * as React from 'react';

interface ListeoverskriftProps {
    skalVises?: boolean;
    className?: string;
    tekst?: string;
}

function Listeoverskrift({ skalVises= true, className= '', tekst }: ListeoverskriftProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <span className={className}>
            {tekst}
        </span>
    );
}

export default Listeoverskrift;
