export const lagLablerTilVeiledereMedIdenter = (identer, veiledere, doSlettFilter?) =>
    identer.map((ident) => {

        const veileder = veiledere.find((v) => v.ident === ident);
        if (!veileder) {
            return doSlettFilter(ident);
        }
        return {label: `${veileder.etternavn}, ${veileder.fornavn} (${ident})`, key: ident};
    }).filter((ident) => ident);

export const finnVeiledereSomErIkkeAktiv = (aktiveVeiledereIdent: string[], veilederValg: string[]) =>
    veilederValg.filter(vaileder => !aktiveVeiledereIdent.includes(vaileder))
