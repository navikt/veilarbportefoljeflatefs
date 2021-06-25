import * as React from 'react';

interface DagerSidenKolonneProps {
    role?: string;
    labelledBy?: string;
    skalVises: boolean;
    dato: number | null;
    className: string;
}

export function DagerSidenKolonne(props: DagerSidenKolonneProps) {
    const {role, labelledBy, skalVises, dato, className} = props;

    if (!skalVises || dato === null) {
        return null;
    }

    const datoTekst = () => {
        if (dato === 0) {
            return 'I dag';
        } else if (dato === 1) {
            return '1 dag siden';
        } else {
            return `${dato} dager siden`;
        }
    };

    return <span role={role} aria-labelledby={labelledBy} className={className}> {datoTekst()} </span>;
}
