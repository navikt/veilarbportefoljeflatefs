import * as React from 'react';

interface TidKolonneProps {
    className?: string;
    dato?: Date | null;
    skalVises: boolean;
}

function TidKolonne({ className, dato, skalVises }: TidKolonneProps) {
    if (!skalVises || !dato) {
        return null;
    }
    return <span className={className}>{dato.toLocaleTimeString(['nb-no', 'nn-no', 'en-gb', 'en-us'])}</span>;
}

export default TidKolonne;
