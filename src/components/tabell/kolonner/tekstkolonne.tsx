import React from "react";

interface TekstKolonneProps {
    tekst?: string;
    skalVises: boolean;
    className?: string;
}

export function TekstKolonne({tekst, skalVises, className}: TekstKolonneProps) {
    if (!skalVises || !tekst) {
        return null;
    }

    return (<span className={className}>{tekst}</span>);
}