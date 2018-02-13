
export const lagLablerTilVeiledereMedIdenter = (identer, veiledere) => identer.map((ident) => {
    const veileder = veiledere.find((v) => v.ident === ident);
    return { label: `${veileder.etternavn}, ${veileder.fornavn} (${ident})`, key: ident };
});
