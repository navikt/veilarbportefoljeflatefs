import * as React from 'react';

interface DagerSidenKolonneProps {
    role?: string;
    skalVises: boolean;
    dato: number | null;
    className: string;
}

export function DagerSidenKolonne(props: DagerSidenKolonneProps) {
    const {role, skalVises, dato, className} = props;

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

    return <span role={role} className={className}> {datoTekst()} </span>;
}
