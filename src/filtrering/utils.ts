interface VeilederLabel {
    label: string,
    key: string
}

export const lagLablerTilVeiledereMedIdenter = (identer, veiledere, doSlettFilter?) =>
{
    var veiledereLabels = [] as VeilederLabel[]
    identer.forEach(ident => {
        const veileder = veiledere.find((v) => v.ident === ident);
        if (!veileder) {
            doSlettFilter(ident);
        }else{
            var veilederLabel = {label: `${veileder.etternavn}, ${veileder.fornavn} (${ident})`, key: ident}
            veiledereLabels.push(veilederLabel)
        }
    })
    return veiledereLabels;
}

