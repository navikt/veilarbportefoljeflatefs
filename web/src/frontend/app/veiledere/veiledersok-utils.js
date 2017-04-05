export function compareEtternavn(a, b) {
    const aUpper = a.etternavn.toUpperCase() + a.fornavn.toUpperCase();
    const bUpper = b.etternavn.toUpperCase() + b.fornavn.toUpperCase();
    if (aUpper < bUpper) {
        return -1;
    }
    if (aUpper > bUpper) {
        return 1;
    }
    return 0;
}

export function visAlleVeiledereIListe(veiledere) {
    return veiledere
        .sort(compareEtternavn)
        .reduce((obj, veileder) =>
            ({ ...obj,
                [veileder.ident]:
                { label: `${veileder.etternavn}, ${veileder.fornavn} (${veileder.ident})` } }), {});
}

export function veiledereSok(soketekst, veiledere) {
    if (!soketekst || soketekst === '') {
        return visAlleVeiledereIListe(veiledere);
    }

    const soketekstLowerCase = soketekst.toLowerCase();

    const finnesInputsISokestreng = (inputs, veileder) => {
        const fantTreff = inputs.every((input) => veileder.sokestreng.includes(input));
        return { ...veileder, fantTreff };
    };


    const soketekster = soketekstLowerCase.split(/[ -]+/);

    return veiledere
        .map((veileder) => ({
            ident: veileder.ident,
            sokestreng: veileder.navn.toLowerCase() + veileder.ident.toLowerCase()
        }))
        .map((veileder) => finnesInputsISokestreng(soketekster, veileder))
        .map((veileder) => ({ ident: veileder.ident, skalVises: veileder.fantTreff }))
        .map((v) => ({ ...veiledere.find((veileder) => veileder.ident === v.ident), skalVises: v.skalVises }))
        .sort(compareEtternavn)
        .reduce((obj, veileder) =>
            ({ ...obj,
                [veileder.ident]:
                { label: `${veileder.etternavn}, ${veileder.fornavn} (${veileder.ident})`,
                    className: veileder.skalVises ? '' : 'veileder__hide' }
            }), {});
}
