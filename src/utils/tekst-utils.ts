export const tekstAntallBrukere = tall => {
    if (tall === 0) {
        return 'Ingen brukere';
    } else if (tall === 1) {
        return 'Totalt 1 bruker';
    }
    return `Totalt ${tall} brukere`;
};

export const tekstValgteBrukere = antallValgt => {
    if (antallValgt === 0) {
        return 'Ingen brukere valgt.';
    } else if (antallValgt === 1) {
        return '1 bruker valgt.';
    }
    return `${antallValgt} brukere valgt.`;
};

export const truncateTekst = (tekst: string) => (tekst.length > 30 ? `${tekst.substring(0, 30)}...` : tekst);
