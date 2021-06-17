import React from 'react';

interface TekstKolonneProps {
    role?: string;
    tekst?: string;
    skalVises: boolean;
    className?: string;
}

export function TekstKolonne({role, tekst, skalVises, className}: TekstKolonneProps) {
    if (!skalVises || !tekst) {
        return null;
    }

    return <span role={role} className={className}> {tekst} </span>;
}
