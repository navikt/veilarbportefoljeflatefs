import React from 'react';

interface TekstKolonneProps {
    role?: string;
    labelledBy?: string;
    tekst?: string;
    skalVises: boolean;
    className?: string;
}

export function TekstKolonne({role, labelledBy, tekst, skalVises, className}: TekstKolonneProps) {
    if (!skalVises || !tekst) {
        return null;
    }

    return (
        <span role={role} aria-labelledby={labelledBy} className={className}>
            {' '}
            {tekst}{' '}
        </span>
    );
}
