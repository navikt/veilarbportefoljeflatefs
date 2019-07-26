
export const tekstAntallBrukere = (tall) => byggAntallBrukereObjekt(tall)[tall];

const byggAntallBrukereObjekt = (tall) => ({
    0: 'Ingen brukere',
    1: 'Totalt 1 bruker',
    [tall]: `Totalt ${tall} brukere`
});

export const tekstValgteBrukere = (antallValgt) => byggValgteBrukereObjekt(antallValgt)[antallValgt];

const byggValgteBrukereObjekt = (antallValgt) => ({
    0: 'Ingen brukere valgt',
    1: '1 bruker valgt',
    [antallValgt]: `${antallValgt} brukere valgt`
});
